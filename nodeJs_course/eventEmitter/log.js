const EventEmitter = require("events");
const utils = require("util");

class Logger {
  log = (msg) => {
    console.log(msg);
    this.emit("some_event", { id: 1, text: "Event test" });
  };
}

utils.inherits(Logger, EventEmitter);

module.exports = Logger;
