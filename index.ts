import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { getDirectoryFileNames } from "./utils";
import chalk from "chalk";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(chalk.blue.bold("\n🎙️ Starting audio transcription process..."));

const audioFileNames = getDirectoryFileNames("./audio");

if (audioFileNames && audioFileNames.length === 0) {
  console.log(chalk.yellow("\n⚠️ No audio files found in ./audio directory"));
} else {
  console.log(chalk.cyan("\n📂 Found audio files:"));
  audioFileNames?.forEach((file) => {
    console.log(chalk.dim(`   • ${file}`));
  });
}

if (audioFileNames) {
  const transcriptionPromises = audioFileNames.map(async (fileName, index) => {
    const progress = `[${index + 1}/${audioFileNames.length}]`;

    console.log(
      chalk.cyan(
        `\n${progress} ${chalk.cyan.bold("🔄 Processing:")} ${chalk.white(
          fileName
        )}`
      )
    );
    try {
      const filePath = path.resolve(`./audio/${fileName}`);
      const { text } = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
        language: "pl",
      });

      await Bun.write(`./transcripts/${fileName.split(".")[0]}.txt`, text);
      console.log(
        chalk.green.bold("✅ Successfully transcribed: ") +
          chalk.green(fileName)
      );
      console.log(
        chalk.gray(`📝 Content preview: "${text.substring(0, 100)}..."\n`)
      );
      return { fileName, success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        chalk.red.bold("❌ Error processing: ") + chalk.red(fileName),
        "\n   " + chalk.red.dim(errorMessage)
      );
      return { fileName, success: false };
    }
  });

  const results = await Promise.all(transcriptionPromises);
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(chalk.dim("\n" + "═".repeat(50)));
  console.log(chalk.bold("\n📊 Transcription Summary"));
  console.log(chalk.dim("─".repeat(20)));
  console.log(chalk.green.bold(`✅ Successful: ${chalk.white(successful)}`));
  console.log(chalk.red.bold(`❌ Failed: ${chalk.white(failed)}`));
  console.log();
}
