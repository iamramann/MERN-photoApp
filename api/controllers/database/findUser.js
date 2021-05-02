const userSchema = require("../../models/user");
module.exports = function (filter) {
  return new Promise((resolve, reject) => {
    userSchema.findOne(filter, (err, user) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
};
