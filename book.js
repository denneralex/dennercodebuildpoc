(function (bookModule) {

  'use strict';

  const async = require('async');
  const fs = require('fs');

  bookModule.getBookList = function(list, index, next, names = '') {
    const item = list[index];

    if (list.length > 0) {
      if (index === list.length - 1) {
        return next(`${names}${item}`);
      }

      names = `${names}${item}, `;

      return bookModule.getBookList(list, index+1, next, names);
    }
    else {
      next('');
    }
  };

  bookModule.hasBook = function(list, name) {
    return list.find(item=>item === name);
  }

  bookModule.updateBook = function(books, bookIndex, newBook) {
    books.splice(bookIndex, 0, newBook);
    books.splice(bookIndex + 1, 1);
  }

  bookModule.saveBooks = function(books, initialTime, next) {
    async.reduce(books, {},
      (memo, item, cb) => {
        bookModule.saveItemOnDatabase(item, (err)=>{
          memo[item] = new Date() - initialTime;
          cb(err, memo);
        })
      }, next
    );
  }

  bookModule.saveItemOnDatabase = function(name,callback) {
    const randomNumber = bookModule.getRandomInt();
    const fileName = `temp/${name}-${randomNumber}.txt`;
    fs.writeFile(fileName, 'name', callback);
  }

  bookModule.getRandomInt = function(min = 0, max = 100) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

})(module.exports);
