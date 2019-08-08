#!/usr/bin/env node

const program = require("commander");
const { version, description } = require("./package.json");
const { makeController, makeRouter, makeMiddleware, makeService } = require("./src/commands");

program
    .version(version)
    .description(description);

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
    process.exit();
}

program.parse(process.argv);