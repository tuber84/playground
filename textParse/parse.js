// // Асинхронная функция получения данных из .json
// async function getProducts() {
//     const response = await fetch('./js/products.json');
//     const productsArray = await response.json();
//
//     renderProducts(productsArray);
// }
//

// const { parse } = require("path");

function parse() {
  let fs = require("fs");
  let arr = [];
  let parse = [];
  let file = fs.readFileSync("./data/list.txt", "utf8", (error, data) => {
    if (error) throw error;
  });
  const result = file.split("\n");

  result.forEach((item, index) => {
    if (item.length) {
      let str = item.split(",");

      arr[index] = `${str[0]
        .trim()
        .replaceAll(/"|'|''|/g, "")
        .slice(0, -1)
        .replaceAll("", "")},${str[4]
        .slice(0, str[4].length - 2)
        .replace(/"|'|/g, "")}`.split(",");

      parse.push({
        name: `${arr[index][0][0]}${arr[index][0]
          .slice(1)
          .toLowerCase()
          .slice(0, arr[index][0].length - 6)}${arr[index][0].slice(
          arr[index][0].length - 5,
          arr[index][0].length,
        )} `,
        path: arr[index][1],
      });
    }
  });

  data = parse;
}

parse();
console.log(data);
