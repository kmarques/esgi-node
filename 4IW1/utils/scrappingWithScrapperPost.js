const Scrapper = require("./Scrapper");

const scrap = new Scrapper(
  "https://jsonplaceholder.typicode.com/posts",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      title: "foo",
      body: "bar",
      userId: 1,
    },
  },
  (data) => console.log(data)
);
scrap.send();
