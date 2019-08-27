const FileCommand = require("./base/file-command");
const path = require("path");
const fs = require("fs");
const colog = require("colog");
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

    get specificTemplateName() {
        return "middleware.specific";
    }

    get outDirFolderName() {
        return "middlewares";
    }

    run(name, { authentication = null, withOverrides = false }) {
        if (!authentication) {
            present("Add middleware " + name);
        }
        else {
            present("Add " + authentication + " authentication middleware " + name + (withOverrides ? " with overrides" : ""));
        }

        const middlewareClasses = {
            "basic": "BasicServiceAuthenticationMiddleware",
            "service": "ServiceAuthenticationMiddleware",
            "jwt": "JwtAuthenticationMiddleware"
        };

        if (!middlewareClasses[authentication]) {
            colog.error(`Invalid middleware: ${authentication}. Options: ${Object.keys(middlewareClasses).join(", ")}.`);
            return;
        }

        const outDir = this.getOutDir(name);
        const fileName = this.toSnakeCase(name);
        const className = this.toCamelCase(name, true);

        const finalPath = path.join(outDir, fileName + ".middleware.js");

        let template = authentication ? this.getTemplate(this.getTemplatePathFromName(this.specificTemplateName)) : this.template;

        template.setData("className", className);
        template.setData("baseMiddleware", middlewareClasses[authentication]);
        template.setData("withOverrides", withOverrides);

        fs.writeFileSync(finalPath, template.render(), "utf-8");

        goodbye("Middleware " + className + " created");
    }
}

module.exports = (name, cmdObj) => (new MakeMiddlewareCommand()).run(name, cmdObj);