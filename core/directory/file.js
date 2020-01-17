function File(path, name) {
    'use strict';

    console.log(2, path, name)
    const Path = require('path');
    const fs = require('fs');

    Object.defineProperty(this, 'path', {
        'get': () => {
            return `${path}${Path.sep}${name}`;
        }
    });
    Object.defineProperty(this, 'name', {'get': () => name});

}

module.exports = File;