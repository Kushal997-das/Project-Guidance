<?php
  ob_start();
  $pageTitle = 'Notifications';
  include "init.php";
  if(!isset($_SESSION["typeOfUser"]))
    header("Location: logout.php");
  $Notifications = $_SESSION['not'];
  date_default_timezone_set("EET");
  $date = date('Y-m-d', time());
  $date = new DateTime($date);
  if(isset($_GET['likes'])){
    likeSeller($db,$_GET['id']);
    header("Location: notification.php");
  }
  if(isset($_GET['dislikes'])){
    dislikeSeller($db,$_GET['id']);
    header("Location: notification.php");
  }
  
?>

<div class="container pt-5 ">
  <div class="row  justify-content-center">
    <div class="col-lg-9">
      <?php if($_SESSION['noOfNewNotification']==0&&$_SESSION['noOfOldNotification']==0):  ?>
      <div class="alert alert-info m-auto mb-5 text-center" role="alert" style="width: 50%;" role="alert">No
        Notifications yet</div>
      <?php endif; ?>
      <div class="box shadow-sm rounded bg-white mb-3">
        <?php if($_SESSION['noOfNewNotification']!=0): ?>
        <div class="box-title border-bottom p-3">
          <h6 class="m-0">Recent</h6>
        </div>
        <?php endif; ?>
        <div class="box-body p-0">
          <?php foreach($Notifications as $noti): ?>
          <?php if($noti['seen']===0): ?>
          <?php if($_SESSION["typeOfUser"]=='seller'): ?>
          <a style="text-decoration: none; color:black" href="orders.php">
            <div class="
                  p-3
                  d-flex
                  justify-content-between
                  align-items-center
                  bg-light
                  border-bottom
                ">
              <div class="fw-bold mr-3">
                <div><?php echo $noti['message'] ?>
                </div>
                <div class="small">
                  <?php echo
       "Notification From ". $noti['fName']." ".$noti['lName']; ?>
                </div>
              </div>
              <div class="text-right text-muted pt-1" style="min-width: fit-content;">
                <?php
                $date1 = new DateTime($noti['date']);
                $interval = $date1->diff($date);
                if($interval->days == 0 ) echo "Today";
                elseif($interval->days == 1) echo "A Day Ago";
                else echo $interval->days . " Days Ago"; ?>
              </div>
            </div>
          </a>
          <?php else: ?>
          <div class="
                  p-3
                  d-flex
                  justify-content-between
                  align-items-center
                  bg-light
                  border-bottom
                ">
            <div class="fw-bold mr-3">
              <div><?php echo $noti['message'] ?>
              </div>
              <div class="small d-flex justify-content-between pt-3">
                <div class=""> <?php echo
       "Notification From ". $noti['fName']." ".$noti['lName']; ?></div>
                <div class="pe-3">
                  <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Rate <?php echo $noti['fName']." ".$noti['lName'] ?>
                  </button>

                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Feedback</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                          <a type="button" href="notification.php?likes=true&id=<?php echo $noti['sellerId']  ?>"
                            class="btn btn-success" data-bs-dismiss="">Like <i
                              class="bi bi-hand-thumbs-up-fill"></i></a>
                          <a type="button" href="notification.php?dislikes=true&id=<?php echo $noti['sellerId']  ?>"
                            class=" btn
                            btn-secondary">DisLike <i class="bi bi-hand-thumbs-down-fill"></i></a>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                          Your feedback helps us improve our service.
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right text-muted pt-1 " style="min-width: fit-content;">
              <?php $date1 = new DateTime($noti['date']); 
              $interval = $date1->diff($date); 
              if($interval->days == 0 ) echo "Today"; 
              elseif($interval->days == 1) echo "A Day Ago"; 
              else echo $interval->days . " Days Ago"; ?>
            </div>
          </div>
          <?php endif; ?>

          <?php endif; ?>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="box shadow-sm rounded bg-white mb-3">
        <?php if($_SESSION['noOfOldNotification']!=0): ?>
        <div class="box-title border-bottom p-3">
          <h6 class="m-0">Earlier</h6>
        </div>
        <?php endif; ?>
        <div class="box-body p-0">
          <?php foreach($Notifications as $noti): ?>
          <?php if($noti['seen']===1): ?>
          <div class="
                  p-3
                  d-flex
                  justify-content-between
                  align-items-center
                  bg-white
                  border-bottom
                ">
            <div class="fw-normal mr-3">
              <div><?php echo $noti['message'] ?>
              </div>
              <div class="small">
                <?php echo
       "Notification From ". $noti['fName']." ".$noti['lName']; ?>
              </div>
            </div>
            <div class="text-right text-muted pt-1 " style="min-width: fit-content;">
              <?php $date1 = new DateTime($noti['date']); 
              $interval = $date1->diff($date); 
              if($interval->days == 0 ) echo "Today"; 
              elseif($interval->days == 1) echo "A Day Ago"; 
              else echo $interval->days . " Days Ago"; ?>
            </div>
          </div>
          <?php endif; ?>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</div>

<?php 
  include $tpl . "footer.php";
  if(isset($_SESSION["typeOfUser"]) && $_SESSION['typeOfUser']=='buyer')
    setNotificationsSeenForBuyer($db,$_SESSION['userID']);
  elseif(isset($_SESSION["typeOfUser"]) && $_SESSION['typeOfUser']=='seller')
    setNotificationsSeenForSeller($db,$_SESSION['userID']);
  ob_end_flush(); 
?>