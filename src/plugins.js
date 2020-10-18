/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const ConsoleLog = require("./plugins/console-log");
const { present, goodbye } = require("./helpers/ux.helper");
const AbstractCommand = require("./cmd/base/abstract-command");
const FileCommand = require("./cmd/base/file-command");

const classes = {
  AbstractCommand,
  FileCommand,
};

const methods = {
  present,
  goodbye,
};

function readPluginsCommands(program) {
  const pluginsFolder = path.join(process.cwd(), "app", "plugins");

  if (fs.existsSync(pluginsFolder)) {
    const files = fs.readdirSync(pluginsFolder);
    files.filter(file => file.indexOf(".js") !== -1).forEach(file => {
      try {
        let packageName = file.substr(0, file.lastIndexOf("."));
        packageName = packageName.substr(packageName.lastIndexOf("/") + 1);

        let PluginClass = require(path.join(pluginsFolder, packageName));

        if (PluginClass.plugin) {
          PluginClass = PluginClass.plugin;
        }

        const instance = new PluginClass();

        const consoleLog = new ConsoleLog();

        if (instance.events && instance.events.commands) {
          instance.events.commands(program, { consoleLog, inquirer, classes, methods });
        }

        if (instance.events && instance.events.cli) {
          instance.events.cli(program, { consoleLog, inquirer, classes, methods });
        }
      }
      catch (err) {
        console.error(`Error reading plugin ${file}. ${err}`);
      }
    });
  }
}

module.exports = { readPluginsCommands };
