const https = require("https");

const request = https.request(
  "https://v2.jokeapi.dev/joke/Any?amount=10",
  {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  },
  (response) => {
    let data = Buffer.alloc(0);
    response.on("data", (chunk) => {
      data = Buffer.concat([data, chunk]);
    });

    response.on("end", () => {
      const contentType = response.headers["content-type"];
      let result = null;
      if (contentType.indexOf("application/json") !== -1) {
        result = JSON.parse(data.toString());
      }
      console.log(
        result.jokes.map((joke) => ({
          id: joke.id,
          value:
            joke.type === "single" ? joke.joke : [joke.setup, joke.delivery],
        }))
      );
    });
  }
);

request.end();
