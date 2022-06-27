const Scrapper = require("./scrapper");

const url = "https://jsonplaceholder.typicode.com/posts";
const options = {};
new Scrapper(url, options, (data) => {
  console.log(
    data
      .filter((item) => item.id > 80)
      .map((item) => ({
        id: item.id,
        name: item.title,
        provider: "JSON_PLACEHOLDER",
      }))
  );
}).send();
