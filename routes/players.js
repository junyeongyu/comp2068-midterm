"use strict";
var express = require('express');
var router = express.Router();

// link to the book model for CRUD operations
let Book = require('../models/book')

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('books');
	book = Book.find().exec();
	console.log('second')
	// use mongoose model to query mongodb for all books
	Book.find(function(err, books) {
		console.log('find');
		if (err) {
			console.log(err);
			res.end(err);
			return;
		}
		
		// no error so send the books to the index view
		res.render('books/index', {
			books: books
		});
	}).exec().then(function (err, books) {
		console.log(err);
		console.log(books);
	}).error(function(err) {
		console.log(err);
	});

});

// GET /books/add - show blacnk add form
router.get('/add', function (req, res, next) {
	// show the add form
	res.render('books/add');
});

// POST /books/add - save the new book
router.post('/add', function (req, res, next) {
	// use Mongoose to populate a new Book
	Book.create({
		title: req.body.title,
		author: req.body.author,
		price: req.body.price,
		year: req.body.year
	}, function (err, book) {
		if (err) {
			console.log(err);
			res.render('error');
			return;
		}
		res.redirect('/books');
	});
});

// GET /books/delete/_id - delete and refresh the index view
router.get('/delete/:_id', function (req, res, next) {
	// get the id parameter from the end of the url
	let _id = req.params._id;
	
	// use Mongoose to delete
	Book.remove({_id: _id}, function (err) {
		if (err) {
			console.log(err);
			res.render('error');
			return;
		}
		res.redirect('/books');
	})
	
});

// GET /books/_id - show edit page and pass it the selected book
router.get('/:id', function(req, res, next) {
	// Grap id from url
	let _id = req.param._id;
	Book.findById(_id, function(err, book) {
		if (err) {
			console.log(err);
			res.render('error');
			return;
		}
		res.render('books/edit', book);
	});
});

// POST /books/_id - save the updated book
router.post('/:id', function(req, res, next) {
	// grab id from url
	let _id = req.params._id;
	
	// populate new book from the form
	var book = new Book({
		_id: id,
		title: req.body.title,
		author: req.body.author,
		price: req.body.price,
		year: req.body.year
	});
	Book.update({_id: _id}, book, function (err) {
		if (err) {
			console.log(err);
			res.render('error');
			return;
		}
		res.redirect('/books');
	});
});


module.exports = router;