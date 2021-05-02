const newUserSchema = require("../../models/newUser");
module.exports = function (user) {
  return new Promise((resolve, reject) => {
    newUserSchema.create(user, (err, details) => {
      if (err) reject(err);
      else resolve(details);
    });
  });
};
