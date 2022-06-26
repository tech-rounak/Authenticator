require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
app.use(sessions({
    secret: "Secret Key",
    saveUninitialized:true,
    // cookie: { maxAge:3600 },
    resave: false
}));

app.use(bodyParser.urlencoded({
    extended:true
}))
app.set("view engine","ejs");
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render("homepage.ejs");
})

const userController=require('./Controllers/userController');
app.use('/user',userController);


app.listen(port,()=>{
    console.log("Server is running at port"+port);
})