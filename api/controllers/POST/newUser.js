/* eslint-disable no-unused-vars */
const createNewUser = require("../database/createNewUser");
module.exports = async function (req, res) {
  if (req.validationError.length > 0) {
    res.status(422).json({ message: req.validationError[0].message });
    return;
  }
  try {
    let details = createUserDetailsObject(req.body);
    let user = await createNewUser(details);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(422).json({ message: "Failed to create user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  helper function*/
function createUserDetailsObject(body) {
  const { firstName, lastName, email, password } = body;
  const obj = {};
  obj.name = {
    firstName: firstName.trim().toLowerCase(),
    lastName: lastName.trim().toLowerCase(),
  };
  obj.email = email.trim();
  obj.password = password.trim();
  return obj;
}
