const fs = require("fs/promises");
const { constants: fsConstants } = require("fs");
const path = require("path");
const readline = require("readline/promises");

const commands = {};

function lookupDirectory(dirname) {
  return fs
    .access(dirname, fsConstants.R_OK)
    .then(() => fs.readdir(dirname))
    .then((files) => files.map((file) => require(`${dirname}/${file}`)))
    .then((modules) =>
      modules.forEach((module) => {
        commands[module.name] = module;
      })
    )
    .then(() => console.log(commands))
    .catch((err) => console.error(err));
}

function watch(options) {
  setTimeout(() => {
    console.log(Date());
    lookupDirectory(options.folder).then(() => watch(options));
  }, options.watch);
}

//watch();

// discovery.js --folder ./4IW2/command --watch-time 2000
function parseOptions(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      options[arg.substring(2)] = args[i + 1];
      i++;
    }
  }
  return options;
}

async function askMissingOptionsOnReadline(options, expectedOptions) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  for (let requiredOption of expectedOptions) {
    if (!options[requiredOption]) {
      let result = null;
      do {
        result = await rl.question(`${requiredOption}: `);
      } while (!result);
      options[requiredOption] = result;
    }
  }
  await rl.close();
  return options;
}

const args = process.argv.slice(2);
const options = parseOptions(args);
console.log(process.cwd());
askMissingOptionsOnReadline(options, ["folder"]).then((options) => {
  if (options.folder.startsWith(".")) {
    options.folder = path.join(process.cwd(), options.folder);
  }
  lookupDirectory(options.folder).then(() => options.watch && watch(options));
});
