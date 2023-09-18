const fs = require("node:fs/promises");
const readline = require("node:readline/promises");
const path = require("node:path");

const CSV_FILE = process.argv[2];

String.prototype.decodeCSV = function ({ delimiter = "," } = {}) {
  const [headerString, ...valuesString] = this.split(/\r?\n/);
  const headers = headerString.split(delimiter);
  return valuesString.map((line) => {
    const values = line.split(delimiter);
    return values.reduce((acc, item, index) => {
      acc[headers[index]] = item;
      return acc;
    }, {});
  });
};
Array.prototype.toCSV = function ({ delimiter = "," } = {}) {
  const headerString = Object.keys(this.at(0)).join(delimiter);
  const values = this.map((item) => Object.values(item).join(delimiter)).join(
    "\n"
  );
  return `${headerString}\n${values}`;
};

readline.Interface.prototype.choiceQuestion = async function choiceQuestion(
  question,
  choices
) {
  let answer;
  do {
    answer = await this.question(question);
  } while (!choices.includes(answer));

  return answer;
};

fs.access(CSV_FILE, fs.constants.R_OK)
  .then(() => console.log("File readable"))
  .then(() => fs.readFile(CSV_FILE))
  .then((data) => data.toString().decodeCSV())
  .then((data) => processMenu(data))
  .catch((error) => console.error(error));

async function processMenu(data) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let answer;
  do {
    console.table(data.slice(0, 10));
    answer = await rl.question(
      "What do you want to do (sort,swap,save,quit) ? "
    );
    await processAnswer(answer, data, rl);
  } while (answer !== "quit");

  rl.close();
}

async function processAnswer(answer, data, rl) {
  switch (answer) {
    case "swap":
      await processSwap(data, rl);
      break;
    case "save":
      await processSave(data, rl);
      break;
  }
}

async function processSwap(data, rl) {
  const headers = Object.keys(data[0]);
  const firstCol = await rl.choiceQuestion("First column ? ", headers);
  const indexFirstCol = headers.indexOf(firstCol);
  const secondCol = await rl.choiceQuestion("Second column ? ", headers);
  const indexSecondCol = headers.indexOf(secondCol);

  data.forEach((item, index) => {
    // [ [key, val] , [key,val] ]
    const entries = Object.entries(item);

    const tupleFirstCol = entries[indexFirstCol];
    entries.splice(indexFirstCol, 1, entries.at(indexSecondCol));
    entries.splice(indexSecondCol, 1, tupleFirstCol);

    const newValue = Object.fromEntries(entries);
    data[index] = newValue;
  });
}

async function processSave(data, rl) {
  const answer =
    (await rl.question("Where to save data (default: in-place)? ")) ||
    "in-place";
  let filePath = answer === "in-place" ? CSV_FILE : answer;
  filePath = path.resolve(filePath);
  try {
    await checkFileWritable(filePath);
    await fs.writeFile(filePath, data.toCSV());
    console.log(`Data saved to ${filePath}`);
  } catch (error) {
    console.error(`File "${filePath}" not writable`);
  }
}

async function checkFileWritable(filepath) {
  try {
    await fs.access(filepath, fs.constants.F_OK);
    await fs.access(filepath, fs.constants.W_OK);
    return true;
  } catch (error) {
    if (error.code === "EACCES") throw new Error();
  }
}
