const Tangular = require("tangular");
const fs = require("fs");
const fsPromises = fs.promises;
const { capitalize, decapitalize } = require("./pipes");

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

    async load(path) {
        this.content = await fsPromises.readFile(path, "utf-8");
    }

    loadSync(path) {
        this.content = fs.readFileSync(path, "utf-8");
    }

    setData(key, value) {
        this.data[key] = value;
    }

    render() {
        return Tangular.render(this.content, this.data);
    }
}

module.exports = Template;
