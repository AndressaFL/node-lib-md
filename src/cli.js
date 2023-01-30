import chalk from "chalk";
import getFile from "./index.js";
import fs from "fs";

const path = process.argv;

async function processText(arg) {
  const path = arg[2];

  if (fs.lstatSync(path).isFile()) {
    const result = await getFile(arg[2]);
    console.log(chalk.yellow("Links list"), result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);
    files.forEach(async (nameFiles) => {
      const list = await getFile(`${path}/${nameFiles}`);
      console.log(list);
    });
    console.log(files);
  }
}

processText(path);
