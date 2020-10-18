class AbstractCommand {
  run() {
    throw new Error("Abstract method");
  }
}

module.exports = AbstractCommand;
