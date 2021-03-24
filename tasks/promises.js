const axios = require("axios");
const getContentByTag = require("../utils/getContentByTag");
const prepareHtmlResponse = require("../utils/prepareHtmlResponse");
module.exports = async (req, res, next) => {
  const {
    query: { address },
  } = req;
  try {
    if (Array.isArray(address)) {
      const promises = address.map(async (a) => await axios.get(a));
      console.log(promises);
      Promise.all(promises).then((results) => {
        const titles = results.map(({ data }) =>
          getContentByTag(data, "title")
        );
        res.send(prepareHtmlResponse(titles));
      });
    } else {
      const response = await axios.get(address);
      const title = getContentByTag(response.data, "title");
      console.log(title);
      res.send(prepareHtmlResponse([title]));
    }
  } catch (err) {
    next(err);
  }
};
