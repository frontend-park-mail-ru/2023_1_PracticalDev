import * as http from 'http';
import * as fs from 'fs';
import * as log from './log.js';

/**
 * lookup content type
 * by the extension
 * no extension would resolve in "text/plain"
 * @param {string} fileName
 *
 * @returns {string}
 */
function lookupContentType(fileName) {
    const ext = fileName.toLowerCase().split('.').slice(1).pop();
    switch (ext) {
        case 'txt':
            return 'text/plain';
        case 'html':
            return 'text/html';
        case 'js':
            return 'text/javascript';
        case 'css':
            return 'text/css';
        case 'pdf':
            return 'application/pdf';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'mp4':
            return 'video/mp4';
        case 'svg':
            return 'image/svg+xml';
        case 'webp':
            return 'image/webp';
        default:
            return '';
    }
}

const pages = new Map([['/', '/index.html'],
['/profile', '/profile/index.html']]);

const findPage = (page) => {
    if (pages.has(page)) {
        return pages.get(page);
    }
    return page;
};

const SERVER_PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    const url = findPage(req.url);
    log.debug('got request', url);
    log.debug('request method', req.method);

    if (fs.existsSync('./public' + url)) {
        fs.readFile('./public' + url, (err, data) => {
            if (err) {
                log.err('failed to open file: ', err);
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader('Content-Type', lookupContentType(url));
                res.write(data);
                res.statusCode = 200;
                res.end();
            }
        });
    } else {
        log.warn('file does not exist', url);
        res.statusCode = 404;
        res.end();
    }
});

server.listen(SERVER_PORT);
