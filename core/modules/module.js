const fs = global.fs;
const Path = require('path');

class Module {

    constructor(path) {
        this._path = path;
        this._read();
    }

    get name() {
        return 'module.json';
    }

    get path() {
        return this._path;
    }

    get config() {
        return this._config;
    }

    /**
     * Read the module and compile it at first time.
     * @returns {Promise<void>}
     * @private
     */
    async _read() {

        const path = `${this._path}${Path.sep}${this.name}`;
        console.log(1, this._path);
        try {

            const file = await fs.readFile(path, {'encoding': 'utf8'});
            this._config = JSON.parse(file);
            return this.load();

        }
        catch (e) {
            console.error(`the module.json is not valid ${path}`, e);
        }

    }

    async load() {
        const output = `${this._path}${Path.sep}code.js`;
        const outputMap = `${this._path}${Path.sep}code.map.js`;
        // todo: change logic, make types
        // todo: remove builder object
        const builder = new (require('./builder'))();
        try {
            await builder.loadModule(this._config, this._path, output, outputMap);
        }
        catch (e) {
            console.error('error', e);
        }

        console.log(`module compiled: ${output}`);
    }

}

module.exports = Module;
