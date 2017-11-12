import { extraceUserData } from '../../lib'
import { CREATE_NOTIFICATION } from '../../config/pushbullet'
import data from '../../data'
import request from 'superagent'


const handlePushAndUpdateUser = (req, res) => {
  let user = req.user || {},
  { title, body, type } = req.body,
  { accessToken, username } = user,
  status = 403

  if (!accessToken) {
    res.status(status).json({
      error: {
        message: 'Forbidden: no match user found',
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
            let data = extraceUserData(updatedUser)
            res.json(data)
          })
        }
      })
  }
}

export default handlePushAndUpdateUser