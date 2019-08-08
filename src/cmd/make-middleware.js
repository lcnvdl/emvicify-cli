const FileCommand = require("./base/file-command");
const path = require("path");
const fs = require("fs");
const colog = require("colog");

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
        const outDir = this.getOutDir();
        const fileName = this.toSnakeCase(name);
        const className = this.toCamelCase(name, true);
    
        const finalPath = path.join(outDir, fileName + ".middleware.js");
    
        this.template.setData("className", className);
    
        fs.writeFileSync(finalPath, this.template.render(), "utf-8");
    
        colog.success("Middleware " + className + " created");
    }
}

module.exports = name => (new MakeMiddlewareCommand()).run(name);