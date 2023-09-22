// setTimeout(() => {
//   console.log("Hellow");
// }, 2000);

console.log(__dirname);
console.log(__filename);
// console.log(process.env);
console.log(process.argv);
console.log(`Hellow, ${process.argv[2]}`);

const url = new URL(
  "https://www.zpool.ca/wallet/ltc1quwmdfgh6xjn4wyqdyu5dg08pf37g2rstawyy50",
);
console.log(url.hostname);
console.log(url.href);
console.log(url.pathname);
console.log(url);
