import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { getDirectoryFileNames } from "./utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("getting audio file names...");

const audioFileNames = await getDirectoryFileNames("./audio");

console.log(audioFileNames);

// todo refactor to async promise all to make it faster

if (audioFileNames) {
  for (const [index, fileName] of audioFileNames.entries()) {
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
    } catch (error) {
      console.error(error);
    }
  }
}
