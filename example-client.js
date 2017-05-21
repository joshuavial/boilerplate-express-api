var request = require('superagent')

request
  .get('http://localhost:3000/users')
  .end((err, res)  => {
    console.log(res.body)
  })
