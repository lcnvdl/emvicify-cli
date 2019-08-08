const AbstractCommand = require("./abstract-command");
const Template =require("../../templates/template");
const path = require("path");
const snakeCase = require("snake-case");
const camelCase = require("camelcase");
const fs = require("fs");
const process = require("process");

class FileCommand extends AbstractCommand {

    constructor() {
        super();
        this._template = null;
    }

    get currentDir() {
        throw new Error("Abstract property");
    }

    get outDirFolderName() {
        throw new Error("Abstract property");
    }

    get templateFolder() {
        throw new Error("Abstract property");
    }

    get templateName() {
        throw new Error("Abstract property");
    }

    get templatePath() {
        const templatePath = path.join(this.currentDir, "../../data/templates", this.templateFolder, this.templateName + ".template");
        return templatePath;
    }

    get template() {
        return this._template || (this._template = new Template({ path: this.templatePath }));
    }

    getOutDir() {
        const dir = path.join(process.cwd(), "app", this.outDirFolderName);
        fs.mkdirSync(dir, { recursive: true });
        return dir;
    }

    toSnakeCase(name) {
        return snakeCase(name).split("_").join("-");
    }

    toCamelCase(name, upperCase) {
        return camelCase(name, { pascalCase: upperCase });
    }
}

module.exports = FileCommand;
