const mongoose = require('mongoose');
const  url = "mongodb+srv://basic-authentifier:basic-authentifier@cluster0.zxlwj.mongodb.net/?retryWrites=true&w=majority"
// const  url = "mongodb://localhost:27017/Authenticator"
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