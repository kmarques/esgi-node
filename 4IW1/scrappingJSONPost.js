const https = require("https");

const data = Buffer.from(
  JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  })
);

const request = https.request(
  "https://jsonplaceholder.typicode.com/posts",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
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
      console.log(result);
    });
  }
);
request.write(data);
request.end();
