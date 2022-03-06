<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Animal Adoption</title>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      <!---------bootstrao css------------>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" 
  integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
  <!----------------bootstrap jss-->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" 
  integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
  <style>
  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

nav .navbar-nav{
  background: transparent;
  padding: 10px 8px;
}
.navbar-custom {
    background-color: #fff;
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
      background: rgb(175, 166, 166);
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
    body{
     width: 100%;
     min-height: 100vh;
     }

   ::-webkit-scrollbar {
       width: 10px;
      }
      ::-webkit-scrollbar-track {
    background: #f1f1f1;
      }
    ::-webkit-scrollbar-thumb {
        background: #888;
        }
      ::selection{
        background: rgb(0,123,255,0.3);
        }
       .content{
       max-width: 1250px;
       margin: auto;
       padding: 0 30px;
    }

        p{
            font-weight: 300;
            color: #111;
        }
        .banner{
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url(images/bg.jpg);
            background-size: cover;
            background-repeat: no-repeat;
	        background-size: cover;
            background-position: center;
            } 
            .banner .content{
                max-width: 900px;
                text-align: center;
            }
            .banner .content h2{
            font-size: 2em;
             color: #fff;
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
                height: 7.3%;
                 }
          
            .section{
                width: 100%;
                background-color: #fff;
                padding-top: 100px;
                margin-bottom: 20px;
                 }
            .section .container{
                 width: 100%;
                 display: block;
                 margin: auto;
                 padding: 10px;
                 justify-content: center;
                 margin-bottom: 20px;
                 height: 75vh;
                 }
            .content-section{
                 float: left;
                 width: 55%;
                 margin-left: 5px;
                 position: relative;
                 justify-content: center;
                }
            .image-section{
                float: right;
                width: 40%;
                position:relative;
                left: 0;
                object-fit: cover;
                }
    .image-section img{
      width: 90%;
      height: 320px;
      padding-top: 10%;
    }
    .content-section .title{
      text-transform: uppercase;
      font-size: 28px;
      color: rgb(223, 32, 64);
    }
    .container .title h1{
      padding-left: 50px;
      font-family:Arial, Helvetica, sans-serif;
      font-size: 1.8em;
      margin-bottom: 8px;
    }
    .content-section .content p{
      margin-top: 15px;
      font-family: sans-serif;
      font-size: 18px;
      line-height: 1.5;
    }
    
   
     @media screen and (max-width: 768px){
      .section .container{
    width: 80%;
    display: block;
    margin: auto;
    padding-top: 100px;
      }
  .content-section{
      float: none;
      width: 100%;
      display: block;
      margin: auto;
    }
   .image-section{
    float: none;
      width: 100%;
      display: block;
      margin: auto;
   }
   .content-section .title{
     text-align: center;
     font-size: 19px;
   }
   .content-section .content .button{
     text-align: center;
   }
   .content-section .content .button a{
     padding: 9px 30px;
   }
   .content-section .social{
     text-align: center;
   }
   .image-section img{
     width: 100%;
     height: auto;
     display: block;
     margin: auto;
   }
   footer{
    float: ;
   }
     }
			</style>
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
		   <section class="banner" id="banner">
			<div class="content">
				<h2>Provide shelter to the animal's by adopting them</h2>
					 <a href="http://localhost/adoption%20portal/adopt.php" class="btn">Adopt</a>
			</div>
		</section>
    
    <div class="section">
      <div class="container">
        <div class="content-section">
          <div class="title">
            <h1>About us</h1>
          </div>
          <div class="content">
           
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis libero officia obcaecati tempore neque repellendus
                 quod accusantium dolor eos non voluptatum aliquid reiciendis iste, fuga laboriosam, recusandae fugit dicta perspiciatis! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam voluptate explicabo consequuntur. Quaerat libero aut nam, culpa numquam inventore, excepturi eligendi blanditiis distinctio perspiciatis mollitia, delectus
                 
                 
                 neque nemo porro minima. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui soluta vel animi ullam ipsa reprehenderit consectetur neque eius a nobis aliquam quibusdam sequi iure facilis dicta placeat, quam, provident quod?
              </p>
              
          </div>
          
        </div>
        <div class="image-section">
          <img src="images/1.jpg">
        </div>
      </div>
      </div>
      
      <footer class="bg-dark text-center text-white">
        <div class="container p-4 pb-0">
          <section class="mb-4">
            <a class="btn btn-outline-light btn-floating m-1" style="width: 6%;"href="#!" role="button"
              ><i class="fab fa-facebook-f"></i
            ></a>
            <a class="btn btn-outline-light btn-floating m-1" style="width: 6%;" href="#!" role="button"
              ><i class="fab fa-twitter"></i
            ></a>
            <a class="btn btn-outline-light btn-floating m-1" style="width: 6%;" href="#!" role="button"
              ><i class="fab fa-instagram"></i
            ></a>
            <a class="btn btn-outline-light btn-floating m-1" style="width: 6%;" href="#!" role="button"
              ><i class="fab fa-linkedin-in"></i
            ></a>
            <a class="btn btn-outline-light btn-floating m-1" style="width: 6%;" href="#!" role="button"
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
