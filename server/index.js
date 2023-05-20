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
        case 'ico':
            return 'image/x-icon';
        default:
            return '';
    }
}

/**
 * 
 * @param {string} data 
 * @param {string} url 
 * 
 */
const processOGP = async (data, url) => {
    // console.log(url)
    if (url.indexOf("pin/") > 0) {
        const id = url.substring(url.indexOf("pin") + 4)
        const pin = await (await fetch(`http://backend:8080/pins/${id}`)).json()
        data = data.replace(`<meta property="og:title" content=""`, `<meta property="og:title" content="${pin.title}"`)
        data = data.replace(`<meta property="og:type" content=""`, `<meta property="og:type" content="website"`)
        data = data.replace(`<meta property="og:url" content=""`, `<meta property="og:url" content="https://pickpin.ru${url}"`)
        data = data.replace(`<meta property="og:image" content=""`, `<meta property="og:image" content="${pin.media_source}"`)
        data = data.replace(`<meta property="og:image:secure_url" content=""`, `<meta property="og:image:secure_url" content="${pin.media_source}"`)
        data = data.replace(`<meta property="og:description" content=""`, `<meta property="og:description" content="${pin.description}"`)
    } else {
        data = data.replace(`<meta property="og:title" content=""`, `<meta property="og:title" content="Pickpin"`)
        data = data.replace(`<meta property="og:type" content=""`, `<meta property="og:type" content="website"`)
        data = data.replace(`<meta property="og:url" content=""`, `<meta property="og:url" content="https://pickpin.ru${url}"`)
        data = data.replace(`<meta property="og:image" content=""`, `<meta property="og:image" content="https://pickpin.hb.bizmrg.com/Logo2.png"`)
        data = data.replace(`<meta property="og:image:secure_url" content=""`, `<meta property="og:image:secure_url" content="${pin.media_source}"`)
        data = data.replace(`<meta property="og:description" content=""`, `<meta property="og:description" content="Pick pictures for your pins"`)
    }
    return data
}

const SERVER_PORT = process.env.PORT || 3001;

const async_server = http.createServer();
async_server.on('request', async (req, res) => {
    let url = req.url;
    let response;

    log.debug('got request', url);
    log.debug('request method', req.method);

    if (response === 404) {
        return;
    }

    try {
        const data = (await fs_async.readFile('./dist/index.html')).toString();
        const processed = await processOGP(data, url);
        res.write(processed);
        res.statusCode = 200;
        response = 200;
        res.end();
    } catch (error) {
        log.err('failed to open file: ', error);
        res.statusCode = 500;
        response = 500;
        res.end();
    }

    log.info(response, req.url);
});

async_server.listen(SERVER_PORT);
