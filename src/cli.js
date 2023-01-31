import chalk from "chalk";
import getFile from "./index.js";
import fs from "fs";

const path = process.argv;

function printList(result, identifier = "") {
  console.log(
    chalk.yellow("Links List"),
    chalk.black.bgGreen(identifier),
    result
  );
}

async function processText(arg) {
  const path = arg[2];
  try {
    fs.lstatSync(path);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Cannot find the file or directory");
      return;
    }
  }

  if (fs.lstatSync(path).isFile()) {
    const result = await getFile(arg[2]);
    printList(result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);
    files.forEach(async (nameFiles) => {
      const list = await getFile(`${path}/${nameFiles}`);
      printList(list, nameFiles);
    });
  }
}

processText(path);
