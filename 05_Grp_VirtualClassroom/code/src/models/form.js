const mongoose = require('mongoose')

const formschema = new mongoose.Schema({
  title :{
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
  category : {
    type : String,
    required : true
  }
},{collection:'Form'})

module.exports = mongoose.model('Form', formschema)