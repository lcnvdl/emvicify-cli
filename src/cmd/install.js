const colog = require("colog");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function install(package) {
  colog.log("npm i --save " + package);

  const { stdout, stderr } = await exec("npm i --save " + package);

  if (stdout && stdout !== "") {
    colog.log(stdout);
  }

  if (stderr && stderr !== "") {
    colog.error(stderr);
  }
}

module.exports = async (package, otherPackages) => {
  await install(package);

  if (otherPackages) {
    for (let i = 0; i < otherPackages.length; i++) {
      await install(otherPackages[i]);
    }
  }
};
