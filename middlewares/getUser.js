var data = require('../data')


const getUser = function (req, res, next) {
  let username = req.body.username
  data.users.findByUsername(username, function(err, user) {
    console.log('user', user)
    req.user = user
    next()
  })
}

module.exports = getUser