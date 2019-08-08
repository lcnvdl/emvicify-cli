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

    getOutDir(name) {

        let pathInName;

        if (name.indexOf("/") !== -1) {
            let folders = name.split("/");
            folders.pop();
            pathInName = path.join(...folders);
        }
        else {
            pathInName = ".";
        }

        const dir = path.join(process.cwd(), "app", this.outDirFolderName, pathInName);
        fs.mkdirSync(dir, { recursive: true });
        return dir;
    }

    toSnakeCase(name) {
        return snakeCase(extractName(name)).split("_").join("-");
    }

    toCamelCase(name, upperCase) {
        return camelCase(extractName(name), { pascalCase: upperCase });
    }
}

function extractName(name) {
    if (name.indexOf("/") !== -1) {
        return name.substr(name.lastIndexOf("/") + 1);
    }
    else {
        return name;
    }
}

module.exports = FileCommand;
