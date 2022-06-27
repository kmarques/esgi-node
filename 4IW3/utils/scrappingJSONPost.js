const https = require("https");

let input = {
  title: "New article",
  foo: "test",
};
// Convert to JSON
//input = JSON.stringify(input);
// Convert to queryString
input = new URLSearchParams(input);
input = input.toString();
// Convert to Buffer
input = Buffer.from(input);
const options = {
  method: "POST",
  headers: {
    //"content-type": "application/json",
    "content-type": "application/x-www-form-urlencoded",
    "content-length": Buffer.byteLength(input),
  },
};
const url = "https://jsonplaceholder.typicode.com/posts";
const request = https.request(url, options, (response) => {
  let data = [];

  // Create list of buffers
  response.on("data", (chunk) => {
    console.log("**" + chunk.toString() + "**");
    data.push(chunk);
  });

  response.on("end", () => {
    console.log("Socket read");
    // Concatenate all buffers
    data = Buffer.concat(data);

    // Convert buffer to string
    data = data.toString();

    console.log(JSON.parse(data));
  });
});

request.write(input);

request.end();
