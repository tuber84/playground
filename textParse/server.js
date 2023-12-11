const express = require("express");
const path = require("path");
const parseText = require("./data/dataParse.js");
const PORT = 3000;
const app = express();

app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/img"));
// app.use(express.static("public"));

let data = parseText();
let dataA = [];

let result = data.reduce((res, item) => {
  let firstLetter = item.names.charAt(0);
  if (!res[firstLetter]) {
    res[firstLetter] = [];
  }
  res[firstLetter].push(item);
  return res;
}, {});

console.log(result.N);

const createPath = (page) => path.resolve(__dirname, "", `${page}.ejs`);

app.get("/", (req, res) => {
  res.render(createPath("index"), { result });
});

app.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
