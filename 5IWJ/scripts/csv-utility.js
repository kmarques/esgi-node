const fs = require("node:fs/promises");
const path = require("node:path");
const readline = require("node:readline/promises");

const FILEPATH = "./movie.csv";
const CSVFILE = path.join(process.cwd(), FILEPATH);

(async () => {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await fs.access(CSVFILE, fs.constants.F_OK | fs.constants.R_OK);
    const buffer = await fs.readFile(CSVFILE);
    const data = buffer.toString();
    let csvData = convertToArray(data);
    // process
    let answer = null;
    do {
      previewData(csvData);

      answer = await rl.question(
        "What do you want to do (swap,quit,sort,save)? "
      );
      csvData = await processAnswer(rl, answer, csvData);
    } while (answer !== "quit");
    rl.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

function convertToArray(data) {
  const [headersString, ...dataStrings] = data.split("\n");
  const headers = headersString.split(",");
  return dataStrings.map((dataString) => {
    const dataValues = dataString.split(",");
    return dataValues.reduce((acc, value, index) => {
      acc[headers[index]] = value;
      return acc;
    }, {});
  });
}
function previewData(data) {
  console.table(data.slice(0, 10));
}

async function processAnswer(readline, answer, data) {
  switch (answer) {
    case "swap":
      break;
    case "sort":
      return await processSort(readline, data);
    case "save":
        await processSave(readline, data); 
    default:
        return data;
  }
}

async function processSort(readline, data) {
  const column = await choiceQuestion(
    readline,
    "Which column ? ",
    Object.keys(data[0])
  );
  const order = await choiceQuestion(readline, "In which order (ASC,DESC)?", [
    "ASC",
    "DESC",
  ]);

  return data.sort((a, b) => {
    if (a[column] > b[column]) {
        return order === "ASC" ? 1 : -1;
    }
    if (a[column] < b[column]) {
        return order === "ASC" ? -1 : 1;
    }
    return 0;
  });
}

async function processSave(readline, data) {
    let filepath = await readline.question("In which path (inplace,filepath)? ");
    let checkAccess = false;
    if (filepath === "inplace") {
        filepath = CSVFILE;
        checkAccess = true;
    }
    checkAccess && await fs.access(filepath, fs.constants.W_OK);
    const headerString = Object.keys(data[0]).join(",");
    const dataStrings = data.map(item => Object.values(item).join(","));
    await fs.writeFile(filepath, headerString+dataStrings.join("\n"));
}

async function choiceQuestion(readline, question, validAnswers) {
  while (true) {
    const answer = await readline.question(question);
    if (validAnswers.includes(answer)) {
      return answer;
    }
  }
}
