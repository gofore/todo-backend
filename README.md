# Todo backend

## Description
Simple REST JSON backend to create todo lists containing todo items. Supports CORS.

Can be found at [gofore-todo.herokuapp.com](http://gofore-todo.herokuapp.com/).

## How to use
```shell
npm install
npm start
```

## API

### Todo lists
#### GET `todo-lists`
Returns a list of todo lists.

#### POST `todo-lists`
Creates a todo list with a name given as JSON object.

#### GET `todo-lists/:id`
Returns an object containing the todo list name and a list of todo items for todo list with id `id`.

```json
{
  "name": "My list",
  "todos": [
    {"id": 1, "name": "Do the laundry", "done": "false"},
    {"id": 2, "name": "Wash the dishes", "done": "true"}
  ]
}
```

#### POST `todo-lists/:id`
Adds a todo item with a name given as a JSON object to a list with id `id`.
Returns 200 on success with JSON object containing link to newly created todo item as value for key `url`:

```json
{
  "url": "http://gofore-todo.herokuapp.com/todos/1"
}
```

### Todo items
#### GET `todos/:id`
Returns the todo item with id `id`.

#### PUT `todos/:id`
Updates the todo item with id `id`. Takes an object with a name and a done status as JSON payload.

```json
{"name": "Do the laundry", "done": "true"}
```

#### DELETE `todos/:id`
Deletes the todo item with an id `id`.
