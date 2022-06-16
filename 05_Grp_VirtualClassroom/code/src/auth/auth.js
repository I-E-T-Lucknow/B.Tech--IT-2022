const jwt=require('jsonwebtoken')
const User=require('../models/user')

const auth= async(req,res,next)=>{
    try{
        const token = req.cookies['auth_token_2']
        const decoded=jwt.verify(token,'thisismyjwtsecret2')
        
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.user=user
        req.token=token
        next()
    }catch(e){
        res.redirect('/')
       
    }
}

module.exports=auth