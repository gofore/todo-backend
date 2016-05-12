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

#### GET `todo-lists/:id`
Returns an object containing the todo list name and a list of todo items for todo list with id `id`.

```json
{
  name: 'My list',
  todos: [
    {id: 1, name: 'Do the laundry'},
    {id: 2, name: 'Wash the dishes'}
  ]
}
```

#### POST `todo-lists/:id`
Add a todo item to list with id `id`.
Returns 200 on success with JSON object containing link to newly created todo item as value for key `url`:

```json
{
  url: 'http://gofore-todo.herokuapp.com/todos/1'
}
```

### Todo items
#### PUT `todos/:id`
Updates the todo item with id `id`. Takes an object with name as JSON payload.

#### DELETE `todos/:id`
Deletes the todo item with an id `id`.
