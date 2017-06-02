var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var todos = [];
var id = 1

function newTodo(text, status = 'active') {
  let todo = {"id": id++, "text": text, "status": status}
  todos.push(todo)
  return todo
}

newTodo('fix rendering on pageload', 'complete')
newTodo('implement server-side delete', 'complete')
newTodo('implement server-side put', 'complete')
newTodo('implement front end delete', 'complete')
newTodo('implement front end put')
newTodo('implement archive')
newTodo('create a consistent method for tracking unique ids for todos so that there is no redundancy', 'complete')
newTodo('make updates in front end state consistent with server updates')


app.get('/', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  if (index < 0 || index >= todos.length) {
    return res.status(400).json({"message": `invalid id ${id} type ${typeof(id)} at index ${index}`});
  }

  res.json(todos[index]);
});

app.post('/todos', function(req, res) {
  var text = req.body.data.text;
  if (!text) {
    return res.status(400).json({"message": "text is required"});
  }

  newTodo(text);

  res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex( todo => {
    return todo.id === id;
  });

  if (index < 0 || index >= todos.length) {
    return res.status(400).json({"message": `invalid id ${id} type ${typeof(id)} at index ${index}`});
  }

  todos.splice(index, 1)

  res.json(todos);
});

app.put('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex( todo => {
    return todo.id === id;
  });

  if (index < 0 || index >= todos.length) {
    return res.status(400).json({"message": `invalid id ${id} type ${typeof(id)} at index ${index}`});
  }

  todos[index].status = (todos[index].status === 'active' ? 'complete' : 'active');

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
