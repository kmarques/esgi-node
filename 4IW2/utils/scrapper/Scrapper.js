const https = require("https");
const http = require("http");

module.exports = function Scrapper(url, options = {}, callback) {
  const protocol = url.startsWith("https") ? https : http;
  let { method = "GET", headers = {}, body = null, ...restOptions } = options;

  if (body) {
    if (typeof body === "object") {
      if (headers["Content-Type"] === "application/json") {
        body = JSON.stringify(body);
      }
      if (headers["Content-Type"] === "application/x-www-form-urlencoded") {
        body = new URLSearchParams(body).toString();
      }
    }
    body = body instanceof Buffer ? body : Buffer.from(body);
    headers["Content-Length"] = body.length;
  }

  const request = protocol.request(
    url,
    {
      method,
      headers,
      ...restOptions,
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
        callback({ status: res.statusCode, result });
      });
    }
  );

  if (body) {
    request.write(body);
  }

  this.send = function () {
    request.end();
  };
};
