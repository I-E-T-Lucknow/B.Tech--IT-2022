const express = require('express')
const app = express()
const router = express.Router()
const auth = require('../auth/auth')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const subjects = require('../models/subject')
const assignments = require('../models/assignment')
const submissions = require('../models/submission');
const user = require('../models/user')

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
  var loginuser = req.user
  var notificationarray = []
  for(const one of loginuser.notifications) {
    const oneobj = await notifications.findById(one)
    notificationarray.push(oneobj)
  }
  var subjectarray = []
  for(const one of loginuser.electives) {
    var temp = await subjects.findById(one).populate('assignments').populate('submissions')
    subjectarray.push(temp)
  }
  res.render('teacherpanel.ejs',{user : loginuser, notificationarray : notificationarray, subjectarray : subjectarray})
})

router.post('/addnew',auth,upload.single("file"),async(req,res)=>{
  console.log(req.body)
  console.log(req.file)
  const newassignment = new assignments({
    desc : req.body.desc,
    totalmarks : req.body.marks,
    fileurl : req.file.filename,
    duedate : req.body.date
  })
  await newassignment.save()
  var subject  = await subjects.findById(req.body.subject)
  await subject.assignments.push(newassignment._id)
  await subject.save()
  res.redirect('/faculty')
})

router.get('/:assignmentid/:submissionid',auth,async(req,res)=>{
  var loginuser = req.user
  var notificationarray = []
  for(const one of loginuser.notifications) {
    const oneobj = await notifications.findById(one)
    notificationarray.push(oneobj)
  }
  var subjectarray = []
  for(const one of loginuser.electives) {
    var temp = await subjects.findById(one).populate('assignments').populate('submissions').populate('studentid')
    subjectarray.push(temp)
  }
  const assignment = await assignments.findById(req.params.assignmentid).populate('submissions').populate('studentid')
  const submission = await submissions.findById(req.params.submissionid)
  for(var one of assignment.submissions) {
    one.studentid = await user.findById(one.studentid)
  }
  res.render('teacherpanel1.ejs',{
    user : loginuser, 
    notificationarray : notificationarray, 
    subjectarray : subjectarray,
    submission: submission, 
    assignment : assignment,
    document : submission.fileurl
  })
})

router.get('/:assignmentid',auth,async(req,res)=>{
  var loginuser = req.user
  var notificationarray = []
  for(const one of loginuser.notifications) {
    const oneobj = await notifications.findById(one)
    notificationarray.push(oneobj)
  }
  var subjectarray = []
  for(const one of loginuser.electives) {
    var temp = await subjects.findById(one).populate('assignments').populate('submissions').populate('studentid')
    subjectarray.push(temp)
  }
  const assignment = await assignments.findById(req.params.assignmentid).populate('submissions').populate('studentid')
  for(var one of assignment.submissions) {
    one.studentid = await user.findById(one.studentid)
  }
  res.render('teacherpanel1.ejs',{user : loginuser, notificationarray : notificationarray, subjectarray : subjectarray,document: assignment.fileurl, assignment : assignment,submission: undefined})
})

router.post('/handler/:assignmentid',auth,async(req,res)=>{
  res.redirect('/faculty/'+req.params.assignmentid+'/'+req.body.hiddenfield)
})

router.post('/:assignmentid/:submissionid',auth,async(req,res)=>{
  console.log(req.body)
  var submission = await submissions.findById(req.params.submissionid)
  submission.marks = req.body.obtmarks
  await submission.save()
  console.log(submission)
  res.redirect('/faculty/'+req.params.assignmentid + '/' + req.params.submissionid)
})

module.exports = router