var shortid = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: [100, 'Usernames must be less than or equal to 100 characters.']
    },
    _id: {
        type: String,
        default: shortid.generate(),
        index: true
    }
});

module.exports = mongoose.model('User', User);
