const https = require("https");
const getContentByTag = require("./getContentByTag");
module.exports = (address, callback) => {
  try {
    https.get(address, function (req) {
      var postData = "";
      req.once("data", function (chunk) {
        postData += chunk;
      });
      req.once("end", function () {
        const title = getContentByTag(postData, "title");
        callback(null, title);
      });
    });
  } catch (err) {
    callback(err);
  }
};
