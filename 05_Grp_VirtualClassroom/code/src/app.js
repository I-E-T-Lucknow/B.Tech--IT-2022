const express = require("express")
const app = express()
const bodyParser= require("body-parser")
const cookieParser=require('cookie-parser')
const session=require('express-session')
const flash=require('connect-flash')
const _ = require('lodash')
const methodOverride = require ('method-override')

//FOR POSTMAN
app.use(express.json())
app.use(methodOverride('_method'))
app.locals._ = _
// <------------>  DATABASE   <-------------->
require('./db/mongoose')

//<------------->  GETTING DATA FROM POST REQUEST  <---------------->
app.use(bodyParser.urlencoded({extended: true}));


//<------------->  SETTING COOKIES TO THE BROWSER  <----------------->
app.use(cookieParser())

//<------------->  SPECIFY THE PATH OF STATIC FILES(eg. css,javascript)  <-------------------->
app.use(express.static( "public")); 
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//<------------->  SETTING MESSAGES FOR REDIRECTING PAGES(i.e. stored in flash session)  <-------------------->
app.use(session({
	secret:'secret123',
	resave:true,
	saveUninitialized:true
}))
app.use(flash())

app.get('/',(req,res)=>{
	res.redirect('/user/signin')
})

app.use('/user',require('./routes/user/login'));
app.use('/admin',require('./routes/admin'));
app.use('/dashboard',require('./routes/dashboard'));
app.use('/assignments',require('./routes/assignment'));
app.use('/forms',require('./routes/form'));
app.use('/resources',require('./routes/material'));
app.use('/timetable',require('./routes/timetable'));
app.use('/placement',require('./routes/placement'));
app.use('/faculty',require('./routes/faculty'));
const PORT = process.env.PORT || 9000;
app.listen(PORT,function() {
	console.log(`Server has started at ${PORT}`);
});