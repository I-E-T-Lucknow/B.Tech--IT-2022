const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jd:String,      //job description
    jobType:String,
    contact:String,
    ownerName:String,
    ownerAddress:String,
    ownerID : String, 
    email:String
});

const Job = mongoose.model('job',jobSchema);

module.exports = Job;

