const { RxHR } = require("@akanass/rx-http-request");
const { map } = require("rxjs/operators");
const { from } = require("rxjs");
const getContentByTag = require("../utils/getContentByTag");
const prepareHtmlResponse = require("../utils/prepareHtmlResponse");

module.exports = async (req, res, next) => {
  //let form(titles);
  let titles = [];
  //from(titles);
  const addresses$ = from([
    "https://www.google.com",
    "https://stackoverflow.com",
    "https://www.bmc.com",
  ]);

  const titles$ = addresses$.pipe(
    map((address) => {
      return RxHR.get(address).subscribe((r) => {
        const title = getContentByTag(r.body, "title");
        titles.push(title);
        console.log(title);
      });
    })
  );

  titles$.subscribe((titles) => console.log(titles));
};
