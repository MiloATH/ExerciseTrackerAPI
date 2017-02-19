var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    Exercises: [{
        description: String,
        duration: Number,
        date: Date,
    }]
});

module.exports = mongoose.model('User', User);
