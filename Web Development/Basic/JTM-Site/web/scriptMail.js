/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function sendMailAjax() {
    $("#status-text").value = "Sending...";

    var subject = document.getElementById("subject").value;
    var body = document.getElementById("body").value;
    var receiver = document.getElementById("receiver").value;
    var gusername = document.getElementById("gusername").value;
    var gpassword = document.getElementById("gpassword").value;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //Response
            $("#status-text").html(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", "sendMail?subject=" + subject + "&body=" + body + "&receiver=" + receiver + "&gusername=" + gusername +
            "&gpassword=" + gpassword, true);
    xmlhttp.send();
}

