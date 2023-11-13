const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/img"));
// app.use(express.static("public"));

function parseText() {
  let fs = require("fs");
  let listItem = [];
  let str;
  let parse = [];
  let surnames = [];
  let initials = [];
  let type = [];
  let path = [];
  let order;
  let file = fs.readFileSync("./data/list.txt", "utf8", (error, data) => {});
  const result = file.split("\n");

  result.forEach((item, index) => {
    if (item.length) {
      str = item
        .trim()
        .replace(/"|'|" "|/g, "")
        .replace(/\^/g, " ")
        .split(",");

      surnames[index] =
        str[0].charAt(0) + str[0].split(" ")[0].trim().slice(1).toLowerCase();
      initials[index] = str[0].split(" ", 3).slice(1).join("").trim();

      path[index] = `//nas3/rentgen_hir/raid/${str[4]}`;
      type[index] = str[3].toLowerCase();

      listItem[index] =
        `${surnames[index]} ${initials[index]},${path[index]},${type[index]}`.split(
          ",",
        );

      parse.push({
        name: listItem[index][0],
        path: listItem[index][1],
        typerh: listItem[index][2],
      });
      parse.sort((a, b) => a.name.localeCompare(b.name));

      order = parse.map((item, index) => {
        return {
          ...item,
          order: index + 1,
        };
      });
    }
  });

  data = order;
}
parseText();

// console.log(data);

const createPath = (page) => path.resolve(__dirname, "", `${page}.ejs`);

app.get("/", (req, res) => {
  res.render(createPath("index"), { data });
});

app.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
