#!/usr/bin/env node

const program = require("commander");
const { version, description } = require("./package.json");
const { makeController } = require("./src/commands");

program
  .version(version)
  .description(description);

program
  .command("make:controller <name>")
  .alias("mc")
  .description("Adds a controller")
  .action((name) => makeController(name));

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv);