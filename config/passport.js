import { Strategy as LocalStrategy } from 'passport-local'
import data from '../data'

export default function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })


  passport.deserializeUser(function(id, done) {
    data.users.findById(id, function(err, user) {
      console.log('deserializeUser', err, user)
      done(err, user)
    })
  })


  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'accesstoken'
  },
  function(username, accesstoken, cb) {
    data.users.findByUsername(username, function(err, user) {
      console.log('local-signup', err, user)
      if (err) {
        return cb(err)
      }
      if (user) {
        return cb(null, user, { message: 'User Already Exists' })
      }
      data.users.addUser({username, accesstoken}, function(err, user) {
        return cb(null, user, { message: `${username} has been registered` })
      })
    }) 
  }))
}