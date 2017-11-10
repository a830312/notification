import Passport from 'passport'
import request from 'superagent'
import getUsers from './middlewares/getUsers'
import getUser from './middlewares/getUser'
import data from './data'

export default [
  {
    method: 'post',
    path: '/signup',
    middleware: Passport.authenticate('local-signup'),
    callback: (req, res) => {
      let user = req.user || {}
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
          .post('https://api.pushbullet.com/v2/pushes')
          .send({
            'body': 'Space Elevator, Mars Hyperloop, Space Model S (Model Space?)',
            'title': 'Space Travel Ideas',
            'type': 'note'
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
                res.json(updatedUser)
              })
            }
          })
      }
    }
  }
]