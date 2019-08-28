#!/usr/bin/env node

const colog = require("colog");
const program = require("commander");
const { logo } = require("./src/helpers/ux.helper");
const { version, description } = require("./package.json");
const { here, makeController, makeRouter, makeMiddleware, makeService } = require("./src/commands");

function parseED(v) {
    if (v === "enabled") {
        return true;
    }
    else if (v === "disabled") {
        return false;
    }

    return v;
}

logo();

program
    .version(version)
    .description(description);

program
    .command("here")
    .alias("init")
    .option("--body-parser-json <enabled>", "Enable express json body parser. Options: enabled, disabled, prompt.", parseED, true)
    .option("--body-parser-raw <enabled>", "Enable express raw body parser. Options: enabled, disabled, prompt.", parseED, "prompt")
    .option("--body-parser-urlencoded <enabled>", "Enable express urlencoded body parser. Options: enabled, extended, disabled, prompt.", parseED, "prompt")
    .option("-p, --port <port>", "Application Port", 3500)
    .option("--skip-npm-install")
    .description("Installs emvicify in the current project")
    .action(cmdObj => here(cmdObj));

program
    .command("add:controller <name>")
    .alias("ac")
    .description("Adds a new controller")
    .action(name => makeController(name));

program
    .command("add:router <name>")
    .alias("ar")
    .description("Adds a new router")
    .action(name => makeRouter(name));

program
    .command("add:middleware <name>")
    .alias("am")
    .description("Adds a new middleware")
    .option("-a, --authentication <name>", "Authentication middleware. Options: service, basic, jwt.")
    .option("-w, --with-overrides", "Overrides all parent methods. It works with --authentication option.")
    .action((name, cmdObj) => makeMiddleware(name, cmdObj));

program
    .command("add:service <name>")
    .alias("as")
    .description("Adds a new service")
    .action(name => makeService(name));

if (!process.argv.slice(2).length) {
    program.outputHelp();
    colog.log(" ");
    process.exit();
}

program.parse(process.argv);
