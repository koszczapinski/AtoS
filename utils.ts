import { readdir } from "node:fs/promises";
import { join } from "node:path";

export const getAudioFileNames = async (dir: string) => {
  try {
    const fileNames = await readdir(dir);
    return fileNames;
  } catch (err) {
    console.error(err);
  }
};
