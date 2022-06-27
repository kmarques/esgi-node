const Scrapper = require("./scrapper");

const url = "https://jsonplaceholder.typicode.com/posts";
const options = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: {
    title: "New article",
    foo: "test",
  },
};

new Scrapper(url, options, (data) => {
  console.log(data);
}).send();
