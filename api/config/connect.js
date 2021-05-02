const { MONGOURL } = require("./keys");
const mongoose = require("mongoose");
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
module.exports = function () {
  mongoose
    .connect(MONGOURL, connectionParams)
    .then(() => {
      console.log(">>> Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });

  mongoose.connection.on("connected", () => {
    console.log(">>> Mongoose default connection is open");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection is disconnected ");
  });
  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};
