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

        const { stdout, stderr } = await exec(cmd);
        return { stdout, stderr };
    }
};