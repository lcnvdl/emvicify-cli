const colog = require("colog");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");
const fs = require("fs");
const Template = require("../templates/template");
const templatesFolder = path.join(__dirname, "../../data/templates");

async function install(package, rq, { saveDev = false }) {

    colog.answer("Installing package " + package + "...");
    
    let save = saveDev ? "save-dev" : "save";
    let command = `npm i --${save} ${package}@latest`;

    colog.info(command);

    const { stdout, stderr } = await exec(command, { cwd: process.cwd() });

    if (stdout && stdout !== "") {
        colog.log(stdout);
    }

    if (stderr && stderr !== "") {
        colog.error(stderr);
    }

    installMfyPlugin(package, rq);
}

function installMfyPlugin(package, rq) {
    const packageJson = path.join(process.cwd(), "node_modules", package, "package.json");

    if (fs.existsSync(packageJson)) {
        const json = JSON.parse(fs.readFileSync(packageJson, "utf-8"));

        if (json.emvicify === "plugin" || json.mfy === "plugin") {
            colog.answer("Installing plugin " + json.name + "...");

            const pluginsDir = path.join(process.cwd(), "app", "plugins");
            fs.mkdirSync(pluginsDir, { recursive: true });

            const PluginClass = rq(json.name).plugin;
            const instance = new PluginClass();

            if (instance.events && instance.events.install) {
                colog.info("Running installation routines...");
                instance.events.install({ baseDirectory: process.cwd() });
            }

            colog.info("Adding plugin module...");
            const templatePath = path.join(templatesFolder, "plugins/plugin.template");
            const destPath = path.join(pluginsDir, instance.pluginId + ".js");

            const template = new Template({ path: templatePath });
            template.setData("packageName", json.name);
            fs.writeFileSync(destPath, template.render());

            colog.success(instance.pluginName + " installed successfully!");
        }
    }
}

module.exports = async (options, package, otherPackages, rq) => {
    options = options || {};

    await install(package, rq, options);

    if (otherPackages) {
        for (let i = 0; i < otherPackages.length; i++) {
            await install(otherPackages[i], rq, options);
        }
    }
};
