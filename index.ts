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
  for (const fileName of audioFileNames) {
    console.log(fileName);
    const { text } = await openai.audio.transcriptions.create({
      file: fs.createReadStream(`./audio/${fileName}`),
      model: "whisper-1",
      language: "pl",
    });
    // write the transcription to a file to /transcripts/fileName.txt
    //const fileName = FILENAME_FOR_TRANSCRIPTION.split(".")[0];

    await Bun.write(`./transcripts/${fileName.split(".")[0]}.txt`, text);

    console.log(text);
  }
}
