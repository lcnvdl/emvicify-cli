const fs = require("fs");
const path = require("path");

function readPluginsCommands(program) {
    if (fs.existsSync(path.join(process.cwd(), "app", "plugins"))) {
        
    }
}

module.exports = { readPluginsCommands };