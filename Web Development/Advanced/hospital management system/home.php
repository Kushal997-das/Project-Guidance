<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!----------------bootstrap-js--------------->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.2/js/all.js"></script>
    <link rel="stylesheet" href="style.css">
    <style>
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
            background: url(images/doctor.jpg);
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
      color: #002966;
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
<nav class="navbar navbar-custom navbar-expand-lg navbar-light" >
    <?php require 'navbar.php'; ?>
    
    <section class="banner" id="banner">
			<div class="content">
				<h2 style="font-size:60px;">Make your life better life with us</h2>
					 <a href="adopt.php" class="btn" style="width:130px;background-color:#002966;color:#fff">Get started</a>
			</div>
		</section>
        <div class="section">
      <div class="container">
        <div class="content-section">
          <div class="title">
            <h1>Get started</h1>
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
          <img src="images/doctor.png" style="height:450px;">
        </div>
      </div>
      </div>
</body>
</html>