const colog = require("colog");

module.exports = {
    logo() {
        colog.log(" ");
        colog.log(colog.bgBlue("                    "));
        colog.log(colog.colorBlue(colog.bgWhite("    EMVICIFY CLI    ")));
        colog.log(colog.colorCyan(colog.bgBlue(" lucianorasente.com ")));
        colog.log(" ");
    },
    
    present(commandTitle) {
        colog.log(colog.apply("Running ", ["bold", "colorBlack"]) + colog.apply(commandTitle, ["bold", "colorMagenta"]));
        colog.log(" ");
    },

    goodbye(message) {
        colog.success(message)
    }
};
