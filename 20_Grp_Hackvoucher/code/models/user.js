const mongoose = require('mongoose') ;

const UserSchema = new mongoose.Schema({
    name :{
        type : String ,
        required : true ,
        unique : true
    },
    email : {
        type : String,
        required : true 
    },
    password : {
        type : String , 
        required : true 
    },
    coupen_hosted : {
        type : Number,
        default : 0
    },
    coupen_buyed : {
        type : Number,
        default : 0
    },
    coins : {
        type : Number,
        default : 1000
    },
    COUPONS : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'coupon'
        }
    ],
    is_profile_pic_uploaded : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    userInterest : [
        {
            type : String
        }
    ]
}) ;
const User = mongoose.model('User' , UserSchema) ;
module.exports = User ;