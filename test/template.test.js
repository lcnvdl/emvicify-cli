const Template = require("../src/templates/template");
const { expect } = require("chai");

describe("Template", () => {
    describe("constructor", () => {
        it("should work fine", () => {
            const instance = new Template({});
            expect(instance).to.be.ok;
        });
    });

    describe("render - js", () => {
        /** @type {Template} */
        let tpl;

        beforeEach(() => {
            tpl = new Template({});
        });

        it("should replace the words", () => {
            const expected  = "const MyClassSchema = new Schema({});";
            tpl.content = "const __className__Schema = new Schema({});";
            tpl.setData("className", "MyClass");
            const result = tpl.render(true);

            expect(result).to.equals(expected);
        });
    });
});