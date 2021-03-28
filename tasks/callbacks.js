const fetchTitle = require("../utils/fetchTitle");
const prepareHtmlResponse = require("../utils/prepareHtmlResponse");
module.exports = async (req, res, next) => {
  const {
    query: { address },
  } = req;
  try {
    if (Array.isArray(address)) {
     
      function fetchTitles(
        addresses,
        callback = () => {},
        count = 0,
        titles = []
      ) {
        if (count === addresses.length) {
          callback(null, titles);
        } else
          fetchTitle(addresses[count], (err, title) => {
            if (err) {
              callback(err);
            } else {
              count++;
              runner(addresses, callback, count, [...titles, title]);
            }
          });
      }
      fetchTitles(address, (err, titles) => {
        if (err) {
          next(err);
        } else {
          res.send(prepareHtmlResponse(titles));
        }
      });
    } else {
      fetchTitle(address, (err, title) => {
        if (err) {
          next(err);
        } else {
          res.send(prepareHtmlResponse([title]));
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
