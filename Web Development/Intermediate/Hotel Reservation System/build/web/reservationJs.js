/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function searchHistory() {
    var from = document.getElementById("checkindate").value;
    var to = document.getElementById("checkoutdate").value;
    if (from === "") {
        from = "from";
    } else {
        var d = new Date(document.getElementById("checkindate").value);
        var dt = d.getDate();
        var mn = d.getMonth();
        mn++;
        var yy = d.getFullYear();

        from = dt + "/" + mn + "/" + yy;

    }
    if (to === "") {
        to = "to";
    } else {
        d = new Date(document.getElementById("checkoutdate").value);
        dt = d.getDate();
        mn = d.getMonth();
        mn++;
        yy = d.getFullYear();

        to = dt + "/" + mn + "/" + yy;

    }


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //Response
            $(".table-group-history").html(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", "historySearch?from=" + from + "&to=" + to, true);
    xmlhttp.send();
}