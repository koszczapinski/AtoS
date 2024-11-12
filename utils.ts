import fs from "fs";
import path from "path";

export const renameFilesInDirectory = async (directory: string): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directory);

    const renamePromises = files.map(async (file) => {
      if (file === ".gitkeep") {
        return;
      }

      const filePath = path.join(directory, file);

      const stats = await fs.promises.stat(filePath);
      if (!stats.isFile()) {
        return;
      }

      const ext = path.extname(file);
      let baseName = path.basename(file, ext);
      baseName = baseName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");

      const newFileName = `${baseName}${ext}`;
      const newFilePath = path.join(directory, newFileName);

      if (file !== newFileName) {
        await fs.promises.rename(filePath, newFilePath);
        console.log(`Renamed: ${file} → ${newFileName}`);
      }
    });

    await Promise.all(renamePromises);
    console.log("All files have been renamed successfully");
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
    throw error;
  }
};

export const getDirectoryFileNames = (
  dir: string,
  comparator?: (a: string, b: string) => number
): string[] | null => {
  try {
    const fileNames = fs.readdirSync(dir);
    const filteredFileNames = fileNames.filter(
      (fileName) => fileName !== ".gitkeep"
    );
    if (comparator) {
      filteredFileNames.sort(comparator);
    } else {
      filteredFileNames.sort();
    }
    return filteredFileNames;
  } catch (err) {
    console.error(`Failed to read directory ${dir}:`, err);
    return null;
  }
};

export const cleanDirectory = async (directory: string): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directory);
    const unlinkPromises = files
      .filter(file => file !== ".gitkeep")
      .map(file => fs.promises.unlink(path.join(directory, file)));

    await Promise.all(unlinkPromises);
    console.log(`Cleaned directory: ${directory}`);
  } catch (error) {
    console.error(`Error cleaning directory ${directory}:`, error);
    throw error;
  }
};
