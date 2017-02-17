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
  if (!username) {
    res.json({
      'error': 'Username is invalid'
    });
  }
  var newUser = new User({
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
      'username': username
    });
  });
})

app.listen(PORT, function(req, res) {
  console.log('listening on port ', PORT);
});
