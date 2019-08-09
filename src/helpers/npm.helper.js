const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports = {
    async install(package, save) {

        if (package.indexOf(" ") !== -1) {
            throw new Error("Invalid package name");
        }

        let cmd = "npm i " + package;

        if (save) {
            cmd += " --save";
            if (save === "dev") {
                cmd += "-dev";
            }
        }

        let { stdout, stderr } = await exec(cmd);

        if (stderr && stderr !== "") {
            let hasErrors = stderr.split("\n").map(m => m.trim()).some(m => m && m !== "" && m.indexOf("npm WARN") === -1);
            if (!hasErrors) {
                stderr = "";
            }
        }

        return { stdout, stderr };
    }
};