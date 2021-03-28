const fetchTitle = require("../utils/fetchTitle");
const prepareHtmlResponse = require("../utils/prepareHtmlResponse");
const combineLatest = require("rxjs");
const { Observable } = require("rxjs/Observable");
const { map, flatMap } = require("rxjs/operators");

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
      var fetchContent = function (url) {
        return rx.Observable.create(function (observer) {
          https.get(url, function (error, response, body) {
            if (error) {
              observer.onError();
            } else {
              observer.onNext({ response: response, body: body });
            }
            observer.onCompleted();
          });
        });
      };
    }
  } catch (err) {
    next(err);
  }
};
