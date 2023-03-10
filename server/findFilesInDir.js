import * as fs from 'fs';
import path from 'path';

/**
 * Ищет все файлы с указанным расширением рекурсивно.
 *
 * @param {string} startPath Директория, внутри которой необходимо выполнить поиск
 * @param {RegExp} filter Расширение для поиска в формате `RegExp
 * `
 * @returns {string[]} - массив найденных файлов с полным путем
 */
const findFilesInDir = (startPath, filter) => {
    if (!fs.existsSync(startPath)) {
        console.log('Directory not found ', startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    let results = [];

    files.forEach((obj) => {
        const filename = path.join(startPath, obj);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results = results.concat(findFilesInDir(filename, filter));
        } else if (filter.test(filename)) {
            results.push(filename);
        }
    });
    return results;
};

export default findFilesInDir;
