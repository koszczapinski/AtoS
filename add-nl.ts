import fs from "fs";
import path from "path";

const fileNames = ["diw5_odc_2_001.txt", "diw5_odc_2_002.txt"];

// Specify the file paths
if (!fileNames) {
  throw new Error("No file names");
}

for (const fileName of fileNames) {
  console.log(fileName);
  const inputFile = `./transcripts/${fileName}`;
  const outputPrefix = "m_"; // Add your desired prefix here
  const outputFileName = path.basename(inputFile);
  const outputFile = path.join(outputPrefix + outputFileName);

  console.log(outputFile);
  // Read the file content
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Add new lines after each '.' but remove ' ' and '\n' after each '.'
    const modifiedContent = data.replace(/\. /g, ".\n\n").replace(/\n /g, "\n");
    // const modifiedContent = data.replace(/\./g, ".\n\n");

    // Write the modified content to a new file with the specified prefix
    fs.writeFile(
      `./transcripts/${outputFile}`,
      modifiedContent,
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log("File has been updated and saved as", outputFile);
      }
    );
  });
}
