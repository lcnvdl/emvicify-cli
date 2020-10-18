const path = require("path");
const snakeCase = require("snake-case");
const camelCase = require("camelcase");
const fs = require("fs");
const process = require("process");
const Template = require("../../templates/template");
const AbstractCommand = require("./abstract-command");

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
    return this.getTemplatePathFromName(this.templateName);
  }

  get template() {
    // eslint-disable-next-line no-return-assign
    return this._template || (this._template = this.getTemplate(this.templatePath));
  }

  getTemplate(templatePath) {
    const isJs = (templatePath.indexOf(".js") !== -1);
    return new Template({ path: templatePath, isJs });
  }

  getTemplatePathFromName(name) {
    const templatePath = path.join(this.currentDir, "../../data/templates", this.templateFolder, `${name}.template`);

    if (!fs.existsSync(templatePath)) {
      const newTemplatePath = `${templatePath}.js`;

      if (!fs.existsSync(newTemplatePath)) {
        throw new Error(`Template file not found: ${this.templatePath} / .js`);
      }

      return newTemplatePath;
    }

    return templatePath;
  }

  getOutDir(name) {
    let pathInName;

    if (name.indexOf("/") !== -1) {
      const folders = name.split("/");
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

  return name;
}

module.exports = FileCommand;
