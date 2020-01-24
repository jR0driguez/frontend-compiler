const helpers = global.helpers;

class JSProcessor {

    header(name) {
        return `\n/**\n* file: ${name}\n*/\n`;
    }

    async readFile(file) {

        try {
            if (!helpers.fs.readFileSync(file.path)) console.log(`the file ${file} does not exist`);
            const content = await helpers.fs.readFile(file.path, {'encoding': 'utf8'});
            let code = '';
            code += this.header(file.name);
            code += '\n';
            code += content;
            code += '\n';
            return code;
        }
        catch (e) {
            console.error(`couldn't compile js files`, e);
        }

    }

    async process(path) {

        let code = '';

        const directory = new (require('../../directory'))(path);

        for (let file of directory.files) {
            code += await this.readFile(file);
        }

        return code;

    }
}

module.exports = JSProcessor;