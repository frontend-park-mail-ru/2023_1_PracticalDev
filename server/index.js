const http = require('http');
const fs = require('fs');


const SERVER_PORT = 8000;

const server = http.createServer((req, res) => {
    console.log('REQUEST', req.method, req.url);

    const url = req.url === '/' ? '/index.html' : req.url;

    const file = fs.readFile('./public' + url, (err, data) => {
        if (err) {
            console.log('err ::', err);
            res.statusCode = 404;
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(SERVER_PORT);
