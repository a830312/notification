import { Strategy as LocalStrategy } from 'passport-local'
import data from '../data'

export default function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })


  passport.deserializeUser(function(id, done) {
    data.users.findById(id, function(err, user) {
      done(err, user)
    })
  })


  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'accesstoken'
  },
  function(username, accesstoken, cb) {
    data.users.findByUsername(username, function(err, user) {
      if (err) {
        return cb(err)
      }

      if (user && accesstoken === user.accessToken) {
        return cb(null, user, { message: 'User Already Exists' })
      }

      data.users.addUser({username, accesstoken}, function(err, user) {
        return cb(null, user, { message: `${username} has been registered` })
      })
    }) 
  }))

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'accesstoken'
  },
  function (username, accesstoken, done) {
    data.users.findByUsername( username, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: 'Please Register first' })
      }
      if (accesstoken !== user.accessToken) {
        return done(null, false, { message: 'wrong username or accesstoken' })
      }
      return done(null, user)
    })
  }))
}