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
        names: listItem[index][0],
        path: listItem[index][1],
        typerh: listItem[index][2],
      });
      parse.sort((a, b) => a.names.localeCompare(b.name));

      order = parse.map((item, index) => {
        return {
          ...item,
          order: index + 1,
        };
      });
    }
  });
  return order;
  // data = parse;
}

module.exports = parseText;
