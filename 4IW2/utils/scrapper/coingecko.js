const https = require("https");

const request = https.request(
  "https://api.coingecko.com/api/v3/coins/list",
  {
    method: "GET",
    headers: {
      Accept: "application/json",
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
      // Traiter la réponse
      console.log(result.map((coin) => coin.symbol));
    });
  }
);

request.end();
