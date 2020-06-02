import express from 'express';
import bodyParser from 'body-parser';

const fakePosts = {
    'post-0': {
        like: 0
    },
    'post-1': {
        like: 0
    },
    'post-2': {
        like: 0
    }
}

const app = express();

app.use(bodyParser.json());

app.post('/api/posts/:name/like', (req, res) => {
    const post = req.params.name;

    fakePosts[post].like += 1;
    res.status(200).send(`${post} now has ${fakePosts[post].like} like(s)!`)
});

app.get('/', (req, res) => res.send('Hello'));
app.get('/:name', (req, res) => res.send(`Hello ${req.params.name}!`));
app.post('/', (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log('8000 started...'));