const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log("server request");
  console.log(req.url, req.method);

  res.setHeader("Content-Type", "application/json");
  // res.setHeader("Content-Type", "text/html");
  // res.write("<head><link rel='stylesheet' href='#'></head>");
  // res.write("<h1>Hellow world<h1/><p>Some html element <p/>");
  // res.write("<h2>Some different html element <h2/>");

  const data = JSON.stringify([
    { name: "Yuryi", age: 39 },
    { name: "Anton", age: 39 },
  ]);
  res.end(data);
});

server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
