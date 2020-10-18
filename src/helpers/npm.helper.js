const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports = {
  async init() {
    const cmd = "npm init -y";

    // eslint-disable-next-line prefer-const
    let { stdout, stderr } = await exec(cmd);

    if (stderr && stderr !== "") {
      const hasErrors = stderr.split("\n").map(m => m.trim()).some(m => m && m !== "" && m.indexOf("npm WARN") === -1);
      if (!hasErrors) {
        stderr = "";
      }
    }

    return { stdout, stderr };
  },

  async install(packageName, save) {
    if (packageName.indexOf(" ") !== -1) {
      throw new Error("Invalid package name");
    }

    let cmd = `npm i --loglevel=error ${packageName}`;

    if (save) {
      cmd += " --save";
      if (save === "dev") {
        cmd += "-dev";
      }
    }

    // eslint-disable-next-line prefer-const
    let { stdout, stderr } = await exec(cmd);

    if (stderr && stderr !== "") {
      const hasErrors = stderr.split("\n").map(m => m.trim()).some(m => m && m !== "" && m.indexOf("npm WARN") === -1);
      if (!hasErrors) {
        stderr = "";
      }
    }

    return { stdout, stderr };
  },
};
