import express from 'express';
import posts from './posts.js';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/posts', (req, res) => {
    res.send(JSON.stringify(posts));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
