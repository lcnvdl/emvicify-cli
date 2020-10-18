const { expect } = require("chai");
const Pipes = require("../src/templates/pipes");

describe("Pipes", () => {
  describe("import", () => {
    it("should work fine", () => {
      expect(Pipes).to.be.ok;
    });
  });

  describe("capitalize", () => {
    it("should turn the first letter to uppercase", () => {
      const text = "myClass";
      const expected = "MyClass";
      expect(Pipes.capitalize(text)).to.equal(expected);
    });
  });

  describe("decapitalize", () => {
    it("should turn the first letter to lowercase", () => {
      const text = "MyClass";
      const expected = "myClass";
      expect(Pipes.decapitalize(text)).to.equal(expected);
    });
  });
});
