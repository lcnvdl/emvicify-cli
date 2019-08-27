const Tangular = require("tangular");
const fs = require("fs");
//const fsPromises = fs.promises;
const { capitalize, decapitalize } = require("./pipes");
const renderer = require("./js-template-renderer");

Tangular.register("capitalize", capitalize);
Tangular.register("decapitalize", decapitalize);

class Template {
    constructor({ path = null, content = null, data = {} }) {
        this.content = content;
        this.data = data;

        if (path) {
            this.loadSync(path);
        }
    }

    get isLoaded() {
        return !!this.content;
    }

    loadSync(path) {
        this.content = fs.readFileSync(path, "utf-8");
    }

    setData(key, value) {
        this.data[key] = value;
    }

    render(isJs) {
        if (isJs) {
            return renderer.render(this.content, this.data);
        }
        else {
            return Tangular.render(this.content, this.data);
        }
    }
}

module.exports = Template;
