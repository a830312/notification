var moment = require('moment')
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
      let numOfNotificationsPushed = user.numOfNotificationsPushed + 1
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

const addRecord = function({username, accessToken}, cb) {
  process.nextTick(function() {
    let record = {
      id: records.length,
      username,
      accessToken,
      creationTime: moment().format('YYYY-MM-DDTkk:mm:ss'),
      numOfNotificationsPushed: 0
    }
    records.push(record)
    cb(null, record)
  })
}

exports.findById = findById
exports.getUsers = getUsers
exports.updateUser = updateUser
exports.findByUsername = findByUsername
exports.addRecord = addRecord