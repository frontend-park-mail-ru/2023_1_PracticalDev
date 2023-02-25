import * as http from 'http';
import * as fs from 'fs';
import * as fs_async from 'fs/promises';
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
        case 'handlebars':
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

// const pages = new Map([
//     ['/', '/index.html'],
//     ['/profile', '/profile/index.html'],
// ]);

const SERVER_PORT = process.env.PORT || 8000;

const async_server = http.createServer();
async_server.on('request', async (req, res) => {
    let url = req.url;
    let response;

    if (url === '/') {
        url += 'index.html';
    } else if (lookupContentType(url) === '') {
        url += '.html';
    }

    log.debug('got request', url);
    log.debug('request method', req.method);

    await fs_async.access('./public' + url, fs.constants.R_OK).catch((val) => {
        log.warn(val, url);
        res.statusCode = 404;
        response = 404;
        res.end();
    });

    if ((response === 404)) {
        return;
    }

    await fs_async
        .readFile('./public' + url)
        .then((data) => {
            res.setHeader('Content-Type', lookupContentType(url));
            res.write(data);
            res.statusCode = 200;
            response = 200;
            res.end();
        })
        .catch((err) => {
            log.err('failed to open file: ', err);
            res.statusCode = 500;
            response = 500;
            res.end();
        });

    log.info(response, req.url);
});

async_server.listen(SERVER_PORT);
