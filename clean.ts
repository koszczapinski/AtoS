import { cleanDirectory } from "./utils";
import path from "path";
import chalk from "chalk";

const audioDir = path.join(process.cwd(), "audio");
const transcriptDir = path.join(process.cwd(), "transcripts");

async function main() {
  try {
    await Promise.all([
      cleanDirectory(audioDir),
      cleanDirectory(transcriptDir),
    ]);
    console.log(chalk.green.bold("✅ All directories cleaned successfully"));
  } catch (error) {
    console.error(
      chalk.red.bold("❌ Failed to clean directories:"),
      chalk.red(error)
    );
    process.exit(1);
  }
}

main();
