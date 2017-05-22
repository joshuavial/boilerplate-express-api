// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')
var request = require('supertest')

var app = require('../../server')
var setupDb = require('../setup-db')

setupDb(test, function (db) {
  app.set('knex', db)
})

test.cb('getUsers gets all users', function (t) {
  var expected = 26
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err
      t.is(res.body.users.length, expected)
      t.end()
    })
})

test.cb('postUser saves a user', (t) => {
  request(app)
    .post('/users')
    .send({name: 'ada'})
    .expect(201)
    .end((err, res) => {
      if (err) throw err
      return t.context.db('users').select().then((result) => {
        t.is(result.length, 27)
        t.is(result[26].name, 'ada')
        t.end()
      })
    })
})
