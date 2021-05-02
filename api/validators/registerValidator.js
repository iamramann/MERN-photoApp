const { body, validationResult, check } = require("express-validator");
const newUserSchema = require("../models/newUser");
const validationRules = () => {
  return [
    check("firstName")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("FirstName should be Min 3 characters long and Max 30"),
    check("lastName")
      .trim()
      .isAlpha()
      .withMessage("Last Name must contain Alphabates")
      .isLength({ min: 0, max: 30 })
      .withMessage("LastName should be  Max 30 characters long"),

    check("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password at least 8 characters long"),

    body("email")
      .trim()
      .custom(async (email) => {
        let query = newUserSchema.findOne({ email });
        let user = await query.exec();
        if (user) {
          throw new Error("Email already exists");
        }
      })
      .isEmail()
      .withMessage("Invalid email address"),

    body("confirmPassword")
      .custom((value, { req }) => {
        if (req.body.password === value) {
          return true;
        }
        return false;
      })
      .withMessage("Password doesn't match"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ message: err.msg }));
  req.validationError = extractedErrors;
  return next();
};

module.exports = {
  validationRules,
  validate,
};
