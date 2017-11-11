import moment from 'moment'
var records = []


const getUsers = function(cb) {
  process.nextTick(function() {
    cb(records)
  })
}

const findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'))
    }
  })
}

const updateUser = function(username, cb) {
  process.nextTick(function() {
    findByUsername(username, function(err, user) {
      let numOfNotificationsPushed = user.numOfNotificationsPushed + 1,
          idx = user.id,
          newRecord = Object.assign({}, user, { numOfNotificationsPushed })
      records[idx] = newRecord
      cb(null, newRecord)
    })
  })
}

const findByUsername = function(username, cb) {
  process.nextTick(function() {
    let record = records.filter((record, i) => record.username === username)
    cb(null, record[0] || null)
  })
}

const addUser = function({username, accesstoken}, cb) {
  process.nextTick(function() {
    let user = {
      id: records.length,
      username,
      accessToken: accesstoken,
      creationTime: moment().format('YYYY-MM-DDTkk:mm:ss'),
      numOfNotificationsPushed: 0
    }
    records.push(user)
    cb(null, user)
  })
}

export default { findById, getUsers, updateUser, findByUsername, addUser }