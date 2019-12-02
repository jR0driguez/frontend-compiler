const fs = global.fs;
const Path = require('path');
const helpers = require('../helpers');

function Module(path) {
    'use strict';

    //todo: los procesadores deben ser ocnfigurables.
    const processors = ['js', 'jsx', 'json', 'txt', 'scss', 'less'];
    Object.defineProperty(this, 'path', {'get': () => path});

    const name = 'module.json';
    Object.defineProperty(this, 'name', {'get': () => name});

    let config;
    Object.defineProperty(this, 'config', {'get': () => config});

    /**
     * @var {object} toListen : Directories into module to be listen
     */
    let toListen = [];
    Object.defineProperty(this, 'toListen', {'get': () => toListen});
    /**
     * Read the module and compile it at first time.
     * @returns {Promise<void>}
     * @private
     */
    const _read = async () => {

        const filePath = `${path}${Path.sep}${this.name}`;
        config = helpers.getJSON(filePath);

        for (let processor of processors) {

            if (config.hasOwnProperty(processor)) {
                const folderToListen = `${path}${Path.sep}${processor}`;
                toListen.push(folderToListen)
            }

        }

        return this.load();

    };

    let output;
    Object.defineProperty(this, 'output', {'get': () => output});
    let outputMap;
    Object.defineProperty(this, 'output<ap', {'get': () => output});

    this.load = async () => {

        output = `${path}${Path.sep}code.js`;
        outputMap = `${path}${Path.sep}code.map.js`;
        // todo: change logic, make types
        // todo: remove builder object
        const builder = new (require('./builder'))();
        try {
            await builder.loadModule(config, path, output, outputMap);
        }
        catch (e) {
            console.error('error', e);
        }

        console.log(`module compiled: ${output}`);
    }

    _read();

}

module.exports = Module;
