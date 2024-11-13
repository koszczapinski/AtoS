import fs from "fs";
import path from "path";

import chalk from "chalk";

import { getDirectoryFileNames } from "./utils";
import { openAIClient } from "./src/services/openai";

console.log(chalk.blue.bold("🎙️ Starting audio transcription process..."));

const audioFileNames = getDirectoryFileNames("./audio");

if (audioFileNames && audioFileNames.length === 0) {
  console.log(chalk.yellow("⚠️ No audio files found in ./audio directory"));
} else {
  console.log(chalk.cyan("📂 Found audio files:"));
  audioFileNames?.forEach((file) => {
    console.log(chalk.dim(`   • ${file}`));
  });
}

if (audioFileNames) {
  const transcriptionPromises = audioFileNames.map(async (fileName, index) => {
    const progress = `[${index + 1}/${audioFileNames.length}]`;

    console.log(
      chalk.cyan(
        `${progress} ${chalk.cyan.bold("🔄 Processing:")} ${chalk.white(
          fileName
        )}`
      )
    );
    try {
      const filePath = path.resolve(`./audio/${fileName}`);
      const { text } = await openAIClient.audio.transcriptions.create({
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
        chalk.gray(`📝 Content preview: "${text.substring(0, 100)}..."`)
      );
      return { fileName, success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        chalk.red.bold("❌ Error processing: ") + chalk.red(fileName),
        "   " + chalk.red.dim(errorMessage)
      );
      return { fileName, success: false };
    }
  });

  const results = await Promise.all(transcriptionPromises);
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(chalk.dim("═".repeat(50)));
  console.log(chalk.bold("📊 Transcription Summary"));
  console.log(chalk.dim("─".repeat(20)));
  console.log(chalk.green.bold(`✅ Successful: ${chalk.white(successful)}`));
  console.log(chalk.red.bold(`❌ Failed: ${chalk.white(failed)}`));
  console.log();
}
