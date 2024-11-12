import { cleanDirectory } from "./utils";
import path from "path";

const audioDir = path.join(process.cwd(), "audio");
const transcriptDir = path.join(process.cwd(), "transcripts");

async function main() {
  try {
    await Promise.all([
      cleanDirectory(audioDir),
      cleanDirectory(transcriptDir)
    ]);
    console.log("All directories cleaned successfully");
  } catch (error) {
    console.error("Failed to clean directories:", error);
    process.exit(1);
  }
}

main();
