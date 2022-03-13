<%-- 
    Document   : changeProfileDataView
    Created on : Jan 12, 2021, 2:14:49 PM
    Author     : Tawfik
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
    String id = request.getParameter("hiddenId");
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Change Profile Data</title>
        <meta charset="UTF-8">
        <link rel="icon" href="hotelicon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <script>
            function checkForm(form)
            {
                if (form.email.value === "") {
                    form.email.value = "email";
                }
                if (form.password.value === "") {
                    form.password.value = "password";
                }
                if (form.displayname.value === "") {
                    form.displayname.value = "displayname";
                }
                if (form.phone.value === "") {
                    form.phone.value = "phone";
                }
            }
        </script>
        <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box
            }
            body{
                min-height: 100vh;
                background: #eee;
                display: flex;
                font-family: 'Nunito', sans-serif;
            }
            .container{
                margin: auto;
                width: 500px;
                max-width: 90%
            }
            .container h1{
                text-align: center;
                margin: 50px;
                font-family: 'Nunito', sans-serif;
            }
            .container form{
                width: 100%;
                height: 100%;
                padding: 20px;
                background: white;
                border-radius: 1px;
                box-shadow: 0 8px 16px rgba(0,0,0,.3);
                padding-top: 50px;
                padding-right: 50px;
                padding-left: 50px;
                padding-bottom: 50px;
            }
            .container form .form-control{
                width: 100%;
                height: 50px;
                color: black;
                background: #EAEAEA;
                border-radius: 1px;
                border: 0px solid silver;
                margin: 0px 0 25px 0;
                padding: 0 10px;
                font-family: 'Nunito', sans-serif;
            }
            .container form .btn{
                margin-left: 50%;
                transform: translateX(-50%);
                width: 100%;
                height: 50px;
                border: none;
                outline: none;
                background: linear-gradient(to right,rgba(79,172,254,.8),rgba(0,242,254,.8));
                cursor: pointer;
                font-size: 16px;
                text-transform: uppercase;
                color: white;
                border-radius: 1px;
                transition: .3s;
                font-family: 'Nunito', sans-serif;
            }
            .container form .btn:hover{
                opacity: .7;
            }
            .h1{
                text-align: center;
                margin-bottom: 24px;
                margin: auto;
                color: #222;
                font-family: 'Nunito', sans-serif;
            }
            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #B8B8B8;
                opacity: 1; /* Firefox */
            }
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="hotelicon.png" alt="Hotel Reservation System" width="100" height="100" class="center">
            <h1>Change Profile Data</h1>
            <form onsubmit= "checkForm(this);" action = "changeProfileData">    
                <div class="form-group">
                    <input type="text" class="form-control" name="email" placeholder="Email" >
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Password" >
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="displayname" placeholder="Display Name" >
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="phone" placeholder="Phone Number" >
                </div>
                <div class="form-group">
                    <input type="hidden" class="form-control" name="hiddenUserId" value=<%=id%>>
                </div>
                <input type="submit" class="btn" value="Save">
            </form>
        </div>
    </body>
</html>
