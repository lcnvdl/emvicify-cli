const Template = require("../src/templates/template");
const { expect } = require("chai");

describe("Template", () => {
    describe("constructor", () => {
        it("should work fine", () => {
            const instance = new Template({});
            expect(instance).to.be.ok;
        });
    });
});