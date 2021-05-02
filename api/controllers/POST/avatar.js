/* eslint-disable no-unused-vars */
const upload = require("../../multer");
require("../../config/cloudinary");
const uploader = upload.single("image");
const cloudinary = require("cloudinary");
const newUserSchema = require("../../models/newUser");
module.exports = function (req, res) {
  uploader(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ mesaage: "Failed to upload file" });
    } else {
      try {
        const cloduImage = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "photoApp",
        });

        let query = newUserSchema.findOneAndUpdate(
          { email: req.user.email },
          { avatar: cloduImage.secure_url }
        );

        let response = await query.exec();

        res.status(200).send({ url: cloduImage.secure_url });
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  });
};
