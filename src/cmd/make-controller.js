const path = require("path");
const fs = require("fs");
const FileCommand = require("./base/file-command");
const { present, goodbye } = require("../helpers/ux.helper");

class MakeControllerCommand extends FileCommand {
  get currentDir() {
    return __dirname;
  }

  get templateFolder() {
    return "controller";
  }

  get templateName() {
    return "controller";
  }

  get outDirFolderName() {
    return "controllers";
  }

  run(name) {
    present(`Add controller ${name}`);

    const outDir = this.getOutDir(name);
    const fileName = this.toSnakeCase(name);
    const className = this.toCamelCase(name, true);

    const finalPath = path.join(outDir, `${fileName}.controller.js`);

    this.template.setData("className", className);

    fs.writeFileSync(finalPath, this.template.render(), "utf-8");

    goodbye(`Controller ${className} created`);
  }
}

module.exports = name => (new MakeControllerCommand()).run(name);
