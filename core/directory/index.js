function Directory(path) {
    'use strict';

    const fs = require('fs');
    const File = require('./file');

    let files = [];

    Object.defineProperty(this, 'files', {'get': () => files});
    Object.defineProperty(this, 'hasFiles', {'get': () => !!files.length});

    this.read = (dir) => {

        let entries = fs.readdirSync(dir);

        entries.forEach((file) => {

            const isDirectory = fs.statSync(`${dir}/${file}`).isDirectory();

            if (isDirectory) this.read(file);

            files.push(new File(path, file));

        });

    };

    if (path && fs.existsSync(path)) this.read(path);

}

module.exports = Directory;