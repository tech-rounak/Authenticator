const mongoose = require('mongoose');
const  url = "mongodb://localhost:27017/Authenticator"
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connection Successfull");
}).catch((err)=>{
    console.log("Database Connection Failed");
    console.log(err);
})

require('./userSchema.model')