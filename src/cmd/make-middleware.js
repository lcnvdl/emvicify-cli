const FileCommand = require("./base/file-command");
const path = require("path");
const fs = require("fs");
const { present, goodbye } = require("../helpers/ux.helper");

class MakeMiddlewareCommand extends FileCommand {

    get currentDir() {
        return __dirname;
    }

    get templateFolder() {
        return "middleware";
    }

    get templateName() {
        return "middleware";
    }

    get outDirFolderName() {
        return "middlewares";
    }

    run(name) {
        present("Add middleware " + name);

        const outDir = this.getOutDir(name);
        const fileName = this.toSnakeCase(name);
        const className = this.toCamelCase(name, true);
    
        const finalPath = path.join(outDir, fileName + ".middleware.js");
    
        this.template.setData("className", className);
    
        fs.writeFileSync(finalPath, this.template.render(), "utf-8");
    
        goodbye("Middleware " + className + " created");
    }
}

module.exports = name => (new MakeMiddlewareCommand()).run(name);