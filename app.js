(function() {

  'use strict';

  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const bookModule = require('./book');

  app.use(bodyParser.json());

  app.locals.bookArray = [];

  app.get('/book', function (req, res) {
    bookModule.getBookList(app.locals.bookArray, 0, (list)=>{
      res.json({books: list});
    });
  })

  app.post('/book', function (req, res) {
    const newBook = req.body.book;
    const books = app.locals.bookArray;

    if (newBook) {
      const bookAlreadyExists = bookModule.hasBook(books, newBook);

      if (bookAlreadyExists) {
        res.status(422).json({error: 'Book already exists'});
      }
      else {
        books.push(newBook);
        res.json({book: newBook});
      }
    }
    else {
      res.status(422).json({error: 'Missing parameter book'});
    }
  })

  app.delete('/book', function (req, res) {
    const books = app.locals.bookArray;
    const bookIndex = books.indexOf(req.body.book);

    if (bookIndex < 0) {
      res.status(422).json({error: 'Book does not exist'});
    }
    else {
      books.splice(bookIndex, 1);
      res.status(200).end();
    }
  })

  app.patch('/book', function (req, res) {
    const books = app.locals.bookArray;
    const bookName = req.body.original_book;
    const newBook = req.body.new_book;

    const bookIndex = books.indexOf(bookName);

    if (bookIndex < 0) {
      res.status(422).json({error: 'Book does not exist'});
    }
    else {
      const newBookExists = bookModule.hasBook(books, newBook);

      if (newBookExists) {
        res.status(422).json({error: 'New Book already exists'});
      }
      else {
        bookModule.updateBook(books, bookIndex, newBook);
        res.json({original_book: bookName, new_book: newBook});
      }
    }
  })

  app.put('/book', function (req, res) {
    const books = app.locals.bookArray;
    const initialTime = new Date();

    bookModule.saveBooks(books, initialTime, (err, results)=>{
      if (err) {
        console.log(err);
        res.status(500).json({error: 'Some unexpected error ocurred'});
      }
      else {
        res.json({books: results});
      }
    });
  })

  var port = process.env.PORT || 3000;

  app.listen(port, function () {
    console.log('Olivia app listening on port 3000!')
  })

  module.exports = app;

}());
