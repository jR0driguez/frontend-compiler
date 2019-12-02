function Reader() {

    const fs = require('fs');
    let files = [];
    Object.defineProperty(this, 'files', {'get': () => files});

    this.read = (dir) => {
        let entries = fs.readdirSync(dir);
        entries.forEach((file) => {
            const isDirectory = fs.statSync(`${dir}/${file}`).isDirectory();
            if (isDirectory) this.read(file);
            files.push(file);
        });

    };

    this.getJson = file => {
        try {

            return JSON.parse(file);
        }
        catch (e) {
            throw e;
        }
    };

}

module.exports = Reader;