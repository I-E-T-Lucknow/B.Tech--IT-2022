const mongoose = require('mongoose')
const validator =require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userschema = mongoose.Schema({
  mailverified : {
    type: Boolean,
    default : false
  },
  category : {
    type : String,
    default : 'student',
    required : true
  },
  name : {
     type : String,
     trim : true,
     required : true
  },
  email : {
    type : String,
    type:String,
		required:true,
		unique:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email not valid')
			}
		}
  },
  password : {
    type:String,
		required:true,
		trim:true,
		validate(value){
			if(value.length<6){
				throw new Error()
			}
		}
  },
  image : {
    type : String
  },
  electives : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Subject'
    }
  ],
  reminders : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Reminder'
    }
  ],
  branchsem : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Branchsem"
  },
  attendance : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Attendance'
    }
  ],
  notifications : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Notification'
    }
  ],
  tokens:[{
		token:{
			type:String,
			required:true
		}
  }],
  isadmin : Boolean
},{collection : 'User'})

userschema.methods.generatingauthtoken=async function(){
	const user=this
	const token=jwt.sign({_id:user._id.toString()},'thisismyjwtsecret2')
	user.tokens=user.tokens.concat({token})
    await user.save()
	return token
}

userschema.pre('save',async function(next){
	const user=this
	if(user.isModified('password')){
		user.password=await bcrypt.hash(user.password,8)
	}
	next()
})

module.exports = mongoose.model("User",userschema);