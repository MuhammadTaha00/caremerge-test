const axios = require("axios");
const async = require("async");
const getContentByTag = require("../utils/getContentByTag");
const prepareHtmlResponse = require("../utils/prepareHtmlResponse");
module.exports = async (req, res, next) => {
  const {
    query: { address },
  } = req;
  try {
    if (Array.isArray(address)) {
      const tasks = address.map(
        (a) =>
          function (callback) {
            axios.get(a).then((res) => {
              callback(null, res);
            });
          }
      );
      async.parallel(tasks, function (err, results) {
        const titles = results.map(({ data }) =>
          getContentByTag(data, "title")
        );
        res.send(prepareHtmlResponse(titles));
      });
    } else {
      const response = await axios.get(address);
      const title = getContentByTag(response.data, "title");
      res.send(prepareHtmlResponse([title]));
    }
  } catch (err) {
    next(err);
  }
};
