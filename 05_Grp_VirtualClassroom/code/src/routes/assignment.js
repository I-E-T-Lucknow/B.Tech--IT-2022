const express = require('express')
const app = express()
const router = express.Router()
const auth = require('../auth/auth.js')
const notifications = require('../models/notification');
const users = require('../models/user');
const subjects = require('../models/subject')
const branchsems = require('../models/branchsem')
const assignments = require('../models/assignment')
const submissions = require('../models/submission')
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
  if(req.user.category == 'student') {
    for(const one of temparray.subjects) {
      var temp = await subjects.findById(one).populate('assignments')
      subjectarray.push(temp)
    }
  }
  else {
    for(const one of req.user.electives) {
      var temp = await subjects.findById(one).populate('assignments')
      subjectarray.push(temp)
    }
  }
  console.log(loginuser)
  console.log(notificationarray)
  console.log(subjectarray)
  res.render('assignment.ejs',{user : loginuser, notificationarray: notificationarray, subjectarray : subjectarray})
})

router.get('/:assignmentid',auth,async(req,res)=>{
  var loginuser = await req.user
  var notificationarray = []
  for(const one of loginuser.notifications) {
    const oneobj = await notifications.findById(one)
    notificationarray.push(oneobj)
  }
  var temparray = await branchsems.findById(loginuser.branchsem)
  var subjectarray = []
  if(req.user.category == 'student') {
    for(const one of temparray.subjects) {
      var temp = await subjects.findById(one).populate('assignments')
      subjectarray.push(temp)
    }
  }
  else {
    for(const one of req.user.electives) {
      var temp = await subjects.findById(one).populate('assignments')
      subjectarray.push(temp)
    }
  }
  const assignment = await assignments.findById(req.params.assignmentid).populate('submissions')
  var submission = undefined
  console.log(assignment.submissions)
  for(const one of assignment.submissions) {
    if(one.studentid.equals(loginuser._id)) {
      // console.log("Submission found for assignment")
      submission = one
      break
    }
  }
  // console.log(submission)
  res.render('assignment1.ejs',{user : loginuser, notificationarray: notificationarray, subjectarray : subjectarray, assignment : assignment, submission : submission})
})

router.post('/:assignmentid',auth,upload.single("file"),async(req,res)=>{
  console.log(req.params.assignmentid)
  console.log(req.body)
  console.log(req.file)
  const submission = new submissions({
    studentid : req.user._id,
    assignmentid : req.params.assignmentid,
    fileurl : req.file.filename
  })
  await submission.save()
  var assignment = await assignments.findById(req.params.assignmentid)
  await assignment.submissions.push(submission._id)
  await assignment.save()
  res.redirect('/assignments/'+req.params.assignmentid)
})

module.exports = router