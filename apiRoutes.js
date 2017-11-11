import Passport from 'passport'
import request from 'superagent'
import getUsers from './middlewares/getUsers'
import getUser from './middlewares/getUser'
import data from './data'
import { CREATE_NOTIFICATION } from './config/pushbullet'

export default [
  {
    method: 'post',
    path: '/signup',
    middleware: Passport.authenticate('local-signup'),
    callback: (req, res) => {
      let user = req.user || {}
      // console.log('post /signup', req.isAuthenticated())
      res.json({ user })
    }
  },
  {
    method: 'get',
    path: '/users',
    middleware: getUsers,
    callback: (req, res) => {
      let users = req.users || []
      res.json({ users })
    }
  },
  {
    method: 'post',
    path: '/pushes',
    middleware: getUser,
    callback: (req, res) => {
      let user = req.user || {},
      { title, body, type } = req.body,
      { accessToken, username } = user,
      status = 403

      if (!accessToken) {
        res.status(status).json({
          error: {
            message: 'no match user found',
            status: status
          }
        })
      } else {
        request
          .post(CREATE_NOTIFICATION)
          .send({
            body,
            title,
            type
          })
          .set('Content-Type', 'application/json')
          .set('Access-Token', accessToken)
          .end(function(err, result){
            if (err || !result.ok) {
              let status = 500
              res.status(status).json({
                error: {
                  message: 'internal server error',
                  status: status
                }
              })
            } else {
              data.users.updateUser(username, (error, updatedUser) => {
                res.json({ user: updatedUser })
              })
            }
          })
      }
    }
  }
]