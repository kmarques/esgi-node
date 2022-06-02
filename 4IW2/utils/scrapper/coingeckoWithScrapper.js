const Scrapper = require("./Scrapper");

const scrap = new Scrapper(
  "https://api.coingecko.com/api/v3/coins/list",
  {
    headers: {
      Accept: "application/json",
    },
  },
  (result) => {
    console.log(result.result.map((coin) => coin.symbol));
  }
);

scrap.send();
