function Watcher(appPath) {
    'use strict';

    const path = require('path');
    const chokidar = require('chokidar');
    const Modules = require('../modules');
    const modules = new Modules(appPath);

    const watcher = chokidar.watch(
        appPath,
        {
            'persistent': true
        }
    );
    watcher.on('change', async (file, v) => {

        const dir = path.dirname(file);
        const resolve = require('path').resolve;
        const absolute = resolve(dir);
        const isListened = modules.directories.has(dir);

        if (!isListened) return;

        const pathModule = modules.directories.get(dir);
        const module = modules.entries.get(pathModule);
        const basename = path.basename(absolute);

        if (basename === module.output || basename === module.outputMap) return;

        if (module.toListen.includes(absolute)) {
            module.load();
            console.log(`compiled ${pathModule}`)
        }

    });
    console.log('listen files...');

}

module.exports = Watcher;