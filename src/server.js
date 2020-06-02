import express from 'express';
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello'));
app.post('/', (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log('8000 started...'));