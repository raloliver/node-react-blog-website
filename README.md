### Deploy with AWS Free Tier Account

- https://aws.amazon.com/free/

### Dependencies

- It is important to use @babel packages because we use ES2015+ sintax on our code.
- Also, it is important to use body-parser to handle with post action. `express().use(bodyParser.json())` and to get a value, just use `app.post('/', (req, res) => res.send(`${req.body.name}!`))`
- To get value from params, use `express.get('/:value', (req, res) => res.send(`${req.params.vale}!`))` when you need to pass by url.
- Use `nodemon` if you dont restart server every time you made a change.
