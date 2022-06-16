const express = require('express')
const app = express()
const router = express.Router()
const auth = require('../auth/auth.js')
const mongoose  = require('mongoose')
const notifications = require('../models/notification');
const users = require('../models/user');
const subjects = require('../models/subject')
const alert = require('alert')
const branchsems = require('../models/branchsem')
const chapter = require('../models/chapter')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')

router.use(bodyParser.urlencoded({extended: true}))

const storage=multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null,path.join(__dirname ,'./../../','/public/uploads')) 
}, 
  filename:(req,file,cb)=>{
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({
  storage:storage
});


router.get('/',auth,async(req,res)=>{
  var loginuser = await req.user
  var notificationarray = []
  for(const one of loginuser.notifications) {
    const oneobj = await notifications.findById(one)
    notificationarray.push(oneobj)
  }
  var temparray = await branchsems.findById(loginuser.branchsem)
  var subjectarray = []
  if(temparray!=null) {
    for(const one of temparray.subjects) {
      var temp = await subjects.findById(one).populate('chapters')
      subjectarray.push(temp)
    }
  }
    for(const one of req.user.electives) {
      var temp = await subjects.findById(one).populate('chapters')
      subjectarray.push(temp)
    }
  // console.log(loginuser)
  // console.log(notificationarray)
  // console.log(subjectarray)
  res.render('material.ejs',{user : loginuser, notificationarray : notificationarray, subjectarray : subjectarray})
})


router.get('/:pdf',auth,async(req,res)=>{
  var loginuser = await req.user
  var notificationarray = []
  for(const one of loginuser.notifications) {
    const oneobj = await notifications.findById(one)
    notificationarray.push(oneobj)
  }
  var temparray = await branchsems.findById(loginuser.branchsem)
  var subjectarray = []
  if(temparray != null) {
    for(const one of temparray.subjects) {
      var temp = await subjects.findById(one).populate('chapters')
      subjectarray.push(temp)
    }
  }
    for(const one of req.user.electives) {
      var temp = await subjects.findById(one).populate('chapters')
      subjectarray.push(temp)
    }
  // console.log(loginuser)
  // console.log(notificationarray)
  // console.log(subjectarray)
  res.render('material1.ejs',{user : loginuser, notificationarray : notificationarray, subjectarray : subjectarray, document : req.params.pdf})
})


router.post('/addnew',auth,upload.single("file"),async(req,res)=>{
  console.log(req.body)
  console.log(req.file)
  var flag = -1
  const subject  = await subjects.findById(req.body.subject).populate('chapters')
  var obj = {
    name : req.body.title,
    file : req.file.filename
  }
  subject.chapters.forEach(async(one)=>{
    if(one.index == req.body.chapter) {
      flag = 1;
      await one.resources.push(obj)
      await one.save()
    }
  })
  if(flag == -1) {
    var newchapter = new chapter({
      index : req.body.chapter,
      resources : obj
    })
    await newchapter.save()
    await subject.chapters.push(newchapter._id)
    await subject.save()
  }
  await subject.save()
  console.log(subject)
  res.redirect('/resources')
})

module.exports = router