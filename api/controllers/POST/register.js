const userSchema = require("../../models/user");
const jwt = require("jsonwebtoken");
module.exports = async function (req, res) {
  if (req.validationError.length) {
    res.status(406).json(req.validationError);
    return;
  }

  try {
    // eslint-disable-next-line no-unused-vars
    let response = await userSchema.create(req.body);
    let token = genToken(req.body.email);
    res.status(200).json({ auth: true, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function genToken(email) {
  return jwt.sign({ email }, "key-secret", { expiresIn: "18000000s" });
}
