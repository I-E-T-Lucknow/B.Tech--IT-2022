const mongoose = require('mongoose')

const subjectschema = mongoose.Schema({
  elective : {
    type : Boolean,
    default : false
  },
  name : {
    type: String,
    required : true
  },
  assignments : [
      {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Assignment'
    }
  ],
  chapters : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Chapter'
  }],
  facultyid : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
},{collection : 'Subject'})

module.exports = mongoose.model('Subject', subjectschema)