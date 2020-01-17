function Directory(path) {
    'use strict';
    const Path = require('path');
    const fs = require('fs');
    const File = require('./file');

    let files = [];

    Object.defineProperty(this, 'files', {'get': () => files});
    Object.defineProperty(this, 'hasFiles', {'get': () => !!files.length});

    this.read = (dir) => {

        let entries = fs.readdirSync(dir);

        entries.forEach((file) => {

            const isDirectory = fs.statSync(`${dir}${Path.sep}${file}`).isDirectory();

            if (isDirectory) this.read(`${dir}${Path.sep}${file}`);
            else {
                files.push(new File(dir, file));
            }

        });

    };

    if (path && fs.existsSync(path)) this.read(path);

}

module.exports = Directory;