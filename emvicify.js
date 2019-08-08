#!/usr/bin/env node

const program = require('commander');
const { version, description } = require("./package.json");
const { install, makeController } = require("./src/commands");

program
    .version(version)
    .description(description);

program
    .command("install <package> [otherPackages...]")
    .alias("i")
    .description("Installs a package")
    .action((package, otherPackages) => install(package, otherPackages));

program
    .command("make:controller <name>")
    .alias("mc")
    .description("Adds a controller")
    .action((name) => makeController(name));

program.parse(process.argv);