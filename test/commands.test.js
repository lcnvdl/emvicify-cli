const commands = require("../src/commands");
const { expect } = require("chai");

describe("Commands", () => {
    describe("import", () => {
        it("should work fine", () => {
            expect(commands).to.be.ok;
        });
    });
});