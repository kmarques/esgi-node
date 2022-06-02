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
  (res) => {
    // Récupération du contenu de la réponse
    let data = Buffer.alloc(0);
    res.on("data", (d) => {
      data = Buffer.concat([data, d]);
    });
    res.on("end", () => {
      let result = null;
      // Parser la réponse
      if (res.headers["content-type"].indexOf("application/json") !== -1) {
        const charset = res.headers["content-type"].match(/charset=([\w-]+)/);
        result = JSON.parse(data.toString(charset[1]));
      }
      console.log(`Status code: ${res.statusCode}`);
      // Traiter la réponse
      console.log(result);
    });
  }
);

request.write(data);

request.end();
