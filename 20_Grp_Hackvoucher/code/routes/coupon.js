const express = require('express') ;
const routes = express.Router() ;
console.log('Routes has added') ;
const passport = require('../config/passport-local-strategy') ;
const User = require('../models/user') ;
const coupon = require('../models/coupon') ;
const { deleteOne } = require('../models/user');
const admins = ["nisar@gmail.com", "shivam@gmail.com", "pramod@gmail.com"];
routes.post('/create-coupon' , async (req , res) => {
    var obj = await new coupon({
        title : req.body.title,
        store : req.body.store,
        description : req.body.description,
        cardLimit : req.body.cardLimit,
        couponCode : req.body.couponCode,
        user : res.locals.user._id ,
        isFiltered : true 
    })
   obj.save() ;
   res.locals.user.coupen_hosted = res.locals.user.coupen_hosted + 1 ;
   res.locals.user.save() ;
   req.flash('success' , 'Coupon sent to admins for varification') ;
   return res.redirect('/home') ;
}) ;
routes.get('/main/:id' , async (req , res) => {
    let COUPON = await coupon.findById(req.params.id)
    res.render('bootmain' , {
        COUPON : COUPON,
        link : "www." + COUPON.store + ".com"
    }) ;
}) ;


routes.get('/buy-coupon/:id' , async (req , res) => {
      let COUPON = await coupon.findById(req.params.id);
        res.locals.user.COUPONS.push(COUPON) ;
        res.locals.user.coins = res.locals.user.coins - COUPON.cardLimit ;
        res.locals.user.coupen_buyed = res.locals.user.coupen_buyed + 1 ;
        COUPON.isPurchaged = true ; 
        let user = await User.findById(COUPON.user) ;
        user.coins = user.coins + COUPON.cardLimit ;
        user.save() ;
        COUPON.save();
        res.locals.user.save() ;
       return res.redirect('/home') ;
   }) ;
    


routes.post('/filter' , async (req , res) => {
    let data = await coupon.find({isPurchaged: false , isFiltered : true}) ;
    var totalPendingCoupons = 0;
for(let i = 0; i < coupon.length; i++) {
    if(data[i].isVerified) {
        totalPendingCoupons = totalPendingCoupons + 1;
    }
}
    console.log(req.body.companyName)
    let userSize = await (await User.find()).length;
    var filter;
    var x = [];
    var y = req.body.companyName;
    if(!Array.isArray(y)) {
        x.push(y);
        filter = x;
    } else {
        filter = req.body.companyName
    }
    console.log(filter);
    res.render('boothome', {
        isAuthenticated : req.isAuthenticated(),
        COUPON : data,
        userSize : userSize,
        couponCount: await (await coupon.find({isPurchaged: false})).length,
        coupoExchange: await (await coupon.find()).length,
        filteredCompany: filter,
        filtred: true,
        user : res.locals.user,
        totalPendingCoupons : totalPendingCoupons,
        totalVerifiedCoupons : coupon.length - totalPendingCoupons,
        totalAdmins : admins.length, 
        isSearched: false
    }) ;
})

routes.get('/verify/:id', async(req, res) => {
    let COUPON = await coupon.findById(req.params.id);
    COUPON.isVerified = true;
    COUPON.save();
    res.redirect('back')
})


module.exports = routes ;