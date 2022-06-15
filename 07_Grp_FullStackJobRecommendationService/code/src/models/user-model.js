const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type :String,
        trim : true,
        lowercase :true,
    },
    username:{ type:String , trim: true, required: true},
    address:{ type:String},
    contact1:{ type:String},
    contact2:{ type:String},
    type:{type:String},
    jobTypes: [{
        type:String,
        required:true
    }],
    googleID : { type:String , required:true},
    thumbnail : String
});

userSchema.methods.toJSON = function () {
    const user =this
    const userObj=user.toObject()
    delete userObj.password
    return userObj
}


const User = mongoose.model('user',userSchema);

module.exports = User;