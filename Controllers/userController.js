const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const newUser = mongoose.model('Users');
const sessions = require('express-session');
router.use(express.static('public'));
// const cookieParser = require("cookie-parser");

router.use(bodyParser.urlencoded({
    extended:true
}))

// router.use(cookieParser());

router.use(sessions({
    secret: "Secret Key",
    saveUninitialized:true,
    // cookie: { maxAge:3600 },
    resave: false
}));

router.get("/signin",(req,res)=>{
    res.render("login");
})
router.get("/signup",(req,res)=>{
    res.render("register",{msg:''});
})
router.get("/generate_captcha",(req,res)=>{
     var otp=Math.floor(1000+Math.random()*9000);
    //  console.log(otp);
     res.send(JSON.stringify(otp));
})
router.post('/checkContact',async(req,res)=>{
    var msg = 0;
    const validateContact = await newUser.findOne({contact_no : req.body.num});
    // console.log(validateContact)
    if(validateContact){
        msg = 1;
    }
    res.send(JSON.stringify(msg));
})
router.post('/checkEmail',async(req,res)=>{
    var msg = 0;
    const validateEmail = await newUser.findOne({mail_id : req.body.mail});
    // console.log(validateEmail)
    if(validateEmail){
        msg = 1;
    }
    res.send(JSON.stringify(msg));
})
router.post('/save',async(req,res)=>{
   const user = new newUser()
   user.uname = req.body.uname   
   user.pwd = req.body.pwd   
   user.cpwd = req.body.cpwd   
   user.mail_id = req.body.mail_id   
   user.gender = req.body.gender   
   user.contact_no = req.body.contact_no   
   user.dob = req.body.dob   
//    if(user.pwd != user.cpwd)
//---------Encrypting the password using bcrypt--------------------
   const salt = await bcrypt.genSalt(8);
   user.pwd = await bcrypt.hash(user.pwd,salt);
   user.cpwd = await bcrypt.hash(user.cpwd,salt)
//    ----------------------------------------
   user.save((err,data)=>{
       if(!err){

            console.log("DATA SAVED SUCESSFULLY");
            // console.log(data);
            res.render('homepage');
          }
       else 
            console.log(err);
   })
   
})
// ----------------After Login------------------
function isAuthenticated (req, res, next) {
  if (req.session.uname) next()
  else next('login');
}
router.post('/dashboard',async(req,res)=>{

     var uname = req.body.uname;
     var pwd = req.body.pwd;
     var query = { $and : [{mail_id : uname}, {pwd : pwd}]}

     const user = await newUser.findOne({mail_id:uname});
     console.log(user)   
     if(user){
        const validPassword = await bcrypt.compare(pwd,user.pwd);
        if(validPassword){
            req.session.uid = uname;
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.render("dashboard",{data:user})
                })
            console.log("Login Succesfull");
            console.log(req.session.uid);
            console.log(req.session);
        }
        else {
            console.log("Wrong Password");
        }
     }
     else console.log("User Does Not Exist")
})
router.get("/logout",(req,res)=>{
    console.log(req.session);
    // console.log("logout : "+req.session.uid);
    req.session.destroy();
    // console.log("logout : "+req.session);
    res.render('homepage');
})
module.exports = router;
