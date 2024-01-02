import OpenAI from "openai";
import fs from "fs";
import { getAudioFileNames } from "./utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("getting audio file names...");

const audioFileNames: string[] | undefined = await getAudioFileNames("./audio");

console.log(audioFileNames);

if (audioFileNames) {
  for (const [index, fileName] of audioFileNames.entries()) {
    console.log(
      `[${index}/${audioFileNames.length}] Transcribing file: ${fileName} ...`
    );
    const { text } = await openai.audio.transcriptions.create({
      file: fs.createReadStream(`./audio/${fileName}`),
      model: "whisper-1",
      language: "pl",
    });

    await Bun.write(`./transcripts/${fileName.split(".")[0]}.txt`, text);

    console.log(text);
  }
}
