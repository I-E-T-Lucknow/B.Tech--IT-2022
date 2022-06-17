const mongoose = require('mongoose')

const chapterschema = mongoose.Schema({
  index : {
    type : Number
  },
  resources : [{
    name :{
      type : String
    },
    file : {
      type : String
    }
  }]
},{collection : 'Chapter'})

module.exports = mongoose.model('Chapter',chapterschema)