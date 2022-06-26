$(document).ready(function () {
    $(".cap").click(function () {
        // alert("dssdf");
        document.getElementById("sub").disabled = true;
        $.ajax({
            url: '/user/generate_captcha',
            // contentType:'application/json',
            method: 'GET',
            success: function (result) {
                $("#captcha").html(result);
                $("#capca").val(result);
            }

        })
    })
});
function check_captcha(v) {
    var cap_admin = $("#capca").val();
    var cap_user = v;
    if (cap_user.length == 4) {
        if (cap_user == cap_admin) {
            document.getElementById("sub").disabled = false;
            // $("#sub").disabled=false;
        }
        else console.log("NO");
    }
}
// --------------checking contact validity-----------
function checkContact(num) {
    if(num.length !== 10){
        setErrorClass(contact_no,"invalid number"); 
    }
    else{
        $.ajax({
            url: '/user/checkContact',
            // contentType:'application/json',
            data:{num:num},
            method: 'POST',
            success: function (result) {
                // console.log(result);
                if(result==="1"){
                    setErrorClass(contact_no,"Contact Already Present!!!")
                }
                else setSuccessClass(contact_no); 
                
            }
        })
    } 
}
// ------------**************************---------------
// ----Checking Mail Validity------------
function checkEmail(email) {

    const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    console.log(valid);
    if(!valid){
        setErrorClass(mail_id,"Invalid Email");
    }
    else{
        $.ajax({
            url: '/user/checkEmail',
            // contentType:'application/json',
            data:{mail:email},
            method: 'POST',
            success: function (result) {
                // console.log(result);
                if(result==="1"){
                    setErrorClass(mail_id,"Email Already Present!!!")
                }
                else setSuccessClass(mail_id); 
                
            }
        })
    } 
}
// -------**********************----------------------------------------
// ----------Password Checking------------------------------------------
function checkPassword() {
    var p1 = document.getElementById("pwd").value;
    var p2 = document.getElementById("cpwd").value;
    console.log(p1);
    console.log(p2);
    if(p1 == p2){
        setSuccessClass(pwd);
        setSuccessClass(cpwd);
    }
    else{
        setErrorClass(cpwd,'Password Not Matching');
        setErrorClass(pwd,'Password Not Matching');
    }
}
// ----------******************--------------
// form.addEventListener('submit', e => {
// 	e.preventDefault();
// });
function setErrorClass(input,message) {
    const formGroup = input.parentElement;
    formGroup.querySelector('p').innerHTML=message;
    formGroup.className='form-group error';
}
function setSuccessClass(input) {
        const formGroup = input.parentElement;
        formGroup.className = 'form-group success';
    }