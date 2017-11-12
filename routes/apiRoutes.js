import Passport from 'passport'
import getUsers from '../middlewares/getUsers'
import getUser from '../middlewares/getUser'
import handleListUser from './handlers/handleListUser'
import handleSignupUser from './handlers/handleSignupUser'
import handlePushAndUpdateUser from './handlers/handlePushAndUpdateUser'
import { extraceUserData } from '../lib'


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
  }
]