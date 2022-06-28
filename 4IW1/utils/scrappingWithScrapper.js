const Scrapper = require("./Scrapper");

const scrap = new Scrapper(
  "https://v2.jokeapi.dev/joke/Any",
  {
    query: {
      amount: 10,
    },
  },
  (data) =>
    console.log(
      data.jokes.map((joke) => ({
        id: joke.id,
        value: joke.type === "single" ? joke.joke : [joke.setup, joke.delivery],
      }))
    )
);
scrap.send();
