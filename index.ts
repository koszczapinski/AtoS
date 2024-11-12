import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { getDirectoryFileNames } from "./utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("getting audio file names...");

const audioFileNames = getDirectoryFileNames("./audio");

console.log(audioFileNames);

if (audioFileNames) {
  const transcriptionPromises = audioFileNames.map(async (fileName, index) => {
    console.log(
      `[${index + 1}/${
        audioFileNames.length
      }] Transcribing file: ${fileName} ...`
    );
    try {
      const filePath = path.resolve(`./audio/${fileName}`);
      const { text } = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
        language: "pl",
      });

      await Bun.write(`./transcripts/${fileName.split(".")[0]}.txt`, text);
      console.log(text);
      return { fileName, success: true };
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
      return { fileName, success: false };
    }
  });

  const results = await Promise.all(transcriptionPromises);
  console.log(
    "All transcriptions completed:",
    results.filter((r) => r.success).length,
    "successful,",
    results.filter((r) => !r.success).length,
    "failed"
  );
}
