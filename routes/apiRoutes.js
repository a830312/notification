import Passport from 'passport'
import getUsers from '../middlewares/getUsers'
import getUser from '../middlewares/getUser'
import handleListUser from './handlers/handleListUser'
import handleSignupUser from './handlers/handleSignupUser'
import handlePushAndUpdateUser from './handlers/handlePushAndUpdateUser'
import handleLoginUser from './handlers/handleLoginUser'
import handleLogoutUser from './handlers/handleLogoutUser'

const defaultMiddleware = (req, res, next) => { next() }

export default [
  {
    method: 'post',
    path: '/signup',
    middleware: Passport.authenticate('local-signup', {
      failureMessage: true,
      successMessage: true
    }),
    callback: handleSignupUser
  },
  {
    method: 'get',
    path: '/list-users',
    middleware: getUsers,
    callback: handleListUser
  },
  {
    method: 'post',
    path: '/pushes',
    middleware: getUser,
    callback: handlePushAndUpdateUser
  },
  {
    method: 'post',
    path: '/login',
    middleware: Passport.authenticate('login', {
      failureMessage: true,
      successMessage: true
    }),
    callback: handleLoginUser
  },
  {
    method: 'get',
    path: '/logout',
    middleware: defaultMiddleware,
    callback: handleLogoutUser
  }
]