const jwt = require("jsonwebtoken");
const tokenSecret = require("./jwt_secret");
const secret = tokenSecret.jwt_secret;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ messege: "Authorization rejected." });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ messege: "Please Log-in." });
  }
};
