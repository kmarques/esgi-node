// Scrapper la page des codes http de wikipédia
// et ressortir un object avec les codes et leur signification
// en utilisant l'object Scrapper
const Scrapper = require("./Scrapper");

new Scrapper(
  "https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP",
  {},
  ({ result: document }) => {
    const rows = document.querySelectorAll(
      "table.wikitable tr:not(:first-child) th, table.wikitable tr:not(:first-child) td:first-of-type"
    );
    let result = {};
    for (let i = 0; i < rows.length; i += 2) {
      result[rows[i].textContent.trim()] = rows[i + 1].textContent.trim();
    }
    console.log(result);
  }
).send();
