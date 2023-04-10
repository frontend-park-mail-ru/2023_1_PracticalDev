import express from 'express';
import posts from './posts.js';
import boardsPins from './boards.js';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/pins', (req, res) => {
    res.send(JSON.stringify(posts));
});

app.get('/boards/:boardId/pins', (req, res) => {
    res.send(boardsPins[req.params.boardId]);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
