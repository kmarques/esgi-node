const fs = require("fs/promises");
const { constants } = require("fs");
const path = require("path");

const directory = "./";

function getDirectories(currentPath) {
  return fs
    .access(currentPath, constants.R_OK)
    .then(() => fs.readdir(currentPath, { withFileTypes: true }))
    .then((files) => files.filter((file) => file.isDirectory()))
    .then((files) => {
      const expectedFolders = files
        .filter((file) => ["node_modules", "vendor"].includes(file.name))
        .map((file) => path.join(currentPath, file.name));
      return expectedFolders.length
        ? expectedFolders
        : Promise.all(
            files.map((file) =>
              getDirectories(path.join(currentPath, file.name))
            )
          );
    })
    .then((folders) => folders.flat());
}

function getDurationFullFormat(date1, date2) {
  const diff = date2.getTime() - date1.getTime();
  const days = Math.abs(diff / (1000 * 60 * 60 * 24));
  const hours = Math.abs((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.abs((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.abs((diff % (1000 * 60)) / 1000);
  return `${days >= 1 ? Math.floor(days) : 0} days, ${
    hours >= 1 ? Math.floor(hours) : 0
  } hours, ${minutes >= 1 ? Math.floor(minutes) : 0} minutes, ${
    seconds >= 1 ? Math.floor(seconds) : 0
  } seconds`;
}

function statsDirectories(directories) {
  return Promise.all(
    directories.map(
      (directory) =>
        new Promise((res) => {
          fs.stat(directory).then((stats) =>
            res({
              directory,
              lastModified: stats.mtime,
              modifiedSince: getDurationFullFormat(
                new Date(),
                new Date(stats.mtime)
              ),
            })
          );
        })
    )
  );
}

const options = process.argv.slice(2);
function parseOptions(options) {
  const parsedOptions = {};
  for (let i = 0; i < options.length; i++) {
    if (options[i].startsWith("--")) {
      parsedOptions[options[i].slice(2)] = options[i + 1];
      i++;
    }
  }

  return parsedOptions;
}

const parsedOptions = parseOptions(options);
getDirectories(parsedOptions.folder || directory)
  .then(statsDirectories)
  .then((directories) => console.log(directories));
