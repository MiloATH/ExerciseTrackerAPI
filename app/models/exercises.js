var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Exercise = new Schema({
    userId: String,
    description: String,
    duration: Number,
    date: Date,
});

module.exports = mongoose.model('Exercise', Exercise);
