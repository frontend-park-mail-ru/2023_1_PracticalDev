import Handlebars from 'handlebars';
import findFilesInDir from './findFilesInDir.js';
import * as fs from 'fs/promises';

let raw_templates = findFilesInDir('public/', /.*.handlebars$/);

raw_templates.forEach((template) => {
    fs.readFile(template, { encoding: 'utf-8' }).then((res) => {
        let templ = Handlebars.precompile(res);
        fs.writeFile(template + '.js', `let precompiled_template =  ${templ};\nexport default precompiled_template;\n`, { encoding: 'utf-8' });
    });
});
