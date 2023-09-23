const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./docs/text.html");
const writeStream = fs.createWriteStream("./docs/write_stream.txt");
const compressStream = zlib.createGzip();

// readStream.on("data", (chunk) => {
//   writeStream.write("\n-!!!--CHUNK----\n");
//   writeStream.write(chunk);
//   writeStream.write("\n---CHUNK----\n");
// });
const handleError = () => {
  console.log("error");
  readStream.destroy();
  writeStream.end("Finished with error...");
};

readStream
  .on("error", handleError)
  .pipe(compressStream)
  .pipe(writeStream)
  .on("error", handleError);
