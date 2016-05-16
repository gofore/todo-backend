var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express();


var Sequelize = require('sequelize'),
  sequelize = null;

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL);
}
else {
  sequelize = new Sequelize('database', 'root', null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'database.sqlite'
  });
}
sequelize.define("TodoList", {
  name: Sequelize.STRING
});
sequelize.define("Todo", {
  name: Sequelize.STRING,
  assignee: Sequelize.STRING,
  done: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});
const Todo = sequelize.models.Todo;
const TodoList = sequelize.models.TodoList;
TodoList.hasMany(Todo, {as: 'todos'});

app.use(cors()); // Enable CORS
app.use(bodyParser.json({strict: false})); // Use JSON body parser

// Todo lists
app.get('/todo-lists', (req, res, next) => {
  console.log('Fetched list of todo lists.');
  TodoList.findAll().then(todoLists => res.json(todoLists));
});

app.post('/todo-lists', (req, res, next) => {
  const name = req.body.name;
  console.log('Created a todo list with name ' + name);
  TodoList.create({name: name}).then(todo => {
    res.json({url: 'http://gofore-todo.herokuapp.com/todo-lists/' + todo.id});
  });
});

app.get('/todo-lists/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Fetched todo list with an id ' + id);
  TodoList.findById(id)
    .then(todoList => todoList.getTodos()
      .then(todos => res.json({name: todoList.name, todos: todos})));
});

app.post('/todo-lists/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Created a todo item for list with an id ' + id);
  TodoList.findById(id)
    .then((todoList) => todoList.createTodo(req.body)
      .then(todoList => res.json({url: 'http://gofore-todo.herokuapp.com/todos/' + todoList.id})));
});

// Todo items
app.put('/todos/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Updated todo item with an id ' + id);
  Todo.findById(id).then(todo => todo.update(req.body).then(() => res.json({})));
});

app.delete('/todos/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Deleted todo item with an id ' + id);
  Todo.findById(id).then(todo => todo.destroy().then(() => res.json({})));
});

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 8080, function(){
    console.log('CORS-enabled web server listening on port 80');
  });
});
