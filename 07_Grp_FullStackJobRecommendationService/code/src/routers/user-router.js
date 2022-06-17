const express= require('express')
const User = require('../models/user-model')
const Job = require('../models/job-model')
const router = express.Router()
const authCheck= require('../middleware/authCheck')
const profileCheck =require('../middleware/profileCheck')

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/submit-referral' , async (req,res)=>{
     
     user = new User()
     user.googleID = "randomGoogleId"
     user.username = req.body.name
     user.email="abc@referral.com"
     user.address=req.body.address
     user.contact1=req.body.phoneNumber
     if(req.body.contact2)
     user.contact2=req.body.contact2
     user.type="worker"
     const jobs = ['Painter','Gardener','Maid','Watchman']
     jobs.forEach((job)=>{
         if((job in req.body) && !user.jobTypes.includes(job)) user.jobTypes.push(job)
     })
     
     req.user=user
     await user.save()
    res.redirect('/users/profile')
})

router.post('/user-worker' ,authCheck, async (req,res)=>{
    const user = await User.findOne({googleID : req.user.googleID})
    user.email=req.body.email
    user.address=req.body.address
    user.contact1=req.body.contact1
    if(req.body.contact2)
    user.contact2=req.body.contact2
    user.type="worker"
    const jobs = ['Painter','Gardener','Maid','Watchman']
    jobs.forEach((job)=>{
        if((job in req.body) && !user.jobTypes.includes(job)) user.jobTypes.push(job)
    })
    
    req.user=user
    await user.save()
   res.redirect('/users/profile')
})

router.post('/user-recruiter' ,authCheck, async (req,res)=>{
    const user = await User.findOne({googleID : req.user.googleID})
    user.email=req.body.email
    user.address=req.body.address
    user.contact1=req.body.contact1
    if(req.body.contact2)
    user.contact2=req.body.contact2
    user.type="recruiter"
    req.user=user
    await user.save()
    res.redirect('/users/profile')
})

router.get('/about-us',(req,res)=>{
    res.render('about-us',{user:req.user})
})
router.get('/users/profile/update' , authCheck ,(req,res)=>{
    res.render('profile-form',{user:req.user})
})

router.get('/users/profile' , authCheck ,profileCheck ,(req,res)=>{
   res.render('profile',{user:req.user})
})

router.get('/users/refer' , authCheck ,profileCheck ,(req,res)=>{
    res.render('refer',{user:req.user})
 })

router.get('/users/jobs', authCheck , profileCheck , async (req,res)=>{
     const jobs = await Job.find({ownerID : req.user.googleID})    
     res.render('myjobs',{ user:req.user , jobs:jobs})
});

router.get('/users/dashboard', authCheck , profileCheck , async (req,res)=>{
    
    if(req.user.type == "worker"){
        const jobs = await Job.find({})
        const fitjobs= jobs.filter((job)=> {
            if (req.user.jobTypes.includes(job.jobType)) return true
            return false
        })
        res.render('dashboard',{ jobs:fitjobs ,user:req.user})
     }
     else{
        const users = await User.find({  type:'worker'})
        res.render('dashboard',{ users:users ,user:req.user})
     }
});
router.post('/users/dashboard/filter',authCheck , profileCheck , async (req,res)=>{
    const filters = []
    for(var propt in req.body) {
        filters.push(propt)
    }
    if(req.user.type == "worker"){
        const jobs = await Job.find({})
        const fitjobs= jobs
        const filteredjobs = fitjobs.filter((job)=> (filters.includes(job.jobType)))
        res.render('dashboard',{ jobs:filteredjobs ,user:req.user})
     }
     else{
        const users = await User.find({  type:'worker'})
        const filterusers=users.filter((user)=>(filters.some((filter)=>  user.jobTypes.includes(filter))))
        res.render('dashboard',{ users:filterusers ,user:req.user})
     }

})

router.get('/users/newjobs',authCheck ,(req,res)=>{
    res.render('job-form', {user:req.user})
})

module.exports=router