<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!---------bootstrao css------------>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" 
  integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
  <!----------------bootstrap jss-->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" 
  integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <style>
        body{
            background: url(bg1.jpeg);
    background-repeat: no-repeat;
	background-size: cover;
    background-position: center;
    width: 100%;
        }
        nav{
          width: 100%;
        }
        
.navbar-custom {
     background: #fff;
    color: #da214f;
}
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
    color: #da214f
}
.navbar-custom .navbar-nav .nav-link {
    color: #da214f;
}
    .navbar-nav {
      margin-left: auto;
      color: #da214f;
  font-size: 20px;
  font-weight: 550;
    }
    nav .sticky{ 
      color: #da214f;
    }
    .nav-item{
      margin-left: 7px;
      margin-right: 7px;
    }
    .navbar-brand{
      font-size: 33px;
      font-weight: 660;
    }
        .box{
            width: 400px;
            margin: 100px auto;
            background: #fff;
            border-radius: 7px;
            box-shadow: 1px 2px 4px rgba(0,0,0,.3);
        }
        .box .heading{
            background: rgb(56, 55, 55);
            border-radius: 7px 7px 0px 0px;
            padding: 10px;
            color: #fff;
            text-align: center;
            font-family: "Rubik";
        }
        .faqs{
            padding: 0px 20px 20px;
        }
        ::-webkit-details-marker{
            float: right;
            margin-top: 3px;
        }
        details{
            background: #f6f6f6;
            padding: 10px;
            border-radius: 7px;
            margin-top: 20px;
            font-family: "Arial";
            font-size: 14px;
            letter-spacing: 1px;
        }
        details summary{
            outline:none;
        }
        .btn{
                font-size: 1em;
                color: #fff;
                background: #da214f;
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                text-transform: uppercase;
                text-decoration: none;
                letter-spacing: 2px;
                border-radius: 25px;
                text-align: center;
                 }
                 @media{
                   body{
                   width: 100%;
                   }
                 }
    </style>
    <title>Document</title>
</head>
<body>
    <nav class="navbar navbar-custom navbar-expand-lg navbar-light sticky-top" style="color: red;">
        <div class="container">
          <a class="navbar-brand" href="#">PetKit</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
              <a class="nav-link" href="http://localhost/adoption%20portal/index.php">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost/adoption%20portal/adopt.php">Adopt</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost/adoption%20portal/faq.php">FAQs</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="http://localhost/adoption%20portal/contactus.php">Contact Us</a>
                </li>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <div class="box">
        <p class="heading" style="font-size: 40px;">FAQs</p>
        <div class=faqs>
            <details>
                <summary style="font-size: 20px;">what is Lorem  iusto magnam ex.</summary>
                <p class="text">Lorem ipsum dolor sit, amet ssimus, facere iure.</p>
            </details>
            <details>
                <summary style="font-size: 20px;">what is Lorem  iusto magnam ex.</summary>
                <p class="text">Lorem ipsum dolor sit, amet ssimus, facere iure.</p>
            </details>
            <details>
                <summary style="font-size: 20px;">what is Lorem  iusto magnam ex.</summary>
                <p class="text">Lorem ipsum dolor gf huufgyf hufuuiu ufuofhufddhufhiufiufiufiuiufu hufhuuhufhuf udfuidfu hudfhufd hfsdhu sit, amet ssimus, facere iure.</p>
            </details>
            <details>
                <summary style="font-size: 20px;">what is Lorem  iusto magnam ex.</summary>
                <p class="text">Lorem ipsum dolor sit, amet ssimus, facere iure.</p>
            </details>
        </div>
    </div>
    <footer class="bg-dark text-center text-white">
      <div class="container p-4 pb-0">
        <section class="mb-4">
          <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
          width: 6%;
          border-radius: 25px;"href="#!" role="button"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
          width: 6%;
          border-radius: 25px;"href="#!" role="button"
            ><i class="fab fa-twitter"></i
          ></a>
          <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
          width: 6%;
          border-radius: 25px;"href="#!" role="button"
            ><i class="fab fa-instagram"></i
          ></a>
          <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
          width: 6%;
          border-radius: 25px;" href="#!" role="button"
            ><i class="fab fa-linkedin-in"></i
          ></a>
          <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
          width: 6%;
          border-radius: 25px;"href="#!" role="button"
            ><i class="fab fa-github"></i
          ></a>
        </section>
      </div>
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2021 Copyright:
        <a class="text-white" href="http://localhost/adoption%20portal/index.php">PetKit</a>
      </div>
    </footer>
</body>
</html>