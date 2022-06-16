const mongoose = require('mongoose')
const submission = require('./submission')

const assignmentschema = mongoose.Schema({
  desc : {
    type : String
  },
  totalmarks : {
    type : Number
  },
  duedate : {
    type : Date
  },
  fileurl : {
    type : String
  },
  submissions : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Submission'
  }]
},{collection : 'Assignment'})

module.exports = mongoose.model('Assignment',assignmentschema)