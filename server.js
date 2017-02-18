var express = require('express');
var app = express();
var Users = require('./app/models/users.js');
var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/exercise/new-user', function(req, res) {
  var username = req.body.username;
  console.log('Make new user: ' + req.body.);
  if (!username) {
    res.json({
      'error': 'Username is invalid'
    });
    return;
  }
  var newUser = new Users({
    name: username
  });
  newUser.save(function(err, createdUser) {
    if (err) {
      res.json({
        'error': 'Username invalid or already taken.'
      })
      return console.error(err);
    }
    res.json({
      'username': username 'id': createdUser._id
    });
  });
});

app.post('/api/exercise/add', function(req, res) {
  var id = req.body.id;
  var description = req.body.description;
  var duration = req.body.duration;
  var date = new Date(req.body.date) || new Date();
  
  var query = {
    '_id': id
  };
  
  var update = {
    $push: {
      'Exercises': {
        description: description,
        duration: duration,
        date: date,
      }
    }
  };

  Users.findOneAndUpdate(query, update, function(err, doc) {
    if (err) throw err;
    req.json(doc);
  });
});

app.listen(PORT, function(req, res) {
  console.log('listening on port ', PORT);
});
