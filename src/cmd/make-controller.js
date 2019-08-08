const colog = require("colog");
const process = require("process");
const path = require("path");
const fs = require("fs");
const snakeCase = require('snake-case');
const camelCase = require('camelcase');
const Template = require("../templates/template");
const templatePath = path.join(__dirname, "../../data/templates/controller/controller.template");

let lazy;

module.exports = (name) => {

    const getTemplate = () => lazy || (lazy = new Template({ path: templatePath }));
    const tpl = getTemplate();
    const fileName = snakeCase(name).split("_").join("-");
    const className = camelCase(name, { pascalCase: true });

    const dir = path.join(process.cwd(), "app", "controllers");
    fs.mkdirSync(dir, { recursive: true });

    const finalPath = path.join(dir, fileName + ".controller.js");

    tpl.setData("className", className);

    fs.writeFileSync(finalPath, tpl.render(), "utf-8");

    colog.success("Controller " + className + " created");
};