const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../app');

describe('Integration - routes : book', () => {

  beforeEach((done) => {
    server.locals.bookArray = [];
    done();
  });

  afterEach((done) => { done(); });

  describe('GET /book', () => {
    it('should return empty string', (done) => {
      chai.request(server)
      .get('/book')
      .end((err, res) => {
        res.body.books.should.equal("");
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        done();
      });
    });

    it('should return books string', (done) => {
      server.locals.bookArray = ['a', 'b'];

      chai.request(server)
      .get('/book')
      .end((err, res) => {
        res.body.books.should.equal("a, b");
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        done();
      });
    });
  });

  describe('POST /book', () => {
    it('should return error if book already exist', (done) => {
      server.locals.bookArray = ['a', 'b'];

      chai.request(server)
      .post('/book')
      .send({book: 'a'})
      .end((err, res) => {
        res.body.should.include.keys('error');
        res.status.should.eql(422);
        res.type.should.eql('application/json');
        done();
      });
    });

    it('should return success if book doesnt exist', (done) => {
      server.locals.bookArray = ['a', 'b'];

      chai.request(server)
      .post('/book')
      .send({book: 'c'})
      .end((err, res) => {
        res.body.should.include.keys('book');
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        done();
      });
    });
  });

  describe('DELETE /book', () => {
    it('should return error if book doesnt exist', (done) => {
      server.locals.bookArray = ['a', 'b'];

      chai.request(server)
      .delete('/book')
      .send({book: 'c'})
      .end((err, res) => {
        res.body.should.include.keys('error');
        res.status.should.eql(422);
        res.type.should.eql('application/json');
        done();
      });
    });

    it('should return success if book exists', (done) => {
      server.locals.bookArray = ['a', 'b'];

      chai.request(server)
      .delete('/book')
      .send({book: 'b'})
      .end((err, res) => {
        res.status.should.eql(200);
        server.locals.bookArray.length.should.equal(1);
        done();
      });
    });
  });

  describe('PATCH /book', () => {
    it('should return error if book doesnt exist', (done) => {
      server.locals.bookArray = ['a', 'b'];

      chai.request(server)
      .patch('/book')
      .send({original_book: 'c', new_book: 'd'})
      .end((err, res) => {
        res.body.should.include.keys('error');
        res.status.should.eql(422);
        res.type.should.eql('application/json');
        done();
      });
    });

    it('should return error if new book already exist', (done) => {
      server.locals.bookArray = ['a', 'b'];

      chai.request(server)
      .patch('/book')
      .send({original_book: 'b', new_book: 'a'})
      .end((err, res) => {
        res.body.should.include.keys('error');
        res.status.should.eql(422);
        res.type.should.eql('application/json');
        done();
      });
    });

    it('should return success', (done) => {
      server.locals.bookArray = ['a', 'b'];

      chai.request(server)
      .patch('/book')
      .send({original_book: 'b', new_book: 'd'})
      .end((err, res) => {
        res.body.should.include.keys('original_book');
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        server.locals.bookArray.length.should.equal(2);
        done();
      });
    });
  });

  describe('PUT /book', () => {
    it('should return success', (done) => {
      server.locals.bookArray = ['a', 'b', 'c'];

      chai.request(server)
      .put('/book')
      .end((err, res) => {
        res.body.should.include.keys('books');
        res.body.books.should.include.keys('a', 'b', 'c');
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        done();
      });
    });
  });
});
