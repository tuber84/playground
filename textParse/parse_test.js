function parseInfo() {
  let fs = require("fs");
  let patientsInfo = [];
  let str;
  let patientsInfoArr = [];
  let surnames = [];
  let initials = [];
  let path = [];
  let file = fs.readFileSync("./data/list_short.txt", "utf8", (error, data) => {
    if (error) throw error;
  });
  const result = file.split("\n");

  result.forEach((item, index) => {
    if (item.length) {
      str = item
        .trim()
        .replace(/"|'|" "|/g, "")
        .replace(/\^/g, " ")
        .split(",");

      surnames[index] = str[0].split(" ")[0].trim();
      initials[index] = str[0].split(" ", 3).slice(1).join("").trim();

      path[index] = `//nas3/rentgen_hir/raid/${str[4]}`;
      patientsInfo[index] =
        `${surnames[index]} ${initials[index]},${path[index]}`.split(",");

      patientsInfoArr.push({
        name: patientsInfo[index][0],
        path: patientsInfo[index][1],
      });
    }
  });
  patientsInfoArr.sort((a, b) => a.name.localeCompare(b.name));

  data = patientsInfoArr.map((item, index) => {
    return {
      ...item,
      order: index + 1,
    };
  });
}
parseInfo();

console.log(data);
