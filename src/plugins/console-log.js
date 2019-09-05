const colog = require("colog");

class ConsoleLog {
    info(a) {
        colog.info(a);
    }

    log(a) {
        colog.log(a);
    }

    success(a) {
        colog.success(a);
    }

    warning(a) {
        colog.warning(a);
    }

    error(a) {
        colog.error(a);
    }
}

module.exports = ConsoleLog;