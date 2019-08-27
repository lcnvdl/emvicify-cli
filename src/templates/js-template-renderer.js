module.exports = {
    /**
     * @param {string} content Content
     * @param {*} data Data
     */
    render(content, data) {
        let finalContent = [];
        let lines = content.split("\n");

        lines.forEach(line => {
            let finalLine = line;

            Object.keys(data).forEach(key => {
                let k = `__${data}__`;
                let kc = `__@${data}__`;

                while (finalLine.indexOf(k) !== -1) {
                    finalLine = finalLine.replace(k, data[key]);
                }

                if (finalLine.indexOf(kc) !== -1) {
                    let kci = finalLine.indexOf(kc);
                    let commentIndex = finalLine.substr(0, kci).indexOf("//");
                    finalLine = finalLine.substr(0, commentIndex) + data[key];
                }
            });

            finalContent.push(finalLine);
        });

        return finalContent.join("\n");
    }
};