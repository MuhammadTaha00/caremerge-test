const axios = require("axios");
const RSVP = require("rsvp");
const getContentByTag = require("../utils/getContentByTag");
const prepareHtmlResponse = require("../utils/prepareHtmlResponse");
module.exports = async (req, res, next) => {
  const {
    query: { address },
  } = req;
  try {
    if (Array.isArray(address)) {
      const promises = address.map(async (a) => await axios.get(a));
      RSVP.all(promises).then((results) => {
        const titles = results.map(({ data }) =>
          getContentByTag(data, "title")
        );
        res.send(prepareHtmlResponse(titles));
      });
    } else {
      const promise = new RSVP.Promise(function (fulfill, reject) {
        const response = axios.get(address);
        fulfill(response);
      });
      promise.then(function (response) {
        const title = getContentByTag(response.data, "title");
        res.send(prepareHtmlResponse([title]));
      });
    }
  } catch (err) {
    next(err);
  }
};
