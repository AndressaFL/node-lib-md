import chalk from "chalk";
import getFile from "./index.js";
import fs from "fs";
import validatedList from "./http-validation.js";

const path = process.argv;

function printList(validation, result, identifier = "") {

  if (validation){
    console.log(
      chalk.yellow("Validated list"),
      chalk.black.bgGreen(identifier),
      validatedList(result));
  }else{

    console.log(
      chalk.yellow("List Links"),
      chalk.black.bgGreen(identifier),
      result);
  }

}

async function processText(arg) {
  const path = arg[2];
  const validation = arg[3] ==='--validation';

  
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
    printList(validation, result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);
    files.forEach(async (nameFiles) => {
      const list = await getFile(`${path}/${nameFiles}`);
      printList(validation, list, nameFiles);
    });
  }
}

processText(path);
