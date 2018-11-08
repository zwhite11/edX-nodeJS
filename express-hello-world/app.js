const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hellooossdsdfdso world");
});

app.listen(3000);
