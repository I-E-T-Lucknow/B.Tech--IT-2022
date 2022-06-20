const mongoose = require('mongoose') ;
const User = require('../models/user')

const couponSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    store :{
        type : String,
        required : true 
    },
    description : {
        type : String,
        required : true
    },
    cardLimit : {
        type : Number,
        required : true 
    },
    couponCode : {
        type : String,
        required : true 
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    isPurchaged : {
        type : Boolean ,
        default : false
    },
    isFiltered : {
        type : Boolean,
        required : true 
    }, 
    isVerified : {
        type : Boolean,
        default : false
    }
})

const coupon = mongoose.model('coupon' , couponSchema) ;
module.exports = coupon ;