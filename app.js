const express = require("express");
const fs = require("fs-extra");
const { resolve } = require("path");

const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("/", (req, res) => {
    res.sendfile(path, resolve(path, "build", "index.html"));
  });
  app.post("/getType", async (req, res) => {
    let result = {};

    let x = await fs.readdir("alpaca");

    for (let i = 0; i < x.length; i++) {
      let value = await fs.readdir("alpaca/" + x[i]);
      result = { ...result, [x[i]]: value };
    }

    res.send(result);
  });
} else {
  app.use(express.static("build"));

  app.get("/", (req, res) => {
    res.sendfile(path, resolve(path, "build", "index.html"));
  });

  app.post("/getType", async (req, res) => {
    let result = {};

    let x = await fs.readdir("build/alpaca");

    for (let i = 0; i < x.length; i++) {
      let value = await fs.readdir("build/alpaca/" + x[i]);
      result = { ...result, [x[i]]: value };
    }

    res.send(result);
  });
}

app.listen(port, () => {
  console.log("Server Started !!", port);
});
