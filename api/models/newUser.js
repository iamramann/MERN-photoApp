const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const newUserSchema = new mongoose.Schema({
  name: {
    type: {
      firstName: { type: String, lowercase: true, trim: true },
      lastName: { type: String, lowercase: true, trim: true },
    },
    required: true,
    trim: true,
  },
  joined: { type: Date, default: Date.now },
  password: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  uploads: {
    type: [
      {
        imageUrl: { type: String },
        createdAt: { type: Date, default: Date.now },
        likes: { type: Number, default: 0 },
        comments: { type: [] },
        likedByMe: { type: Boolean, default: false },
      },
    ],
  },
  likedImages: {
    type: [
      {
        image: { type: {} },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  avatar: {
    type: String,
    createdAt: { type: Date, default: Date.now },
    default:
      "https://res.cloudinary.com/oncloud9/image/upload/v1619590669/user/unnamed_lrwudy.png",
  },
});

newUserSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);

  next();
});

mongoose.model("NUser", newUserSchema);
module.exports = mongoose.model("NUser");
