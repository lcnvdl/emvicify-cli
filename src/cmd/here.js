const { install } = require("../helpers/npm.helper");
const { asyncForEach } = require("../helpers/async.helper");
const colog = require("colog");
const inquirer = require('inquirer');
const { present, goodbye } = require("../helpers/ux.helper");

async function promptExtraPackages() {
    const dependencies = [
        {
            package: "@emvicify/socket.io-driver",
            name: "Socket.io driver"
        }
    ];

    inquirer.prompt([
        {
            type: "checkbox",
            name: "dependencies",
            message: "Select the extra packages to install",
            choices: dependencies.map(m => m.name)
        }
    ]).then(async (answers) => {

        let tasks = [
            {
                message: "Installing Emvicify...",
                fn: async () => {
                    let { stderr } = await install("emvicify", true);
                    if (stderr && stderr !== "") {
                        throw stderr;
                    }
                }
            }
        ];

        if (answers.dependencies) {
            tasks.push({
                message: "Installing Dependencies...",
                fn: async () => await asyncForEach(answers.dependencies, async (name) => {
                    let package = dependencies.find(m => m.name === name).package;

                    colog.log(colog.colorYellow(" * Installing " + package + "..."));

                    let { stderr } = await install(package, true);
                    if (stderr) {
                        throw stderr;
                    }
                })
            });
        }

        try {
            for (let i = 0; i < tasks.length; i++) {
                colog.log(tasks[i].message);
                await tasks[i].fn();
            }
            colog.success("Emvicify is here!");
        }
        catch (err) {
            colog.error(err);
        }
    });

}

module.exports = async () => {
    present("Setup emvicify");

    await promptExtraPackages();
};