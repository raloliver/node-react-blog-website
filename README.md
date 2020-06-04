### Deploy with AWS Free Tier Account

- https://aws.amazon.com/free/

### Upload project to Azure

- `npm install -g forever`
- `forever start -c "npm start"`
- `forever list`

> TODO: see how to deploy this project on Azure.

### Dependencies

- It is important to use @babel packages because we use ES2015+ sintax on our code.
- Also, it is important to use body-parser to handle with post action. `express().use(bodyParser.json())` and to get a value, just use `app.post('/', (req, res) => res.send(`${req.body.name}!`))`
- To get value from params, use `express.get('/:value', (req, res) => res.send(`${req.params.vale}!`))` when you need to pass by url.
- Use `nodemon` if you dont restart server every time you made a change.
- Use `mongodb` to handle with database and use `MongoClient` to connect.


### Why MongoDB?

- Non relational database
- Can push data to database without worrying about format (accepts any JSON object)
- Strucuture of data does not have be defined in advance
- SQL not required

> Start mongo: `mongod`

> Access mongo: `mongo`

> Create database: `use my-database`

> Add data: `db.posts.insert([{...}])`

> Consult data: `db.posts.find({})`

> Consult data (formated): `db.posts.find({}).pretty()`

> Search data: `db.posts.find({name: 'post-name'}).pretty()`

> Search data (only one result): `db.posts.findOne({name: 'post-name'}).pretty()`

- When you want to update some info on db, use `updateOne` with `$set` as first property of second argument.



