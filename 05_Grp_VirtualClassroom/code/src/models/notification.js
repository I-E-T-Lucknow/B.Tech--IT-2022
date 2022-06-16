const mongoose = require('mongoose')

const notificationschema = mongoose.Schema({
  content : {
    type : String,
    required : true
  },
  link : {
    type : String
  }
},{collection : 'Notification'})

module.exports = mongoose.model('Notification',notificationschema)