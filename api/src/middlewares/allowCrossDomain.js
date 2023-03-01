module.exports = function allowCrossDomains(req, res, next) {
  const origin = req.header(`Origin`);
  if (origin && origin.indexOf(process.env.WEBSITE) > -1) {
    res.header(`Access-Control-Allow-Origin`, origin);
    res.header(`Access-Control-Allow-Credentials`, `true`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,OPTIONS`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type,Authorization`);
  }
  return next();
};
