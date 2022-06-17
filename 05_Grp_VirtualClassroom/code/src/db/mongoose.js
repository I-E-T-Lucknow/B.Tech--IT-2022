const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://new-user:shuvanshu@management-system.yr7mp.mongodb.net/management-system?retryWrites=true&w=majority',
{useCreateIndex:true ,useNewUrlParser:true,useUnifiedTopology: true },()=>{
  console.log("connected to database.")
})


