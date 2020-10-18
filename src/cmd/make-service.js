const path = require("path");
const fs = require("fs");
const FileCommand = require("./base/file-command");
const { present, goodbye } = require("../helpers/ux.helper");

class MakeServiceCommand extends FileCommand {
  get currentDir() {
    return __dirname;
  }

  get templateFolder() {
    return "service";
  }

  get templateName() {
    return "service";
  }

  get outDirFolderName() {
    return "services";
  }

  run(name) {
    present(`Add service ${name}`);

    const outDir = this.getOutDir(name);
    const fileName = this.toSnakeCase(name);
    const className = this.toCamelCase(name, true);

    const finalPath = path.join(outDir, `${fileName}.service.js`);

    this.template.setData("className", className);

    fs.writeFileSync(finalPath, this.template.render(), "utf-8");

    goodbye(`Service ${className} created`);
  }
}

module.exports = name => (new MakeServiceCommand()).run(name);
