import data from '../data'

const getUser = function (req, res, next) {
  let username = req.body.username
  data.users.findByUsername(username, function(err, user) {
    req.user = user
    next()
  })
}

export default getUser