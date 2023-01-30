import fs from "fs";
import chalk from "chalk";

function getError(err) {
  throw new Error(chalk.red(err.code, "file nor found"));
}

function extractLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capture = [...text.matchAll(regex)]; //show all information from regex.
  const results = capture.map((capture) => ({ [capture[1]]: capture[2] }));
  return results.length !== 0 ? results : "Links not found";
}

//async/await

async function getFile(filePath) {
  try {
    const encoding = "utf-8";
    const text = await fs.promises.readFile(filePath, encoding);
    return extractLinks(text);
  } catch (err) {
    getError(err);
  }
}

//promises
// function getFile(filePath){
//     const encoding = 'utf-8';
//     fs.promises
//     .readFile(filePath, encoding)
//     .then((text)=> console.log(chalk.green(text)))
//     .catch(getError)
// }

export default getFile;
