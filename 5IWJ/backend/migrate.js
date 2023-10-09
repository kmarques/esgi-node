const connection = require("./models/db");
const Author = require("./models/Author");
const User = require("./models/User");

const options = {
    "--type": {
        value: true,
        default: "alter"
    },
    "--force": {},
    "--dir": {
        default: "up"
    }
}

const args = process.argv.slice(2);

do {
    const arg = args.shift();
    if (arg in options) {
        if (options[arg].value) {
            options[arg] = args.shift()
        } else {
            options[arg] = options[arg].default ?? true
        }
    }
} while(args.length);

connection
  .sync({
    [options["--type"]]: true
  })
  .then(() => connection.close())
  .then(() => console.log("Database synced"));
