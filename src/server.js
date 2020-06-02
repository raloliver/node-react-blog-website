import express from 'express';
import bodyParser from 'body-parser';

const fakePosts = {
    'post-0': {
        likes: 0,
        comments: []
    },
    'post-1': {
        likes: 0,
        comments: []
    },
    'post-2': {
        likes: 0,
        comments: []
    }
}

const app = express();

app.use(bodyParser.json());

app.post('/api/posts/:name/like', (req, res) => {
    const post = req.params.name;

    fakePosts[post].likes += 1;
    res.status(200).send(`${post} now has ${fakePosts[post].likes} like(s)!`)
});

app.post('/api/posts/:name/comment', (req, res) => {
    const { username, comment } = req.body;
    const post = req.params.name;

    fakePosts[post].comments.unshift({username, comment});
    res.status(200).send(fakePosts[post]);
});

app.get('/', (req, res) => res.send('Hello'));
app.get('/:name', (req, res) => res.send(`Hello ${req.params.name}!`));
app.post('/', (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log('8000 started...'));