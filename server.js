const express = require('express')
const next = require('next')
const Passport = require( 'passport' )
const LocalStrategy = require( 'passport-local' ).Strategy
const Express = require( 'express' )
const BodyParser = require( 'body-parser' )
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const getUsers = require('./middlewares/getUsers')
const getUser = require('./middlewares/getUser')
const request = require('superagent')
const updateUser = require('./data/users').updateUser

app.prepare()
.then(() => {
  const server = express()
  server.use( BodyParser.urlencoded( { extended: false } ) )
  server.use( BodyParser.json() )
  server.use( Passport.initialize() )

  require('./config/passport')(Passport)
   
  server.post(
    '/signup',
    Passport.authenticate('local-signup'),
    function(req, res) {
      let user = req.user || {}
      res.json({ user })
    }
  )

  server.get(
    '/users',
    getUsers,
    function(req, res) {
      let users = req.users || []
      res.json({ users })
    }
  )

  server.post(
    '/pushes',
    getUser,
    function(req, res) {
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
              updateUser(username, (error, updatedUser) => {
                res.json(updatedUser)
              })
            }
          })
      }
      
    }
  )

  server.get('/a', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
