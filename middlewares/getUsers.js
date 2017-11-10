import data from '../data'

const getUsers = function (req, res, next) {
  data.users.getUsers(function(users) {
    req.users = users
    next()
  })
}

export default getUsers