import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json());

/**
 * #TODO investigate and understanding better the connectDB function. How exactly the connectDB function works?
 */

const connectDB = async (operations, res) => {
    try {
        const connect = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = connect.db('node-react-blog-website');

        await operations(db);

        connect.close();
    } catch (error) {
        res.status(500).send({ message: 'Error connection to database', error });
    }
};

app.get('/api/posts/:name', async (req, res) => {
    connectDB(
        async (db) => {
            const post = req.params.name;

            const currentPost = await db.collection('posts').findOne({ name: post });
            res.status(200).json(currentPost);
        },
        res
    );
});

app.post('/api/posts/:name/like', async (req, res) => {
    connectDB(
        async (db) => {
            const post = req.params.name;

            const currentPost = await db.collection('posts').findOne({ name: post });

            await db.collection('posts').updateOne({ name: post }, {
                '$set': {
                    likes: currentPost.likes + 1
                }
            });

            const updateCurrentPost = await db.collection('posts').findOne({ name: post });
            //#TODO: implements result pattern
            //`${updateCurrentPost.name} now has ${updateCurrentPost.likes} like(s)!` }
            res.status(200).json(updateCurrentPost);
        },
        res
    );
});

app.post('/api/posts/:name/comment', (req, res) => {
    const { username, comment } = req.body;
    const post = req.params.name;

    connectDB(
        async (db) => {
            const post = req.params.name;

            const currentPost = await db.collection('posts').findOne({ name: post });

            await db.collection('posts').updateOne({ name: post }, {
                '$set': {
                    comments: [{ username, comment }].concat(currentPost.comments)
                }
            });

            const updateCurrentPost = await db.collection('posts').findOne({ name: post });

            //#TODO: implements result pattern
            //`Comment '${updateCurrentPost.comments[0].comment}' writed by ${updateCurrentPost.comments[0].username} it is sent.`
            res.status(200).send(updateCurrentPost);
        },
        res
    );
});

app.get('/', (req, res) => res.send('Hello'));
app.get('/:name', (req, res) => res.send(`Hello ${req.params.name}!`));
app.post('/', (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log('8000 started...'));