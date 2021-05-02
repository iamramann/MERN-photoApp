const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
module.exports = function (req, res, next) {
  let token = req.cookies.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Unauthorize, no token provided" });
  }
};
