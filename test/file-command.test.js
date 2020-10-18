const { expect } = require("chai");
const FileCommand = require("../src/cmd/base/file-command");

describe("FileCommand", () => {
  describe("import", () => {
    it("should work fine", () => {
      expect(FileCommand).to.be.ok;
    });
  });
});
