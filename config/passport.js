var LocalStrategy   = require('passport-local').Strategy
var data            = require('../data')

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })


  passport.deserializeUser(function(id, done) {
    data.users.findById(id, function(err, user) {
      done(err, user);
    })
  })


  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'accessToken'
  },
  function(username, accessToken, cb) {
      data.users.findByUsername(username, function(err, user) {
        if (err) { return cb(err) }
        if (user) {
          return cb(null, false, req.flash('signupMessage', 'That username is already taken.'))
        }
        data.users.addRecord({username, accessToken}, function(err, user) {
          return cb(null, user)
        })
      })
    }
  ))
}