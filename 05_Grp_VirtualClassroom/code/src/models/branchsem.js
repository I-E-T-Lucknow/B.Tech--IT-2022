const mongoose = require('mongoose') 

const branchsemschema = mongoose.Schema({
  branch : {
    type : String,
    required : true
  },
  sem : {
    type : Number,
    required : true
  },
  subjects : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Subject'
    }
  ],
  timetable : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timetable',
  },
  students : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    }
  ]
},{collection : 'Branchsem'})

module.exports = mongoose.model('Branchsem',branchsemschema)