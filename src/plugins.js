const fs = require("fs");
const path = require("path");
const ConsoleLog = require("./plugins/console-log");
const inquirer = require("inquirer");
const classes = {
    AbstractCommand: require("../src/cmd/base/abstract-command"),
    FileCommand: require("../src/cmd/base/file-command")
};

function readPluginsCommands(program) {
    const pluginsFolder = path.join(process.cwd(), "app", "plugins");

    if (fs.existsSync(pluginsFolder)) {
        let files = fs.readdirSync(pluginsFolder);
        files.filter(file => file.indexOf(".js") !== -1).forEach(file => {
            try {
                let packageName = file.substr(0, file.lastIndexOf("."));
                packageName = packageName.substr(packageName.lastIndexOf("/") + 1);

                let PluginClass = require(path.join(pluginsFolder, packageName)).plugin;
                let instance = new PluginClass();

                const consoleLog = new ConsoleLog();

                if (instance.events && instance.events.commands) {
                    instance.events.commands(program, { consoleLog, inquirer, classes });
                }

                if (instance.events && instance.events.cli) {
                    instance.events.cli(program, { consoleLog, inquirer, classes });
                }
            }
            catch (err) {
                console.error("Error reading plugin " + file + ". " + err);
            }
        });
    }
}

module.exports = { readPluginsCommands };