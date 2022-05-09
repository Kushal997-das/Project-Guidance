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
        <div class="section" style="padding:30px;margin-top:60px;">
    
          <div class="row">
      <div class="col-4">
          <div class="card" >
  <img src="images/backpain.jpg" class="card-img-top" alt="..." style="width: 100%;
    height: 300px;">
  <div class="card-body">
  <h5 class="card-title">Back pain</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </div>
<div class="col-4">
          <div class="card" >
  <img src="images/headache.jpg" class="card-img-top" alt="..." style="width: 100%;
    height: 300px;">
  <div class="card-body">
  <h5 class="card-title">Head Ache</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </div>
<div class="col-4">
          <div class="card" >
  <img src="images/kneepain.jpg" class="card-img-top" alt="..." style="width: 100%;
    height: 300px;">
  <div class="card-body">
  <h5 class="card-title">Knee pain</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
    </div>
</div>
    </div>
        </div>
        <div class="row">
      <div class="col-4">
          <div class="card" >
  <img src="images/thyroid.jpg" class="card-img-top" alt="..." style="width: 100%;
    height: 300px;">
  <div class="card-body">
  <h5 class="card-title">Thyroid</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </div>
<div class="col-4">
          <div class="card" >
  <img src="images/stomach.jpg" class="card-img-top" alt="..." style="width: 100%;
    height: 300px;">
  <div class="card-body">
  <h5 class="card-title">Stomach Pain</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </div>
<div class="col-4">
          <div class="card" >
  <img src="images/skininfection.jpg" class="card-img-top" alt="..." style="width: 100%;
    height: 300px;">
  <div class="card-body">
  <h5 class="card-title">Skin infection</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
    </div>
</div>
    </div>
        </div>
       
      </div>
      
</body>
</html>