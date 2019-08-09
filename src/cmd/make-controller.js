const FileCommand = require("./base/file-command");
const path = require("path");
const fs = require("fs");
const colog = require("colog");

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
        const outDir = this.getOutDir(name);
        const fileName = this.toSnakeCase(name);
        const className = this.toCamelCase(name, true);
    
        const finalPath = path.join(outDir, fileName + ".controller.js");
    
        this.template.setData("className", className);
    
        fs.writeFileSync(finalPath, this.template.render(), "utf-8");
    
        colog.success("Controller " + className + " created");
    }
}

module.exports = name => (new MakeControllerCommand()).run(name);