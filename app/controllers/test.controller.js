const { BaseController } = require("emvicify/controllers");

class TestController extends BaseController {
    constructor({ services }) {
        super({ services });
    }
}

module.exports = TestController;
