const URL_MATCHER = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
const isValid = (address) => {
  return address.match(URL_MATCHER);
};
module.exports = (req, _res, next) => {
  const { address } = req.query;
  const errorInvalidAddress = new Error("Invalid or no address(es) provided");

  if (!address) return next(errorInvalidAddress);

  if (Array.isArray(address)) {
    const allAddressAreValid = address.every((a) => isValid(a));
    if (!allAddressAreValid) return next(errorInvalidAddress);
    return next();
  }

  if (!isValid(address)) {
    return next(errorInvalidAddress);
  }
  next()
};
