const mongoose = require('mongoose')

const submissionschema = mongoose.Schema({
  studentid : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  assignmentid : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Assignment'
  },
  fileurl : {
    type : String
  },
  marks : {
    type : Number,
    default : -1
  },
},{collection : 'Submission'})

module.exports = mongoose.model('Submission', submissionschema)