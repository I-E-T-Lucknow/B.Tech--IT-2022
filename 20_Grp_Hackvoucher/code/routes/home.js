const express = require('express') ;
const { appendFile } = require('fs');
const routes = express.Router() ;
console.log('Routes has added') ;
const passport = require('../config/passport-local-strategy') ;
const home = require('../controllers/home')
const User = require('../models/user') ;
const coupon = require('../models/coupon') ;
const { X509Certificate } = require('crypto');
const admins = ["nisar@gmail.com", "shivam@gmail.com", "pramod@gmail.com"];

routes.get('/home' , async (req, res) => {
let data = await coupon.find({isPurchaged: false , isFiltered : true}) ;
let userSize = await (await User.find()).length;
var totalPendingCoupons = 0;
for(let i = 0; i < data.length; i++) {
    if(!data[i].isVerified) {
        totalPendingCoupons = totalPendingCoupons + 1;
    }
}
console.log(userSize);
    res.render('boothome', {
        isAuthenticated : req.isAuthenticated(),
        COUPON : data,
        matchedCoupon: [],
        userSize : userSize,
        couponCount: data.length,
        coupoExchange: await (await coupon.find({isPurchaged: true})).length,
        filtred: false,
        user : res.locals.user,
        totalPendingCoupons : totalPendingCoupons,
        totalVerifiedCoupons : data.length - totalPendingCoupons,
        totalAdmins : admins.length,  
        isSearched : false
    }) ;
})
routes.get('/register' , (req , res) =>{
    res.render('bootregister' , {
        title : 'User Registration' ,
    })
})
routes.get('/sign-in' , (req , res) => {
    res.render('bootlogin') ;

})
routes.post('/create' , async (req , res) => {
    console.log(req.body) ;
    let user = await User.findOne({email : req.body.email});
    let admin = false;
    for(let i =0; i < admins.length; i++) {
        admin = admin || (admins[i] == req.body.email)
    }
    if(admin) {
        console.log("*******yes**********")
    }
    if(user){
        req.flash('error' , 'user is already exist') ;
        return res.redirect('back') ;
    }
    if(!user) {
        var obj = new User({
            name : req.body.name ,
            email : req.body.email,
            password : req.body.password,
            COUPONS : [],
            isAdmin : admin

        })
        if(req.body.password != req.body.confirmpassword){
            req.flash('error' , "confirm password is not matching with password") ;
            return res.redirect('back') ;
        }
        obj.save() ;
        req.flash('success' , 'Successfully register , WELCOME TO HACKVOUCHER') ;
        return res.redirect('/sign-in')
    }else{
        console.log('user is already register') ;
        res.redirect('back') ;
    }
});

routes.post('/create-session' ,passport.authenticate(
    'local' ,
    {
        failureRedirect : '/sign-in'}
) ,  (req , res) => {
    req.flash('success' , 'Logged in Successfully') ;
    return res.redirect('/home') ;
 }) ;

routes.get('/sign-out' , (req , res) => {
    req.logout() ;
    req.flash('success' , 'You have logged out') ;
    return res.redirect('/home');
})
routes.get('/profile' , async (req , res) => {
        var x = new Array();
    for(let i of res.locals.user.COUPONS) {
         let COUPON = await coupon.findById(i) ;
         x.push(COUPON) ;
    }
    data = await coupon.find({isPurchaged: false , isFiltered : true})
    var totalPendingCoupons = 0;
   for(let i = 0; i < data.length; i++) {
    if(!data[i].isVerified) {
        totalPendingCoupons = totalPendingCoupons + 1;
    }
   }
    return res.render('bootuser' , {
        user : res.locals.user,
        x : x,
        coupon : data,
        totalPendingCoupons : totalPendingCoupons,
        totalVerifiedCoupons : data.length - totalPendingCoupons
    }) ;
})
routes.get('/add-voucher' , passport.checkAuthentication , (req , res) => {
    return res.render('bootadd' , {
         user : res.locals.user
    }) ;
})
routes.get('/main' , (req , res) => {
    return res.render('bootmain') ;
})



routes.get('/x' , (req , res) => {
    return res.redirect("www.facebook.com") ;
})

routes.post('/search', async (req, res) => {
    search = req.body[0];
    let data = await coupon.find({isPurchaged: false , isFiltered : true}) ;
   let userSize = await (await User.find()).length;
   var totalPendingCoupons = 0;
  for(let i = 0; i < data.length; i++) {
    if(!data[i].isVerified) {
        totalPendingCoupons = totalPendingCoupons + 1;
    }
  }
  var matchedCoupon = [];
  console.log(req.body.search)
  for(let i = 0; i < data.length; i++) {
      if(data[i].description.includes(req.body.search)) {
          matchedCoupon.push(data[i])
      }
  }
    res.render('boothome', {
        isAuthenticated : req.isAuthenticated(),
        COUPON : data,
        matchedCoupon : matchedCoupon,
        userSize : userSize,
        couponCount: await (await coupon.find({isPurchaged: false})).length,
        coupoExchange: await (await coupon.find({isPurchaged: true})).length,
        filtred: false,
        user : res.locals.user,
        totalPendingCoupons : totalPendingCoupons,
        totalVerifiedCoupons : data.length - totalPendingCoupons,
        totalAdmins : admins.length, 
        isSearched : true
    })
})









module.exports = routes ;