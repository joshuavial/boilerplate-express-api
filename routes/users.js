var express = require('express')
var router = express.Router()

var db = require('../db')

router.get ('/', function (req, res) {
  db.getUsers(req.app.get('knex'))
    .then(function (users) {
      res.json({users})
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/', (req, res) => {
  let {name, email} = req.body
  req.app.get('knex')('users')
    .insert({name, email})
    .then((result) => {
      res.status(201).send()
    })
})

module.exports = router
