const Path = require('path');

class Builder {

    async loadModule(module, location, output) {

        const config = global.CONFIG;
        const basePath = Path.resolve(config.path);

        let path = location.split(basePath)[1].split(Path.sep);

        let jumps = '';

        for (let step in path) jumps += '../';

        // todo: validate bundle types.
        let bundle = 'code';

        if (module.bundle) {
            bundle = module.bundle;
            delete module.bundle;
        }

        const bundleManager = new (require('./bundles/code'))(jumps);

        await bundleManager.process(module, location, output);

    }

}

module.exports = Builder;