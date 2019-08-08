const Tangular = require("tangular");
const fs = require("fs");
const fsPromises = fs.promises;

Tangular.register("decapitalize", value => {
  if (!value) {
    return "";
  }

  if (value.length > 1) {
    return value.substr(0, 1).toLowerCase() + value.substr(1, value.length);
  }
    
  return value.toLowerCase();
    
});

Tangular.register("capitalize", value => {
  if (!value) {
    return "";
  }

  if (value.length > 1) {
    return value.substr(0, 1).toUpperCase() + value.substr(1, value.length);
  }
    
  return value.toUpperCase();
    
});

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
