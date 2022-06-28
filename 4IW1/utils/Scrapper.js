const https = require("https");
const http = require("http");

module.exports = function Scrapper(
  url,
  options = {},
  processData = (data) => data
) {
  let {
    query = {},
    body = null,
    headers = {},
    method = "GET",
    ...restOptions
  } = options;

  const protocol = url.startsWith("https") ? https : http;
  if (body) {
    if (headers["Content-Type"] === "application/json") {
      body = typeof body == "object" ? JSON.stringify(body) : body;
    }
    headers["Content-Length"] = Buffer.byteLength(body);
    body = Buffer.from(body);
  }
  const params = new URLSearchParams(query).toString();
  const request = protocol.request(
    url + (params.length ? "?" + params : ""),
    {
      headers,
      method,
      ...restOptions,
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
        processData(result);
      });
    }
  );
  this.send = function () {
    if (body) request.write(body);
    request.end();
  };
};
