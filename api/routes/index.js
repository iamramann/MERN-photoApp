/* eslint-disable no-unused-vars */
var express = require("express");
var router = express.Router();
const userSchema = require("../bin/user");
const newUserSchema = require("../models/newUser");
const newUser = require("../controllers/POST/newUser");
const newImage = require("../controllers/POST/newImage");
const loginUser = require("../controllers/POST/login");
const checkToken = require("../middlewares/checkToken");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const {
  validate,
  validationRules,
} = require("../validators/registerValidator");
const {
  loginValidate,
  validationLoginRules,
} = require("../validators/loginValidator");
const avatar = require("../controllers/POST/avatar");

const checkTokenNew = (req, res, next) => {
  let token = req.headers.jwtheader;
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

// ROUTES
router.post("/login", validationLoginRules(), loginValidate, loginUser);
router.post("/register", validationRules(), validate, newUser);
router.post("/addNewImage", checkToken, newImage);
router.post("/updateAvatar", checkTokenNew, avatar);

router.post("/inDesc", async (req, res) => {
  try {
    let query = newUserSchema.findOne(
      { email: req.body.email },
      { uploads: 1 }
    );
    let response = await query.exec();
    res.send(response.uploads);
  } catch (error) {}
});

router.post("/deleteCurrentPhoto", checkTokenNew, async (req, res) => {
  let { imageId, id } = req.body;

  // let x = newUserSchema.findOne({ email: req.user.email });
  // let user = await x.exec();

  try {
    let query = newUserSchema.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          uploads: { _id: imageId },
        },
      },
      { safe: true, multi: true }
    );
    let response = await query.exec();
    console.log(">>> photo deleted");
    res.status(200).json({ message: "photo deleted" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/getAllImages", async (req, res) => {
  try {
    let query = newUserSchema.find(
      { $where: "this.uploads.length > 0" },
      { uploads: 1 }
    );
    let result = await query.exec();
    let resultantArr = [];
    result.forEach((item, index) => {
      resultantArr.push(...item.uploads);
    });
    res.status(200).json(resultantArr);
  } catch (error) {
    console.log(error);
  }
});

router.get("/userProfile", checkTokenNew, checkToken, async (req, res) => {
  let query = newUserSchema.findOne({ email: req.user.email });
  let user = await query.exec();
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Invalid token" });
  }
});
router.get("/userProfilex", async (req, res) => {
  let query = newUserSchema.findOne({ email: "Hortense_Bailey@hotmail.com" });
  let user = await query.exec();
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Invalid token" });
  }
});

router.post("/deleteAccountPermanently", async (req, res) => {
  try {
    let query = newUserSchema.findByIdAndDelete(req.body.id);
    let response = await query.exec();
    res.status(200).json({ message: "user profile deleted" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

/* Protected routes */
router.get("/profile", checkToken, (req, res) => {
  res.send("1");
});

router.get("/verifyUserLogin", checkToken, async (req, res) => {
  //token gives us user object where we can get user email
  let email = req.user.email;
  try {
    let query = newUserSchema.findOne({ email }, { _id: 0 });
    let user = await query.exec();
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/getUserImages", checkToken, (req, res) => {
  try {
    userSchema.findOne(
      { email: "sharma66497@gmail.com" },
      { uploads: 1, _id: 0 },
      (err, data) => {
        if (err) {
          throw err;
        } else {
          if (data) {
            res.status(200).send(data.uploads);
          } else {
            res.status(404).send({ msg: "User not found" });
          }
        }
      }
    );
  } catch (error) {
    res.send({ msg: "Something went wrong" });
  }
});

// 608e2301424c523a108f38a0
// https://res.cloudinary.com/oncloud9/image/upload/v1619927809/photoApp/iii1zp7l7nlwyfycvh22.jpg

router.post("/getSingleImage", async (req, res) => {
  try {
    let query = newUserSchema.findOne(
      { email: req.body.email },
      {
        _id: 0,
        uploads: {
          $elemMatch: {
            imageUrl:
              "https://res.cloudinary.com/oncloud9/image/upload/v1619927809/photoApp/iii1zp7l7nlwyfycvh22.jpg",
          },
        },
      }
    );
    let response = await query.exec();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
