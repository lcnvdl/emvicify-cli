#!/usr/bin/env node

const colog = require("colog");
const program = require("commander");
const { logo } = require("./src/helpers/ux.helper");
const { version, description } = require("./package.json");
const { here, makeController, makeRouter, makeMiddleware, makeService } = require("./src/commands");

logo();

program
    .version(version)
    .description(description);

program
    .command("here")
    .description("Installs emvicify in the current project")
    .action(name => here(name));

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
    .command("add:middelware <name>")
    .alias("am")
    .description("Adds a new middleware")
    .action(name => makeMiddleware(name));


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

colog.log(" ");