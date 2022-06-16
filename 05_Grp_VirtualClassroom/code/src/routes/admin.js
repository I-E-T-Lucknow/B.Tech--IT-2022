const mongoose = require('mongoose')
const express = require('express')
const app = express()
const router = express.Router()
const alert = require('alert')
const branchsems = require('../models/branchsem');
const auth = require('../auth/auth.js');
const users = require('../models/user');
const subjects = require('../models/subject');

router.get('/',auth,async(req,res)=>{
  var msg = req.flash('info')
  res.render('admin.ejs',{message : msg})
})

router.get('/addbranch',auth,async(req,res)=>{
  var subjectarray = await subjects.find({elective : false })
  res.render('addbranch.ejs',{subjectarray : subjectarray})
})

router.get('/addsubject',auth,async(req,res)=>{
  var query = {category: 'faculty'}
  const facultyarray = await users.find(query)
  // console.log(facultyarray)
  res.render('addsubject.ejs',{facultyarray : facultyarray})
})

router.post('/addbranch',auth,async(req,res)=>{
  var already = await branchsems.findOne({branch : req.body.branch, sem : req.body.sem})
  if(already == null) {
    var newbranchsem = new branchsems({
      branch : req.body.branch,
      sem : req.body.sem,
      subjects : req.body.subjects
    })
    await newbranchsem.save()
    req.flash('info','Branch and semester configuration saved successfully.')
  }
  else {
    req.flash('info','This combination already exists.')
  }
  res.redirect('/admin')
})

router.post('/addsubject',auth,async(req,res)=>{
  // console.log(req.body)
  var already = await subjects.findOne({name : req.body.name, facultyid : req.body.faculty})
  // console.log(already)
  if(already == null) {
    var newsubject = new subjects({
      name : req.body.name,
      facultyid : req.body.faculty 
    })
    // var branchsemobj = await branchsems.findOne({branch : req.body.branch , sem : req.body.sem})
    // console.log(branchsemobj)
      await newsubject.save()
      var faculty = await users.findById(req.body.faculty)
      faculty.electives.push(newsubject._id)
      await faculty.electives.save()
      // branchsemobj.subjectid.push(newsubject._id)
      // await branchsemobj.save()
      req.flash('info','Subject added successfully.')
  } else {
    // console.log(already)
    req.flash('info','This subject is already configured.')
  }
  res.redirect('/admin')
})

module.exports = router