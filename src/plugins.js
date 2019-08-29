const fs = require("fs");
const path = require("path");

function readPluginsCommands(program, rq) {
    const pluginsFolder = path.join(process.cwd(), "app", "plugins");

    if (fs.existsSync(pluginsFolder)) {
        let files = fs.readdirSync(pluginsFolder);
        files.filter(file => file.indexOf(".js") !== -1).forEach(file => {
            let packageName = file.substr(0, file.lastIndexOf("."));
            packageName = packageName.substr(packageName.lastIndexOf("/") + 1);

            let PluginClass = rq(packageName).plugin;
            let instance = new PluginClass();

            if (instance.events && instance.events.commands) {
                instance.events.commands(program);
            }

            if (instance.events && instance.events.cli) {
                instance.events.cli(program);
            }
        });
    }
}

module.exports = { readPluginsCommands };