const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");
module.exports = async function (req, res) {
  if (req.validationError.length) {
    res.status(401).json(req.validationError[0]);
    return;
  }
  try {
    const token = generateAccessToken(req.body.email);
    res.cookie("token", token, { maxAge: 99999999, httpOnly: true });
    res.status(200).json({ token: token, user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateAccessToken(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });
}
