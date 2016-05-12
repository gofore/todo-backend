var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Use JSON body parser

// Todo lists
app.get('/todo-lists', (req, res, next) => {
  console.log('Fetched list of todo lists.');
  res.json([{id: 1, name: 'my list'}, {id: 2, name: 'Second list'}]);
});

app.post('/todo-lists', (req, res, next) => {
  const name = req.body.name;
  console.log('Created a todo list with name ' + name);
  const id = 1;
  res.json({url: 'http://gofore-todo.herokuapp.com/todo-lists/' + id});
});

app.get('/todo-lists/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Fetched todo list with an id ' + id);
  res.json([{id: 1, task: 'Do the laundry'}, {id: 2, task: 'Go to school'}]);
});

app.post('/todo-lists/:id', (req, res, next) => {
  console.log('Created a todo item for list with an id ' + id);
  const id = 1;
  res.json({url: 'http://gofore-todo.herokuapp.com/todos/' + id});
});

// Todo items
app.put('/todos/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Updated todo item with an id ' + id);
  res.json({});
});

app.delete('/todos/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Deleted todo item with an id ' + id);
  res.json({});
});

app.listen(process.env.PORT || 8080, function(){
  console.log('CORS-enabled web server listening on port 80');
});
