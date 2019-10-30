const Tangular = require("tangular");
const fs = require("fs");
const { capitalize, decapitalize } = require("./pipes");
const renderer = require("./js-template-renderer");

Tangular.register("capitalize", capitalize);
Tangular.register("decapitalize", decapitalize);

class Template {
    constructor({ path = null, content = null, data = {}, isJs = false }) {
        this.content = content;
        this.data = data;
        this.isJs = isJs;

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

    render(renderAsJs) {
        renderAsJs = (typeof renderAsJs !== 'undefined') ? renderAsJs : this.isJs;

        if (renderAsJs) {
            return renderer.render(this.content, this.data);
        }
        
        let result = Tangular.render(this.content, this.data);
            
        while(result.indexOf("&quot;") !== -1) {
            result = result.replace("&quot;", "\"");
        }

        return result;
        
    }
}

module.exports = Template;
