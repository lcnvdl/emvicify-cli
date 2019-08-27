const { install } = require("../helpers/npm.helper");
const { asyncForEach } = require("../helpers/async.helper");
const colog = require("colog");
const inquirer = require('inquirer');
const { present, goodbye } = require("../helpers/ux.helper");
const fs = require("fs");
const path = require("path");
const process = require("process");
const Template = require("../templates/template");

const templatesFolder = path.join(__dirname, "../../data/templates");

async function addIndexJs() {
    colog.log("Creating Index.js...");

    const templatePath = path.join(templatesFolder, "core/index.template");
    const destPath = path.join(process.cwd(), "index.js");

    if (fs.existsSync(destPath)) {
        colog.warning(" * Index.js already exists. File skipped.");
    }
    else {
        fs.copyFileSync(templatePath, destPath);
    }
}

async function addSettingsJson(port) {
    colog.log("Creating Settings.json...");

    const templatePath = path.join(templatesFolder, "core/settings.template");
    const destPath = path.join(process.cwd(), "settings.json");

    if (fs.existsSync(destPath)) {
        colog.warning(" * Settings.json already exists. File skipped.");
    }
    else {
        const template = new Template({ path: templatePath });
        template.setData("port", port);

        colog.log(" * Port: " + port);

        fs.writeFileSync(destPath, template.render(), "utf-8");
    }
}

async function promptExtraPackages() {
    const dependencies = [
        {
            package: "@emvicify/socket.io-driver",
            name: "Socket.io driver"
        }
    ];
    
    await inquirer.prompt([
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

        for (let i = 0; i < tasks.length; i++) {
            colog.log(tasks[i].message);
            await tasks[i].fn();
        }
    });
}

function preValidate() {
    if (!fs.existsSync("./package.json")) {
        throw new Error("Emvicify can only exists in a project with a package.json");
    }
}

module.exports = async (cmdObj) => {
    present("Setup emvicify");

    try {
        preValidate();

        await promptExtraPackages();
        await addIndexJs();
        await addSettingsJson(cmdObj.port || 3500);

        goodbye("Emvicify is here!");
    }
    catch (err) {
        colog.error(err);
    }
};