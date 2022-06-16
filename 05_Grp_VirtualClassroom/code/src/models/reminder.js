const mongoose  = require('mongoose')

const reminderschema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  content : {
    type : String,
    required : true
  },
  link : {
    type : String
  },
  timing : {
    type : mongoose.Schema.Types.Date,
    required : true
  }
},{collection: 'Reminder'})

module.exports = mongoose.model('Reminder',reminderschema)