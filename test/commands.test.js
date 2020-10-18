const { expect } = require("chai");
const commands = require("../src/commands");

describe("Commands", () => {
  describe("import", () => {
    it("should work fine", () => {
      expect(commands).to.be.ok;
    });
  });
});
