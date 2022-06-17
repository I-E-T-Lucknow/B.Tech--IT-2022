const profileCheck = (req,res,next)=>{
    if(!req.user.contact1)
     res.render('profile-form',{user:req.user})
    else next();
}

module.exports = profileCheck;