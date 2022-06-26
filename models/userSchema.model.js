const mongoose = require('mongoose');


const newUserSchema =  new mongoose.Schema({
    uname:{type:String,required:true},
    pwd:{type:String,required:true},
    cpwd:{type:String,required:true},
    mail_id:{type:String,required:true},
    gender:{type:String,required:true},
    dob:{type:Date,required:true},
    contact_no:{type:Number,required:true},
});
module.exports = mongoose.model('Users',newUserSchema);