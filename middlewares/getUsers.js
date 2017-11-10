var data = require('../data')


const getUsers = function (req, res, next) {
  data.users.getUsers(function(users) {
    req.users = users
    next()
  })
}

module.exports = getUsers