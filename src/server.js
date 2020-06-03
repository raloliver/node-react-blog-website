import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json());

app.get('/api/posts/:name', async (req, res) => {
    try {
        const post = req.params.name;

        const connect = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = connect.db('node-react-blog-website');

        const currentPost = await db.collection('posts').findOne({ name: post });
        res.status(200).send(currentPost);

        connect.close();
    } catch (error) {
        res.status(500).send({ message: 'Error to get post', error });
    }
});

app.post('/api/posts/:name/like', async (req, res) => {
    try {
        const post = req.params.name;

        const connect = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = connect.db('node-react-blog-website');

        const currentPost = await db.collection('posts').findOne({ name: post });

        await db.collection('posts').updateOne({ name: post }, {
            '$set': {
                likes: currentPost.likes + 1
            }
        });

        const updateCurrentPost = await db.collection('posts').findOne({ name: post });

        res.status(200).send(`${updateCurrentPost.name} now has ${updateCurrentPost.likes} like(s)!`);

        connect.close();
    } catch (error) {
        res.status(500).send({ message: 'Error to like post', error });
    }
});

app.post('/api/posts/:name/comment', (req, res) => {
    const { username, comment } = req.body;
    const post = req.params.name;

    fakePosts[post].comments.unshift({ username, comment });
    res.status(200).send(fakePosts[post]);
});

app.get('/', (req, res) => res.send('Hello'));
app.get('/:name', (req, res) => res.send(`Hello ${req.params.name}!`));
app.post('/', (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log('8000 started...'));