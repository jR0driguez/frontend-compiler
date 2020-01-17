const minify = require('minify');
const Path = require('path');
const helpers = global.helpers;
const processors = ['jsx', 'js'];

class Code {

    constructor(jumps) {
        this._jumps = jumps;
    }

    async process(module, dirname, output) {

        const config = global.CONFIG;
        let code = '';
        if (config.imports && typeof config.imports === 'object') {

            for (let library in config.imports.files) {
                if (config.imports.files.hasOwnProperty(library)) {
                    code += `import ${library} from '${this._jumps}${config.imports.files[library]}';\n`;
                }

            }
        }

        const fs = helpers.fs;

        try {

            const processorsManager = new (require('../processors'))();

            for (let prop of processors) {

                if (!module.hasOwnProperty(prop)) continue;

                let folder = typeof module[prop] === 'string' ? module[prop] : module[prop].path;

                if (!folder) {
                    throw  new Error(`The processor "${prop}" has not a path defined.`);
                }

                const dir = `${dirname}${Path.sep}${folder}`;

                if (!fs.existsSync(dir)) continue;

                if (typeof processorsManager[prop] !== 'object') {
                    throw new Error(`Module is not correctly config. ${prop} is not a valid type`);
                }

                code += await processorsManager[prop].process(dir);

            }

            fs.writeFile(output, code);

            if (CONFIG.compress) {
                let data = await minify(output);
                fs.writeFile(output, data);
            }

        }
        catch (e) {
            console.error('cannot compile bundle', e);
        }

    }

}

module.exports = Code;