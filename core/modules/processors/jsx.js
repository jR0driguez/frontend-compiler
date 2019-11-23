class JSXProcessor {

    header(name) {
        return `\n/**\n* file: ${name}\n*/\n`;
    }

    async process(path) {

        const directory = new (require('../../directory'))(path);

        let jsxContent = '';

        for (let file of directory.files) {

            try {

                if (!helpers.fs.readFileSync(file.path)) console.log(`the file ${file} does not exist`);

                jsxContent += this.header(file.name);
                jsxContent += '\n';
                jsxContent += await helpers.fs.readFile(file.path, {'encoding': 'utf8'});

            }
            catch (e) {
                console.error(`couldn't compile jsx files`, e);
            }
        }

        const compiled = require('@babel/core').transform(jsxContent, {
            'plugins': ['@babel/plugin-transform-react-jsx']
        });

        return compiled.code;

    }

}

module.exports = JSXProcessor;