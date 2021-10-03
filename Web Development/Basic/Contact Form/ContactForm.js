/*
This is a function which will check whether your email and phone number are valid or not
Method- Using Regex
*/
function IsValid()
{
    var email=document.getElementById("email").value;
    var phone=document.getElementById("number").value;
    /* 
    In the below regex that \d represent that any digit {10} represent that it must below
    of length 10 
    */
    var phoneformat=/\d{10}/
    /*
    Here ^ represent that the staring of expression [a-zA-Z0-9_-] represents that it must contain any 
    of the given character given in the square bracket then + work like concatenate @ and then [a-zA-Z0-9_-]+ \.
     repesent that it must contain . and then [a-zA-Z0-9_-]{2,4} and then $ tells that it must be at end
     */
    var mailformat = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;
    if(email.match(mailformat) && phone.match(phoneformat))
    {  
        window.alert("We will contact you within few hours");
        return true;
    }
    else
    {
    window.alert("Invalid email address or phone number provided!");
    return false;
    }
}
