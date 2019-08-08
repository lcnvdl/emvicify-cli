const FileCommand = require("../src/cmd/base/file-command");
const { expect } = require("chai");

describe("FileCommand", () => {
    describe("import", () => {
        it("should work fine", () => {
            expect(FileCommand).to.be.ok;
        });
    });
});