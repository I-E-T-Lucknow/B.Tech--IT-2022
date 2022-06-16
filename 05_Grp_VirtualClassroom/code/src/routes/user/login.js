const express = require("express");
const router = express.Router();
const crypto=require('crypto');
var formidable = require('formidable');
const path = require("path");
const multer = require("multer");
const User = require("../../models/user.js");
const notification = require('../../models/notification.js');
const branchsems = require('../../models/branchsem');
const auth=require('../../auth/auth.js')
const {mailverification,resetpassword} = require("../../email/mailverification.js");
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken');
const user = require("../../models/user.js");
const bodyParser= require("body-parser")
const alert = require('alert')
// const jsalert = require('js-alert')

// const browserify = require('browserify')
// var popups = require('popups')
//const fs = require('fs-extra')
fs = require('fs-extra')
var ObjectId = require('mongodb').ObjectID;
router.use(bodyParser.urlencoded({extended: true}))

const storage=multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null,path.join(__dirname ,'./../../../','/public/uploads')) 
}, 
  filename:(req,file,cb)=>{
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({
  storage:storage
});

router.get("/signup",async(req,res)=>{
  var msg = req.flash('info')
	res.render("signup.ejs",{message : msg })
});

router.get('/signin',async(req,res)=>{
  var msg = req.flash('info')
  res.render('login.ejs',{ message : msg })
});

router.get('/reset-password',async(req,res)=>{
  var msg = req.flash('info')
  res.render('reset.ejs',{message : msg })
})

//<------------>TO LOGOUT THE USER<---------------->
router.get('/logout',auth,async(req,res)=>{
	try{
		req.user.tokens=req.user.tokens.filter((token)=>{
			return req.token!==token.token
		})
		await req.user.save()
		res.redirect('/')
	}catch(e){
		res.redirect('/')
	}
})


// verify email id
router.get("/mailverification", async (req, res) => {
	try {
	  const token = req.query.token;
	  const decode = jwt.verify(token, "thisismyjwtsecret");
  
	  var message = null,
		error = null;
	  if (decode.type !== "mailverification") error = "Wrong token";
  
	  const user = await User.findById({ _id: decode._id });
	  if (!user) error = "Invalid user";
  
	  if (error === null) {
		user.mailverified = true;
		await user.save();
		message = "Mail verified";
	  }
	  res.redirect("/user/signin");

	} catch (e) {
		res.redirect("/user/signup");
	}
  });

  router.post("/signup",upload.single("file"),async(req,res)=>{ 
    //let test=new Object
    // console.log(__dirname)
    console.log(req.file)
    try{
      console.log("i m here");
      const email=await User.findOne({email:req.body.email})
      
      console.log('yes')
      if(email)
      {
        console.log('yes')
        res.flash('info','Email is already registered, Try another one!')
        res.redirect('/user/signup')
      }
      else
      {
        // console.log(req.file)
        // console.log('yes')
        // console.log(req.body)
        var branchsem = await branchsems.findOne({branch : req.body.branch, sem : req.body.semester})
        if(branchsem == null) {
          req.flash('info',"You can't be registered now. Try again later!")
          res.redirect('/user/signup')
        }
        if(req.file == undefined) {
            var user = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            branchsem : branchsem._id
          })
        } else {
          var user = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            image : req.file.filename,
            branchsem : branchsem._id
          })
        }
        await user.save()
        await branchsem.subjects.push(user._id);
        await branchsem.save()
        console.log(user)
        mailverification(user.email, user._id);
        req.flash('info','Email is sent Verify email to login!')
        res.redirect('/user/signup')
      }
    }catch(e){
      console.log(e)
      res.send(e)
    }
  });

  router.post('/signin',async (req,res)=>{
    try{
      const user=await User.findOne({email:req.body.email})
      if(!user){
        req.flash('info',"You don't have any account")
        res.redirect('/user/signin')
      }
      else if(!user.mailverified) {
        req.flash('info','Verify you mail to continue')
        res.redirect('/user/signin')
      }
      else
      {
        const isMatch=await bcryptjs.compare(req.body.password,user.password)
        if(!isMatch){
          // alert('Invalid Password!')
          req.flash('info','Invalid Password!')
          res.redirect('/user/signin');
        }
        else
        {
          const token=await user.generatingauthtoken()
          res.cookie('auth_token_2',token)
          res.redirect('/dashboard')
        }
      }
    }catch(e){
      console.log(e)
      req.flash('info','server error!')
    }
  })

  router.post('/forget-password',async(req,res)=>{
    try{
      var message=null,error=null
      const user=await User.findOne({email:req.body.email})
      if(user === null)
      error='Email is not registered'
  
      if(error === null)
      {
        resetpassword(req.body.email);
        req.flash('info','Check your mail to reset your password.')
      }
      res.redirect('/user/signin')
      console.log('reset link send');
    }catch(e){
      console.log(e)
      //res.render('message-reset.ejs',{message:null,error:'Server error'})
      req.flash('info','server error');
    }
  })

  router.post("/reset-password", async (req, res) => {
    if(req.body.password != req.body.password1) {
      req.flash('info','Both passwords are not same! Try again.')
      res.redirect('/')
    }
    else {
    try {
      console.log(req.query.token)
      const token = req.query.token;
      const decode = jwt.verify(token, "thisismyjwtsecret2");
    
      var message = null,
      error = null;
      if (decode.type !== "resetpassword") error = "Wrong token!!";
    
      if (error === null) {
      const user = await User.findOne({ email: decode.emailid });
      const password = req.body.password;
      user.password = password;
      await user.save();
      message = "Password changed sucessfully";
      }
      // alert(message)
      req.flash('info',message)
      res.redirect('/user/signin')
    } catch (e) {
      console.log(e)
      res.send('oops')
    }
  }
    });

  module.exports = router;