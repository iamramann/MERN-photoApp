const app = require("./app");
const { PORT } = require("./config/keys");
const connect = require("./config/connect");

connect();

app.listen(8000, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`>> server is running at ${PORT}`);
});
