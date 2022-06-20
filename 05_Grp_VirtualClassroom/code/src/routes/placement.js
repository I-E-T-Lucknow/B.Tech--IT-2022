const express = require('express')
const app = express()
const router = express.Router()
const auth = require('../auth/auth.js')
const mongoose = require('mongoose')
const notifications = require('../models/notification')
const forms = require('../models/form')
const alert = require('alert')

router.get('/',auth,async(req,res)=>{
  var loginuser = await req.user
  var notificationarray = []
  for(const one of loginuser.notifications) {
    const oneobj = await notifications.findById(one)
    notificationarray.push(oneobj)
  }
  const query = {category : 'placement'}
  var formarray = await forms.find(query)
  console.log(loginuser)
  console.log(notificationarray)
  console.log(formarray)
  res.render('placement.ejs',{user : loginuser, notificationarray : notificationarray, formarray : formarray})
})

router.post('/addnew',auth,async(req,res)=>{
  const newform = new forms({
    title : req.body.title,
    content : req.body.desc,
    link : req.body.link,
    category : 'placement'
  })
  await newform.save()
  alert('Form added successfully')
  res.redirect('/placement')
})

module.exports = router