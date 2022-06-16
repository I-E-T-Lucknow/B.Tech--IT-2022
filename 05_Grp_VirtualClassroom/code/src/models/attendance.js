const mongoose = require('mongoose')

const attendanceschema = mongoose.Schema({
  attended : {
    type : Number
  },
  subjectid : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Subject'
  }
},{collection : 'Attendance'})

module.exports = mongoose.model('Attendance' , attendanceschema)