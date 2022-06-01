const http = require("http");

const request = http.request(
  "http://www.omdbapi.com/?apikey=6565fb34&s=batman",
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
      // Detect response type
      const contentType = response.headers["content-type"];
      let result = null;
      // Parsing
      if (contentType.indexOf("application/json") !== -1) {
        result = JSON.parse(data.toString());
      }
      // Processing
      console.log(
        result.Search.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
        }))
      );
    });
  }
);

request.end();
