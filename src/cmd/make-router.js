const FileCommand = require("./base/file-command");
const path = require("path");
const fs = require("fs");
const { present, goodbye } = require("../helpers/ux.helper");

class MakeRouterCommand extends FileCommand {

    get currentDir() {
        return __dirname;
    }

    get templateFolder() {
        return "router";
    }

    get templateName() {
        return "router";
    }

    get outDirFolderName() {
        return "routers";
    }

    run(name) {
        present("Add router " + name);

        const outDir = this.getOutDir(name);
        const fileName = this.toSnakeCase(name);
        const className = this.toCamelCase(name, true);
    
        const finalPath = path.join(outDir, fileName + ".router.js");
    
        this.template.setData("className", className);
    
        fs.writeFileSync(finalPath, this.template.render(), "utf-8");
    
        goodbye("Router " + className + " created");
    }
}

module.exports = name => (new MakeRouterCommand()).run(name);