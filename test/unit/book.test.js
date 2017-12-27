const chai = require('chai');
const should = chai.should();

const bookModule = require('../../book');

describe('Unit - book - getBookList', () => {
  it('should return an empty string', (done) => {
    bookModule.getBookList([], 0, (result)=>{
      result.should.equal('');
      done();
    });
  });

  it('should return a comma separatade string', (done) => {
    bookModule.getBookList(['a', 'b', 'c'], 0, (result)=>{
      result.should.equal('a, b, c, e');
      done();
    });
  });
});

describe('Unit - book - hasBook', () => {
  it('should return false if book doesnt exist', (done) => {
    const hasBook = bookModule.hasBook(['a','b'], 'c');
    should.not.exist(hasBook);
    done()
  });

  it('should the name if book exist', (done) => {
    const hasBook = bookModule.hasBook(['a','b'], 'b');
    hasBook.should.equal('b');
    done()
  });
});

describe('Unit - book - updateBook', () => {
  it('should return the new name in same index', (done) => {
    let books = ['a', 'b', 'c'];
    bookModule.updateBook(books, 1, 'd');
    books.should.have.lengthOf(3);
    books[0].should.equal('a');
    books[1].should.equal('d');
    books[2].should.equal('c');
    done()
  });
});

describe('Unit - book - getRandomInt', () => {
  it('should return an integer', (done) => {
    const newInt = bookModule.getRandomInt();
    Number.isInteger(newInt).should.be.true;
    done()
  });
});
