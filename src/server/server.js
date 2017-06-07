var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Todos Array
var todos = [];

// Unique ID that increments with each new Todo
var id = 1

// Create New Todo Server-Side
function newTodo(text, status = 'active') {
  let todo = {"id": id++, "text": text, "status": status}
  todos.push(todo)
  return todo
}

// Access App Via '/' Route
app.get('/', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

// Access App Via '/active' Route
app.get('/active', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

// Access App Via '/completed' Route
app.get('/completed', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

// Access App Via '/archived' Route
app.get('/archived', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

// Get all Todos
app.get('/todos', function(req, res) {
  res.json(todos);
});

// Get Todo
app.get('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  if (index < 0 || index >= todos.length) {
    return res.status(400).json({
      "message": `invalid id ${id} type ${typeof(id)} at index ${index}`
    });
  }

  res.json(todos[index]);
});

// Add Todo
app.post('/todos', function(req, res) {
  var text = req.body.data.text;
  if (!text) {
    return res.status(400).json({"message": "text is required"});
  }

  let todo = newTodo(text);

  res.json(todos);
});

// Delete Todo
app.delete('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex( todo => {
    return todo.id === id;
  });

  if (index < 0 || index >= todos.length) {
    return res.status(400).json({
      "message": `invalid id ${id} type ${typeof(id)} at index ${index}`
    });
  }

  let todo = todos[index]
  todos.splice(index, 1)

  res.json(todos);
});

// Archive All
app.delete('/todos', function(req, res) {
  var ary = []
  todos.forEach( (todo, index) => {
    if (todo.status === 'archived') {
      ary.push(index)
    }
  })

  ary.forEach( val => todos.splice(val, 1) )

  res.json(todos);
});

// Toggle Todo ('active' or 'complete')
app.put('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex( todo => {
    return todo.id === id;
  });

  if (index < 0 || index >= todos.length) {
    return res.status(400).json({
      "message": `invalid id ${id} type ${typeof(id)} at index ${index}`
    });
  }

  todos[index].status = (todos[index].status === 'active' ? 'completed' : 'active');

  res.json(todos);
});

// Complete All
app.put('/todos', function(req, res) {
  todos.forEach( todo => {
    if (todo.status === 'active') {
      todo.status = 'completed';
    }
  })

  res.json(todos);
});

// Archive Todo
app.patch('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex( todo => {
    return todo.id === id;
  });

  if (index < 0 || index >= todos.length) {
    return res.status(400).json({
      "message": `invalid id ${id} type ${typeof(id)} at index ${index}`
    });
  }

  if (todos[index].status === 'completed') {
    todos[index].status = 'archived';
  }

  res.json(todos);
});

// Archive All
app.patch('/todos', function(req, res) {
  todos.forEach( todo => {
    if (todo.status === 'completed') {
      todo.status = 'archived';
    }
  })

  res.json(todos);
});

// Node server.
var port = 3000;
var server = app.listen(port, function() {
  console.log('SERVER STARTED LISTENING ON PORT ' + port);
});

// Dev server.
var devServer = require('../../tools/development-server');
var devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});

// App-Building Todos
newTodo('archiving test', 'archived')
newTodo('fix rendering on pageload', 'completed')
newTodo('implement server-side delete', 'completed')
newTodo('implement server-side put', 'completed')
newTodo('implement front end delete', 'completed')
newTodo('create a consistent method for tracking unique ids for todos so that there is no redundancy', 'completed')
newTodo('implement front end put', 'completed')
newTodo('make updates in front end state consistent with server updates', 'completed')
newTodo('add checkbox', 'completed')
newTodo('build front end logic for checkbox to update todo status', 'completed')
newTodo('build front end logic for checkbox to track todo status and default correctly', 'completed')
newTodo('add archive button', 'completed')
newTodo('implement archive front end logic', 'completed')
newTodo('implement archive server-side logic', 'completed')
newTodo('create style for archived todos', 'completed')
newTodo('implement routing system for filters', 'completed')
newTodo('modify server responses to include GET \'/(:filter)\'', 'completed')
newTodo('refactor filtering logic so that filter comes from \'/(:filter)\' instead updating in state', 'completed')
newTodo('create placeholder for when there are no active todos', 'completed')
newTodo('create placeholder for when there are no todos', 'completed')
newTodo('implement \'loaded\' boolean in state so that placeholder text does not show up before todos are loaded', 'completed')
newTodo('style front end', 'completed')
newTodo('implemented \'Archive All Completed\' button', 'completed')
newTodo('added task counter', 'completed')
newTodo('added \'Complete All\' button', 'completed')
newTodo('find solution for awkward behavior when todo is added while filter is not \'active\' or \'all\'')
