/**
 * Manager Builder bundles for client files.
 *
 * @author Julio Rodriguez
 * @github: https://www.github.com/jr0driguez
 * @email: jrodriguez@jidadesarrollos.com
 *
 */

function Manager(config) {
    'use strict;';

    const helpers = require('./core/helpers');
    const path = require('path');

    if (typeof config === 'string') {
        config = helpers.getJSON('./config.json');
    }

    if (!config.path) {
        throw Error('The main path must be declared in config param');
    }

    if (typeof config[config.env] !== 'undefined') {
        config = Object.assign(config, config[config.env]);
    }

    const chokidar = require('chokidar');
    const Modules = require('./core/modules');
    const modules = new Modules(config.path);

    Object.defineProperty(global, 'helpers', {'get': () => helpers});
    Object.defineProperty(global, 'CONFIG', {'get': () => config});

    const watcher = chokidar.watch(
        config.path,
        {
            'ignored': /^[^\.].*$/,
            'persistent': true
        }
    );

    console.log('listen files...');

    watcher.on('change', async (file, v) => {

        const dir = path.dirname(file);
        const isListened = modules.directories.has(dir);

        console.log('updating bundles...');
        if (isListened) {
            const pathModule = modules.directories.get(dir);
            const module = modules.entries.get(pathModule);
            module.load();
        }

    });

}

module.exports = Manager;