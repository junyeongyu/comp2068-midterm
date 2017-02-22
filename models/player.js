"use strict";
let mongoose = require('mongoose');

// create book schema (class)
var bookSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: 'First name is requried'
	},
	lastName: {
		type: String,
		required: 'Last name is required'
	},
	number: {
		type: Number,
		required: 'Number is required',
		min: 0
	}
});

// make it public
module.exports = mongoose.model('Player', bookSchema);