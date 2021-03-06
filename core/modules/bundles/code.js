const minify = require('minify');
const Path = require('path');
const helpers = global.helpers;
const processors = ['jsx', 'js', 'scss'];

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
                    let file = config.imports.files[library];
                    code += `import {${library}} from '${this._jumps}${config.imports.path}/${file}';\n`;
                }

            }
        }

        const processorsManager = new (require('../processors'))();
        if (module.imports) {
            const dir = `${dirname}${Path.sep}`;
            const importFile = new (require('../../directory/file.js'))(dir, module.imports);
            code += await processorsManager['js'].readFile(importFile);
        }
        const fs = helpers.fs;

        try {

            for (let prop of processors) {

                if (!module.hasOwnProperty(prop)) continue;

                let folder = typeof module[prop] === 'string' ? module[prop] : module[prop].path;
                let files = typeof module[prop] === 'string' ? undefined : module[prop].files;
                if (typeof files !== 'object') files = undefined;
                if (!folder) {
                    throw  new Error(`The processor "${prop}" has not a path defined.`);
                }

                const dir = `${dirname}${Path.sep}${folder}`;

                if (!fs.existsSync(dir)) continue;

                if (typeof processorsManager[prop] !== 'object') {

                    throw new Error(`Module is not correctly config. ${prop} is not a valid type`);
                }

                code += await processorsManager[prop].process(dir, files);

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