const { body, validationResult, check } = require("express-validator");
const newUserSchema = require("../models/newUser");
const bcrypt = require("bcrypt");
const validationLoginRules = () => {
  return [
    check("email").trim().isEmail().withMessage("Invalid email address"),
    body("email").custom(async (email, { req }) => {
      let query = newUserSchema.findOne({ email });
      let user = await query.exec();
      if (user) {
        const isMatched = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isMatched) {
          req.user = user;
          return true;
        } else {
          throw new Error("Invalid password");
        }
      } else {
        throw new Error("User doesn't exist");
      }
    }),
  ];
};

const loginValidate = (req, res, next) => {
  const errors = validationResult(req);

  const extractedErrors = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ message: err.msg }));
  req.validationError = extractedErrors;
  return next();
};

module.exports = {
  validationLoginRules,
  loginValidate,
};
