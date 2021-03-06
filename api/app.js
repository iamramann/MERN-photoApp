var express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var cors = require("cors");
const index = require("./routes/index");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", index);
module.exports = app;
