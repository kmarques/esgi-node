const https = require("https");
const http = require("http");

function Scrapper(url, { body, ...options }, callback) {
  const protocol = url.startsWith("https") ? https : http;
  if (body) {
    const type = options.headers["content-type"];
    // Encode body
    if (type.indexOf("json") !== -1) {
      body = JSON.stringify(body);
    }
    if (type.indexOf("x-www-form-urlencoded") !== -1) {
      body = new URLSearchParams(body);
      body = body.toString();
    }
    // Buffer
    body = Buffer.from(body);
    options.headers["content-length"] = Buffer.byteLength(body);
  }
  const request = protocol.request(url, options, (response) => {
    let data = [];

    // Create list of buffers
    response.on("data", (chunk) => {
      data.push(chunk);
    });

    response.on("end", () => {
      console.log("Socket read");
      // Concatenate all buffers
      data = Buffer.concat(data);

      // Convert buffer to something
      if (response.headers["content-type"].indexOf("json") !== -1) {
        data = data.toString();
        data = JSON.parse(data);
      }

      callback(data);
    });
  });

  this.send = function () {
    request.write(body);
    request.end();
  };
}

module.exports = Scrapper;
