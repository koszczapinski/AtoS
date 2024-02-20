import fs from "fs";
import path from "path";

export const renameFilesInDirectory = async (directory: string) => {
  try {
    const files = await fs.promises.readdir(directory);

    const renamePromises = files.map(async (file) => {
      const filePath = path.join(directory, file);

      const ext = path.extname(file);
      let baseName = path.basename(file, ext);

      baseName = baseName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");

      const newFileName = `${baseName}${ext}`;
      const newFilePath = path.join(directory, newFileName);

      const data = await fs.promises.readFile(filePath);
      await fs.promises.writeFile(newFilePath, data);
      // Delete the original file if the new file name is different
      if (file !== newFileName) {
        await fs.promises.unlink(filePath);
      }
    });

    await Promise.all(renamePromises);
    console.log("All files have been renamed successfully");
  } catch (error) {
    console.error("An error occurred while renaming the files:", error);
  }
};

export const getDirectoryFileNames = (
  dir: string,
  comparator?: (a: string, b: string) => number
): string[] | null => {
  try {
    const fileNames = fs.readdirSync(dir);
    if (comparator) {
      fileNames.sort(comparator);
    } else {
      fileNames.sort();
    }
    return fileNames;
  } catch (err) {
    console.error(`Failed to read directory ${dir}:`, err);
    return null;
  }
};

export const cleanDirectory = async (directory: string) => {
  const files = await fs.promises.readdir(directory);
  const unlinkPromises = files.map((file) =>
    fs.promises.unlink(path.join(directory, file))
  );
  return Promise.all(unlinkPromises);
};
