const test = ({ userName: user, sayHi } = require("./test"));
console.log(test.userName);

const os = require("os");
console.log(os.platform(), os.release());
