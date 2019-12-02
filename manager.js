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

    config = new (require('./config'))(config);

    Object.defineProperty(global, 'helpers', {'get': () => helpers});
    Object.defineProperty(global, 'CONFIG', {'get': () => config});

    const watcher = new (require('./core/directory/watcher'))(config.basepath);

}

module.exports = Manager;