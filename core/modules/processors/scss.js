const helpers = global.helpers;

function SCSSProcessor() {

    this.process = async (path, files) => {

        const directory = new (require('../../directory'))(path, files);

        //let content = '\n/**\n SCSS files processor\n*/\n';
        let content = '';

        const header = (name) => `\n/**\n* file: ${name}\n*/\n`;

        for (let file of directory.files) {

            if (!helpers.fs.readFileSync(file.path)) console.log(`the file ${file} does not exist`);
            //
            // content += header(file.name);
            // content += '\n';
            content += await helpers.fs.readFile(file.path, {'encoding': 'utf8'});

        }

        const sass = require('node-sass');
        const result = sass.renderSync({
            'data': content,
            'outputSttyle': 'compact'
        });

        let output = `var cssOutput = \`${result.css}\`;\n`;
        output += `let styles = document.createElement('style');\n`;
        output += `styles.innerText=cssOutput;\n`;
        output += `document.body.appendChild(styles);`;

        return output;

    };
}

module.exports = SCSSProcessor;