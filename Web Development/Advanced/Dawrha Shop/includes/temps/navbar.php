<?php
  ob_start();
  require 'admin/connect.php' ;
  $func = "includes/functions/";
  require $func . 'controller.php';
  $unSeenFlag = false;
  $images = "layout/images/";
  session_start();

  $_SESSION['noOfNewNotification'] = 0;
  $_SESSION['noOfOldNotification'] = 0;

  if(isset($_SESSION["typeOfUser"]) && $_SESSION["typeOfUser"]==="buyer"){
  $User = getBuyer($db,$_SESSION["username"]);
  $Notifications = getNotificationsForBuyer($db,$User[0]['ID']);
  $_SESSION['userID'] = $User[0]['ID'];
  $_SESSION['not'] = $Notifications;
  foreach($Notifications as $noti){
    if($noti['seen']===0){
      $unSeenFlag = true;
      break;
      }
    }
  }
  else if(isset($_SESSION["typeOfUser"]) && $_SESSION["typeOfUser"]==="seller"){
  $User = getSeller($db,$_SESSION["username"]);
  $Notifications = getNotificationsForSeller($db,$User[0]['ID']);
  $_SESSION['userID'] = $User[0]['ID'];
  $_SESSION['not'] = $Notifications;
  foreach($Notifications as $noti){
    if($noti['seen']===0){
      $unSeenFlag = true;
      break;
    }
  }
}
else if(isset($_SESSION["typeOfUser"]) && $_SESSION["typeOfUser"]==="admin"){
header("Location: signin.php");
}
?>
<?php if(isset($_SESSION["username"])): ?>
<nav class="navbar navbar-expand-lg navbar-dark bg-success ">
  <div class="container-fluid ">
    <a class="navbar-brand ps-2" href="index.php" style=" order:1"><img class="navbar-icon"
        src="<?php echo $images."Logo2.png" ?>" alt="Logo"></a>
    <a class="navbar-brand ms-1 mt-3 m-lg-auto notification-icon me-lg-2" href="#" id="navbarDropdown11" role="button"
      data-bs-toggle="dropdown" aria-expanded="false" style="position: relative; display:inline-block; ">
      <i class="fa fa-bell <?php if($unSeenFlag) echo 'add-red'; else echo 'add-white'; ?>" style="font-size: 23px;"
        id='Notification-bell'></i>
    </a>
    <ul class="dropdown-menu dropdown-menu-notification" aria-labelledby="navbarDropdown11" style="right: 0;">
      <?php foreach($Notifications as $noti): ?>
        <?php if($noti['seen']===0): ?>
      <?php $_SESSION['noOfNewNotification'] = $_SESSION['noOfNewNotification'] +1; ?>
      <li><a class="dropdown-item add-red noti-items-red" href="notification.php"><?php echo
       "Notification From ". $noti['fName']." ".$noti['lName']; ?></a>
      </li>
      <?php endif; ?>
      <?php endforeach; ?>
      <?php if($_SESSION['noOfNewNotification']!=0): ?>
      <li>
        <hr class="dropdown-divider">
      </li>
      <?php endif; ?>
      <?php foreach($Notifications as $noti): ?>
      <?php if($noti['seen']===1): ?>
      <?php $_SESSION['noOfOldNotification'] = $_SESSION['noOfOldNotification'] +1; ?>
      <li><a class="dropdown-item" href="notification.php"><?php echo
       "Notification From ". $noti['fName']." ".$noti['lName']; ?></a></li>
      <?php endif; ?>
      <?php endforeach; ?>
    </ul>

    <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div style=" order:2" class="collapse navbar-collapse justify-content-end align-center" id="navbarSupportedContent">
      <form class="m-auto  d-flex  mt-3 mt-lg-auto" action="index.php" method="GET">
        <input class="form-control me-2 search-input" name="keyword" type="search" placeholder="Search"
          aria-label="Search">
        <input class="btn btn-outline-light" value="Search" type="submit"></input>
      </form>
      <ul class="navbar-nav text-center">
        <li class="nav-item dropdown ">
          <a class="nav-link d-none d-lg-block" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
          </a>
          <ul class="dropdown-menu dropdown-menu-profile mt-3 mt-lg-0 mb-2 mb-lg-0" aria-labelledby="navbarDropdown1"
            style="top: 55px; left: -50px;">
            <?php if($_SESSION["typeOfUser"]==="buyer"): ?>
            <li><a class="dropdown-item mainpage-dropdown-item" href="profileBuyer.php">Profile</a></li>
            <?php elseif($_SESSION["typeOfUser"]==="seller"): ?>
            <li><a class="dropdown-item mainpage-dropdown-item" href="profileSeller.php">Profile</a></li>
            <?php endif; ?>
            <?php if($_SESSION["typeOfUser"]==="buyer"): ?>
            <li><a class="dropdown-item mainpage-dropdown-item"
                href="<?php echo "cart.php?username=".$User[0]['userName']?>">Cart </a></li>
            <?php endif; ?>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item mainpage-dropdown-item" href="logout.php">Log Out</a></li>
          </ul>
        </li>
        <li class="nav-item ">
          <?php if($_SESSION["typeOfUser"]==="buyer"): ?>
          <a class="nav-link active me-lg-3" aria-current="page"
            href="profileBuyer.php"><?php echo $User[0]['fName']." ". $User[0]['lName'] ?></a>
          <?php elseif($_SESSION["typeOfUser"]==="seller"): ?>
          <a class="nav-link active me-lg-3" aria-current="page"
            href="profileSeller.php"><?php echo $User[0]['fName']." ". $User[0]['lName'] ?></a>
          <?php endif; ?>
        </li>
      </ul>
    </div>
  </div>
</nav>
<?php else: ?>
<nav class="navbar navbar-expand-lg navbar-dark bg-success ">
  <div class="container-fluid ">
    <a class="navbar-brand ps-2" href="index.php"><img class="navbar-icon" src="<?php echo $images."Logo2.png" ?>"
        alt="Logo"></a>
    <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end align-center" id="navbarSupportedContent">
      <form class="m-auto  d-flex  mt-3 mt-lg-auto" action="index.php" method="GET">
        <input class="form-control me-2 search-input" name="keyword" type="search" placeholder="Search"
          aria-label="Search">
        <input class="btn btn-outline-light" value="Search" type="submit"></input>
      </form>
      <ul class="navbar-nav text-center">
        <a class="btn btn-outline-light mt-3 mt-lg-0  me-lg-3  " href="signup.php" role="button">Sign Up</a>
        <a class="btn btn-outline-light mt-3 mb-3 mb-lg-0 mt-lg-0  me-lg-3 " href="signin.php" role="button">Log In</a>
      </ul>
    </div>
  </div>
</nav>
<?php endif;
ob_end_flush();
?>