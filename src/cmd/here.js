const colog = require("colog");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const process = require("process");
const { present, goodbye } = require("../helpers/ux.helper");
const { asyncForEach } = require("../helpers/async.helper");
const { install, init } = require("../helpers/npm.helper");
const Template = require("../templates/template");

const templatesFolder = path.join(__dirname, "../../data/templates");

let expressSettings = {};

function serializeDict(dict) {
  const str = [];
  Object.keys(dict).forEach(key => str.push(`    ${key}: ${JSON.stringify(dict[key])}`));
  return `{\n${str.join(",\n")}\n}`;
}

function addIndexJs() {
  colog.log("Creating Index.js...");

  const templatePath = path.join(templatesFolder, "core/index.template");
  let destPath = path.join(process.cwd(), "index.js");

  if (fs.existsSync(destPath)) {
    colog.warning(" * Index.js already exists. Please check the file index-alt.js.");
    destPath = path.join(process.cwd(), "index-alt.js");
  }

  const template = new Template({ path: templatePath });
  template.setData("expressSettings", serializeDict(expressSettings));
  fs.writeFileSync(destPath, template.render());
}

function addSettingsJson(port) {
  colog.log("Creating Settings.json...");

  const templatePath = path.join(templatesFolder, "core/settings.template");
  const destPath = path.join(process.cwd(), "settings.json");

  if (fs.existsSync(destPath)) {
    colog.warning(" * Settings.json already exists. File skipped.");
  }
  else {
    const template = new Template({ path: templatePath });
    template.setData("port", port);

    colog.log(` * Port: ${port}`);

    fs.writeFileSync(destPath, template.render(), "utf-8");
  }
}

async function promptExpressSettings({ bodyParserJson = true, bodyParserUrlencoded = "prompt", bodyParserRaw = "prompt" }) {
  if ([bodyParserJson, bodyParserUrlencoded, bodyParserRaw].indexOf("prompt") === -1) {
    expressSettings = { bodyParserJson, bodyParserUrlencoded, bodyParserRaw };
    return;
  }

  const choises = [];

  choises.push({
    value: "bodyParserJson",
    name: "JSON Body Parser",
    checked: bodyParserJson === true,
  });

  choises.push({
    value: "bodyParserUrlencoded",
    name: "Urlencoded Body Parser",
    checked: bodyParserUrlencoded === true,
  });

  choises.push({
    value: "bodyParserRaw",
    name: "Raw Body Parser",
    checked: bodyParserRaw === true,
  });

  await inquirer.prompt([
    {
      type: "checkbox",
      name: "result",
      message: "Express.js settings",
      choices: choises,
    },
  ]).then(answers => {
    choises.forEach(choise => {
      expressSettings[choise.value] = answers.result.indexOf(choise.value) !== -1;
    });
  });
}

async function promptExtraPackages() {
  const dependencies = [
    {
      package: "@emvicify/socket.io-driver",
      name: "Socket.io driver",
    },
  ];

  await inquirer.prompt([
    {
      type: "checkbox",
      name: "dependencies",
      message: "Select the extra packages to install",
      choices: dependencies.map(m => m.name),
    },
  ]).then(async answers => {
    const tasks = [
      {
        message: "Installing Emvicify...",
        fn: async () => {
          const { stderr } = await install("emvicify", true);
          processNpmStderr(stderr);
        },
      },
    ];

    if (answers.dependencies) {
      tasks.push({
        message: "Installing Dependencies...",
        fn: async () => await asyncForEach(answers.dependencies, async name => {
          const packageName = dependencies.find(m => m.name === name).package;

          colog.log(colog.colorYellow(` * Installing ${packageName}...`));

          const { stderr } = await install(packageName, true);
          processNpmStderr(stderr);
        }),
      });
    }

    for (let i = 0; i < tasks.length; i++) {
      colog.log(tasks[i].message);
      await tasks[i].fn();
    }
  });
}

function processNpmStderr(stderr) {
  if (stderr && stderr !== "") {
    throw stderr;
  }
}

async function ensurePackageJson(cmdObj) {
  if (!fs.existsSync("./package.json")) {
    if (cmdObj.force) {
      const { stderr } = await init();
      processNpmStderr(stderr);
    }
    else {
      throw new Error("Emvicify can only exists in a project with a package.json");
    }
  }
}

module.exports = async cmdObj => {
  present("Setup emvicify");

  try {
    await ensurePackageJson(cmdObj);

    await promptExpressSettings(cmdObj);

    if (!cmdObj.skipNpmInstall) {
      await promptExtraPackages();
    }
    else {
      colog.warning("* Npm install skipped");
    }

    addIndexJs();
    addSettingsJson(cmdObj.port || 3500);

    goodbye("Emvicify is here!");
  }
  catch (err) {
    colog.error(err);
  }
};
