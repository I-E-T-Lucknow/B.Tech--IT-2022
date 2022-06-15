const mongoose = require('mongoose') ;

mongoose.connect('mongodb+srv://nisaar:Nidsar@cluster0.ztmue.mongodb.net/Hackvoucher_collection?retryWrites=true&w=majority') ;
 const db = mongoose.connection ;

 db.on('error' , console.error.bind(console , "error connecting to db")) ;

db.once('open' , function(){
    console.log('successfully connected to database') ;
}) ;