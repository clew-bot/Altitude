const jwt = require("jsonwebtoken");

exports.authorization = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token === undefined) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = data;
    return next();
  } catch {
    console.log("Token Expired.");
    return res.sendStatus(403);
  }
};