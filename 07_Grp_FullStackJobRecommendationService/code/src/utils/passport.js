const passport =require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model')

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    }); 
})


passport.use(
    new GoogleStrategy({
        callbackURL :"/auth/google/redirect" ,
        clientID : process.env.clientID ,
        clientSecret: process.env.clientSecret
    }, (accessToken ,refreshToken ,profile ,done )=>{
        
        User.findOne({googleID:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('user is already register');
                done(null,currentUser);
            }
            else {
                console.log(profile);
                new User({
                    username:profile.displayName ,
                    googleID: profile.id,
                    thumbnail: profile._json.picture,
                    email : profile._json.email
                }).save().then((newUser)=>{
                    console.log('new user is created ')
                    done(null ,newUser)
                })   
            }
        })     
 })
)