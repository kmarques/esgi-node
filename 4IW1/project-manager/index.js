const fs = require("fs/promises");
const path = require("path");
const childProcess = require("child_process");

const currentPath = process.cwd();

async function findPackagesJSON(currentDirectory) {
  const files = await fs.readdir(currentDirectory, { withFileTypes: true });
  if (files.find((file) => file.name === "package.json")) {
    return [currentDirectory + "/" + "package.json"];
  } else {
    const directories = files.filter(
      (file) => file.isDirectory() && file.name !== "node_modules"
    );
    if (directories.length !== 0) {
      const found = await Promise.all(
        directories.map((directory) =>
          findPackagesJSON(currentDirectory + "/" + directory.name)
        )
      );
      found.filter((file) => file.length !== 0);
      return found.flat();
    }
    return [];
  }
}

function lookup() {
  return findPackagesJSON(currentPath).then((result) =>
    result.map((file) => {
      const packageJSON = require(file);
      return {
        filename: file,
        name: packageJSON.name,
        version: packageJSON.version,
        scripts: packageJSON.scripts,
      };
    })
  );
}

function execute(args) {
  const [projectToStart, scriptToStart] = args;
  lookup()
    .then((result) => {
      const res = result.find((project) => project.name === projectToStart);
      if (!res) {
        throw new Error(
          `Project ${projectToStart} not found, expected one of [${result
            .map((project) => project.name)
            .join(", ")}]`
        );
      }
      return res;
    })
    .then((project) => {
      const baseDirectory = path.dirname(project.filename);
      const script = project.scripts[scriptToStart];
      if (!script) {
        throw new Error(
          `No script ${scriptToStart} found, expected one of [${Object.keys(
            project.scripts
          )}]`
        );
      }
      const command = script.split(" ");
      const [executable, ...args] = command;
      const options = {
        cwd: baseDirectory,
        stdio: "inherit",
      };
      return new Promise((resolve, reject) => {
        const process = childProcess.spawn(executable, args, options);
        process.on("error", (error) => reject(error));
        process.on("exit", (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Process exited with code ${code}`));
          }
        });
      });
    })
    .catch((error) => console.error(error));
}

//checkProject list
//checkProject run 4IW2 start
const args = process.argv.slice(2);
switch (args.shift()) {
  case "list":
    lookup().then((result) => console.log(result));
    break;
  case "exec":
    execute(args);
    break;
  default:
    process.exit(1);
}
