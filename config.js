function Config(config) {
    'use strict';

    const helpers = require('./core/helpers');
    const path = require('path');
    const configPath = path.resolve(config);
    if (typeof config === 'string') {
        config = helpers.getJSON(configPath);
    }

    if (!helpers.fs.existsSync(config.path)) {
        throw Error(`the path: ${config.path} does not exists`);
    }

    if (!config.path) {
        throw Error('The main path must be declared in config param');
    }

    if (typeof config[config.env] !== 'undefined') {
        config = Object.assign(config, config[config.env]);
    }

    if (typeof config[config.env] !== 'undefined') {
        config = Object.assign(config, config[config.env]);
    }

    Object.assign(this, config);

    Object.defineProperty(this, 'basepath', {'get': () => config.path});

}

module.exports = Config;