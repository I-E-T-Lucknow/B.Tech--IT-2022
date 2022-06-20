const router = require('express').Router();
const passport =require('passport')
const fast2sms = require('fast-two-sms')
const User = require('../models/user-model')


router.get('/login',(req,res)=>{
    res.render('login',{user:req.user, phone:null});
})

router.get('/signup',(req,res)=>{
    res.render('signup',{user:req.user});
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

router.get('/google', passport.authenticate(
    'google' ,{
        scope : ['profile' , 'email']
    }
))

router.get('/google/redirect', passport.authenticate('google') ,(req,res)=>{
    res.redirect('/users/profile')
})

router.post('/get-otp', async (req,res) => {
    console.log(req.body.phone);
    const otp = Math.floor(1000 + Math.random() * 9000);
    var options = {authorization : process.env.smsApiKey , message : `Your OTP for RozGaar is ${otp}` ,  numbers : [req.body.phone]}
    console.log(options); 
    const response = await fast2sms.sendMessage(options);
    console.log(response)
    res.render('login',{user:req.user, phone:req.body.phone});
})

router.post('/submit-otp', async (req, res) => {
    console.log(req.body.otp)
    req.session.user = await new User({
        username:'randomUserName' ,
        contact1: req.body.phone,
        googleID: 'randomGoogleId',
        thumbnail: 'https://picsum.photos/500/500',
        email: 'random@gmail.com'
    }).save();
    console.log('here')
    res.redirect('/users/profile')
})

module.exports = router;