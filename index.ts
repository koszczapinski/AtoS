import fs from "fs";
import path from "path";

import { Command } from "commander";
import chalk from "chalk";

import { openAIClient, SUPPORTED_LANGUAGES } from "@/api/openai";
import { getDirectoryFileNames } from "@/utils";

type TranscriptionResult = {
  fileName: string;
  success: boolean;
  text?: string;
  error?: string;
};

function setupCLI() {
  const program = new Command();
  program
    .name("transcribe")
    .description("Audio transcription tool")
    .option("-l, --lang <language>", "language to transcribe to", "en")
    .option("-i, --input-dir <directory>", "input directory", "./audio")
    .option("-o, --output-dir <directory>", "output directory", "./transcripts")
    .parse();

  return program.opts();
}

async function processAudioFile(
  fileName: string,
  options: { inputDir: string; outputDir: string; language: string },
  progress: string
): Promise<TranscriptionResult> {
  console.log(
    chalk.cyan(
      `${progress} ${chalk.cyan.bold("🔄 Processing:")} ${chalk.white(
        fileName
      )}`
    )
  );

  try {
    const filePath = path.resolve(`${options.inputDir}/${fileName}`);
    const { text } = await openAIClient.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
      language: options.language,
    });

    await Bun.write(`${options.outputDir}/${fileName.split(".")[0]}.txt`, text);
    console.log(
      chalk.green.bold("✅ Successfully transcribed: ") + chalk.green(fileName)
    );
    console.log(
      chalk.gray(`📝 Content preview: "${text.substring(0, 100)}..."`)
    );
    return { fileName, success: true, text };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(
      chalk.red.bold("❌ Error processing: ") + chalk.red(fileName),
      "   " + chalk.red.dim(errorMessage)
    );
    return { fileName, success: false, error: errorMessage };
  }
}

function printSummary(results: TranscriptionResult[], duration: number) {
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(chalk.dim("═".repeat(50)));
  console.log(chalk.bold("📊 Transcription Summary"));
  console.log(chalk.dim("─".repeat(20)));
  console.log(chalk.green.bold(`✅ Successful: ${chalk.white(successful)}`));
  console.log(chalk.red.bold(`❌ Failed: ${chalk.white(failed)}`));
  console.log(
    chalk.blue.bold(`⏱️ Duration: ${chalk.white(duration.toFixed(2))}s`)
  );
  console.log();
}

async function main() {
  console.log(chalk.blue.bold("🎙️ Starting audio transcription process..."));
  const startTime = Date.now();

  const options = setupCLI();
  const audioFileNames = getDirectoryFileNames(options.inputDir);

  if (!audioFileNames?.length) {
    console.log(chalk.yellow("⚠️ No audio files found in ./audio directory"));
    return;
  }

  if (!SUPPORTED_LANGUAGES.includes(options.lang)) {
    console.log(
      chalk.red.bold("❌ Invalid language: ") + chalk.red(options.lang)
    );
    return;
  }

  console.log(chalk.cyan("📂 Found audio files:"));
  audioFileNames.forEach((file) => {
    console.log(chalk.dim(`   • ${file}`));
  });
  console.log(chalk.cyan(`🌐 Language: ${options.lang}`));

  const transcriptionPromises = audioFileNames.map((fileName, index) =>
    processAudioFile(
      fileName,
      {
        inputDir: options.inputDir,
        outputDir: options.outputDir,
        language: options.lang,
      },
      `[${index + 1}/${audioFileNames.length}]`
    )
  );

  const results = await Promise.all(transcriptionPromises);
  const duration = (Date.now() - startTime) / 1000;
  printSummary(results, duration);
}

main().catch((error) => {
  console.error(chalk.red("Fatal error:"), error);
  process.exit(1);
});
