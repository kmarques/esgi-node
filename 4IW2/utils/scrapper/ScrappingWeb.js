// Scrapper la page des codes http de wikipédia
// et ressortir un object avec les codes et leur signification
// en utilisant l'object Scrapper
const Scrapper = require("./Scrapper");

new Scrapper(
  "https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP",
  {},
  ({ result: document }) => {
    const start = Date.now();
    const rows = document.querySelectorAll(
      "table.wikitable tr:not(:first-child) th, table.wikitable tr:not(:first-child) td:first-of-type"
    );
    let result = {};
    for (let i = 0; i < rows.length; i += 2) {
      result[rows[i].textContent.trim()] = rows[i + 1].textContent.trim();
    }
    console.log(result);
    console.log(Date.now() - start);

    const data = document;
    const timer = Date.now();
    const value = Object.values(data.querySelectorAll("table tbody tr"));
    const dataValue = value.map((valueTR) => {
      const codeTR = valueTR.childNodes[1].textContent.trim();
      const descriptionTR = valueTR.childNodes[3].textContent.trim();
      return [parseInt(codeTR), descriptionTR];
    });
    console.log(
      Object.fromEntries(dataValue.filter((data) => !isNaN(data[0])))
    );
    console.log(Date.now() - timer);
  }
).send();
