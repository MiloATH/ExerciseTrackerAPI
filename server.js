var express = require('express');
var app = express();
var Users = require('./app/models/users.js');
var Exercises = require('./app/models/exercises.js');
var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise');

app.use(express.static('views'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/exercise/new-user', function(req, res) {
  var username = req.body.username;
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
      throw err;
    }
    res.json({
      'username': username,
      'id': createdUser._id
    });
  });
});

app.post('/api/exercise/add', function(req, res) {
  var userId = req.body.userId;
  var description = req.body.description;
  var duration = req.body.duration;
  var date = new Date(req.body.date || Date.now());

  var newExercise = new Exercises({
    userId: userId,
    description: description,
    duration: duration,
    date: date,
  });
  newExercise.save(function(err, createdExercise) {
    if (err) {
      res.json({
        'error': 'Username invalid or already taken.'
      })
      throw err;
    }
    res.json(createdExercise);
  });
});


app.get('/api/exercise/log', function(req, res) {
  var id = req.query.userId;
  var to = new Date(req.query.to);
  var from = new Date(req.query.from);
  var limit = req.query.limit;
  if (!id) {
    res.json({
      'error': 'Invalid id'
    });
    return;
  }

  //Find userId

  var find = {
    userId: id,
    date: {
      $lt: to == 'Invalid Date' ? Date.now() : to.getTime(),
      $gt: from == 'Invalid Date' ? 0 : from.getTime()
    }
  };

  var callback = function(err, result) {
    if (err) {
      throw err;
      res.json({
        'error': 'Could not find any.'
      });
    }
    else {
      res.json(result);
    }
  };

  if (limit) {
    Exercises.find(find).limit(limit).sort('-date').exec(callback);
  }
  else {
    Exercises.find(find).sort('-date').exec(callback);
  }

})

app.listen(PORT, function(req, res) {
  console.log('listening on port ', PORT);
});
