const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/getType", async (req, res) => {
  let result = {};

  let x = await fs.readdir("public/alpaca");

  for (let i = 0; i < x.length; i++) {
    let value = await fs.readdir("public/alpaca/" + x[i]);
    result = { ...result, [x[i]]: value };
  }

  res.send(result);
});

app.listen(5000, () => {
  console.log("Server Started !!");
});
