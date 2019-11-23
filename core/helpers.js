function Helpers() {

    const fs = require('fs');
    const {promisify} = require('util');
    fs.readFile = promisify(fs.readFile);
    fs.writeFile = promisify(fs.writeFile);
    Object.defineProperty(this, 'fs', {'get': () => fs});
    Object.defineProperty(global, 'fs', {'get': () => fs});

    this.getJSON = (path) => {
        try {
            if (!fs.existsSync(path)) {
                throw  `the ${path} file is not exist`;
            }
            return JSON.parse(fs.readFileSync(path));
        }
        catch (e) {
            console.error(`cannot read json ${path}`, e);
        }
    }
}

module.exports = new Helpers();