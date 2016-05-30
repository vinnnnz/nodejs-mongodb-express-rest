var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bookSchema = new schema({
	name : String
});

module.exports = mongoose.model('Book', bookSchema);
