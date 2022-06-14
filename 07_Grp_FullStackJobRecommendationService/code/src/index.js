const express = require('express')
const path = require('path')
const cookieSession = require('cookie-session')
const passport = require('passport')

const userRouter= require('./routers/user-router')
const jobRouter= require('./routers/job-router')
const authRoutes = require('./routers/auth-router');

require('./db/database')
require('./utils/passport')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const publicPath=path.join(__dirname,'../public')
const templateDirPath=path.join(__dirname,'../templates/views')
app.use(express.static(publicPath))

const port = process.env.PORT || 3000

app.set('view engine' ,'ejs')
app.set('views' , templateDirPath)

app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000 ,
    keys : [process.env.key]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth',authRoutes)
app.use(userRouter)
app.use(jobRouter)

app.get('/',(req,res)=>{
    res.render('home',{user:req.user})
})

app.get('/*',(req,res)=>{
    res.render('error')
})
app.listen(port,() =>{
    console.log('Server is up on',port)
})