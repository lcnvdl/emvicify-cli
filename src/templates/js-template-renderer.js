module.exports = {
  /**
     * @param {string} content Content
     * @param {*} data Data
     */
  render(content, data) {
    const finalContent = [];
    const lines = content.split("\n");

    lines.forEach(line => {
      let finalLine = line;

      Object.keys(data).forEach(key => {
        const k = `__${key}__`;
        const kc = `__@${key}__`;

        while (finalLine.indexOf(k) !== -1) {
          finalLine = finalLine.replace(k, data[key]);
        }

        if (finalLine.indexOf(kc) !== -1) {
          const kci = finalLine.indexOf(kc);
          const commentIndex = finalLine.substr(0, kci).indexOf("//");
          finalLine = finalLine.substr(0, commentIndex) + data[key];
        }
      });

      finalContent.push(finalLine);
    });

    return finalContent.join("\n");
  },
};
