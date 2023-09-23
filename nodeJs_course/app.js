const fs = require("fs");

fs.readFile("./README.md", "utf8", (error, data2) => {
  //чтение содержимого файла
  if (!fs.existsSync("./files/")) {
    fs.mkdirSync("./files", () => {}); // создание папки
    fs.writeFileSync("./files/test.txt", `${data2} Some new text`, (error) => {
      // запись нового содержимого в новый файл
      error ? console.log(error) : console.log("no error");
    });
  }
  console.log(error);
});

// таймер удаляющий файл
setTimeout(() => {
  if (fs.existsSync("./files/test.txt")) {
    fs.unlink("./files/test.txt", () => {});
  }
}, 8000);

// таймер удаляющий папку
setTimeout(() => {
  if (fs.existsSync("./files/")) {
    fs.rmdir("./files", () => {});
  }
}, 12000);
