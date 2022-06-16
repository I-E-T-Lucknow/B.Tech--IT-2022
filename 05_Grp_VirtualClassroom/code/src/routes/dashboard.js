const express = require('express')
const app = express()
const router = express.Router()
const auth = require('../auth/auth.js')

router.get('/',auth,async(req,res)=>{
  const loginUser = req.user
  res.render('index.ejs', {user: loginUser })
})

module.exports = router