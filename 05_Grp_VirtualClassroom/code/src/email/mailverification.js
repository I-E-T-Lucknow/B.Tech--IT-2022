const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')

const mailverification=(emailid,id)=>{
    console.log('yes')
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'class.management001@gmail.com',
            pass:'skuyrncfaueylbww'
        }
    })
    
    const token=jwt.sign({_id:id,type:'mailverification'},'thisismyjwtsecret')
    //  const url=`http://localhost:3000/user/mailverification?token=${token}`
     const url=`https://class-admin.herokuapp.com/user/mailverification?token=${token}`
    const mailOption={
        from:'class.management001@gmail.com',
        to:emailid,
        subject:'Verify your gmail',
        
        html:`<p>Thanks For Resistering With Us Click <a href=${url}>here</a> to verify your email</p>`
    }

    transporter.sendMail(mailOption,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Mail sent!')
        }
    })
}



const resetpassword=async(emailid)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'class.management001@gmail.com',
            pass:'skuyrncfaueylbww'
        }
    })

    const token=jwt.sign({emailid,type:'resetpassword'},'thisismyjwtsecret2')
    // const url=`http://localhost:3000/user/reset-password?token=${token}`
   const url=`https://class-admin.herokuapp.com/user/reset-password?token=${token}`
    const mailOption={
        from:'class.management001@gmail.com',
        to:emailid,
        subject:'Reset your passowrd',
        html:`<p>Click <a href=${url}>here</a> to reset your password</p>`
    }


    transporter.sendMail(mailOption,(err,data)=>{
        if(err){
            console.log('Mail not sent!!')
        }else{
            console.log('Mail sent!!')
        }
    })
}

module.exports={
    mailverification,
    resetpassword
}