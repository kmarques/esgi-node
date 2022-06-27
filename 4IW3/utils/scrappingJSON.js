const https = require("https");

const options = {};
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

    console.log(
      JSON.parse(data)
        .filter((item) => item.id > 80)
        .map((item) => ({
          id: item.id,
          name: item.title,
          provider: "JSON_PLACEHOLDER",
        }))
    );
  });
});

request.end();
