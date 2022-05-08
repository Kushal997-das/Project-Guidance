<?php
  $pageTitle = "Admins";
  include 'init.php';

  if(!isset($_SESSION['typeOfUser']))
    header("Location: ../signin.php");

  if (isset($_SESSION['typeOfUser']) && $_SESSION['typeOfUser'] != "admin")
    header("Location: ../signin.php");
  
  //check the wanted page [Manage | Edit | Add | Delete] before going there
  $do = isset($_GET['do'])? $_GET['do'] : 'Manage';

  if($do == 'Manage') { //manage page to show all the admins
    //get all of the admins and their phone numbers to list them in the table
    $admins = GetAdmins($db);

    //for the searching
    $name = $id = '';
    $idErr = '';
    if (isset($_POST['search'])) {
      $name = $_POST['name'];
      $id = $_POST['id'];
      $name = input_data($name);
      $id = input_data($id);
      $idErr = validateNumber($id);

      //the priority for the id so first check the id
      if ($id != '' && $idErr == '') {
        $admins = GetAdminByID($id, $db);
      } elseif ($name != "") {
        $admins = GetAdminByUserName($name, $db);
      } else {
        $admins = array();
      }
    }
    if (isset($_POST['showall'])) {
      $admins = GetAdmins($db);
    }
?>
<div class="searching-area container admin">
  <h1 class="text-center">Manage Admins</h1>
  <form action="?do=Manage" method="POST" class="search-form">
    <div class="name">
      <div>UserName:</div>
      <input type="text" name="name" class="form-control">
    </div>
    <div class="id">
      <div>ID:</div>
      <input type="text" name="id" class="form-control">
    </div>
    <div class="search-btns">
      <input type="submit" name="search" value="Search" class="btn btn-primary me-1 ms-1">
      <input type="submit" name="showall" value="Show All" class="btn btn-primary">
    </div>
  </form>
</div>

<div class="container admin">
  <div class="table-responsive">
    <table class="table table-bordered text-center">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="table-dark">#ID</th>
          <th scope="col" class="table-dark">Username</th>
          <th scope="col" class="table-dark">Fullname</th>
          <th scope="col" class="table-dark">Email</th>
          <th scope="col" class="table-dark">Phones</th>
          <th scope="col" class="table-dark">Control</th>
        </tr>
      </thead>
      <tbody>
        <?php 
              if (empty($admins)) {
                echo '<tr>';
                echo '<td scope="row" colspan="6" style="font-size: 25px; color: #c13131;">No Result Found</td>';
                echo '</tr>';
              } else {
              foreach($admins as $admin) {
                echo '<tr>';
                echo '<th scope="row">' . $admin['ID'] . '</th>';
                echo '<td>' . $admin['userName'] . '</td>';
                echo '<td>' . $admin['fName'] . ' ' . $admin['lName'] . '</td>';
                echo '<td>' . $admin['email'] . '</td>';
                echo '<td>';
                $phones = GetAdminPhones($admin['ID'], $db);
                $phoneCount = count($phones);
                for($i = 0; $i < $phoneCount; $i++) {
                  if ($i == $phoneCount - 1) {
                    echo $phones[$i]['phone'];
                  }else {
                    echo $phones[$i]['phone'] . '<br>';
                  }
                }
                echo '</td>';
                echo '<td>
                        <a href="?do=Phones&adminId=' . $admin['ID'] . '" class="btn btn-primary"><i class="fas fa-phone"></i> Phones</a>
                        <a href="?do=Edit&adminId=' . $admin['ID'] . '" class="btn btn-success"><i class="fas fa-edit"></i> Edit</a>
                        <a href="?do=Delete&adminId=' . $admin['ID'] . '" class="btn btn-danger"><i class="fas fa-user-minus"></i> Delete</a>
                      </td>';
                echo '</tr>';
              } }
            ?>
      </tbody>
    </table>
  </div>
  <a href="?do=Add" class="btn btn-primary add-btn"><i class="fa fa-plus"></i> Add New Admin</a>
</div>

<?php
  } elseif ($do == 'Add') {
    //define the error messages and input values
    $usernameErr = $fnameErr = $lnameErr = $phoneErr = $emailErr = $cemailErr = $passErr = $cpassErr = '';
    $userName = $fName = $lName = $phone = $email = $cEmail = $pass = $cPass = '';

    // get the data from the form and validate it then insert into admin table
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
      //get the data from the form
      $userName = $_POST['username'];
      $fName = $_POST['firstname'];
      $lName = $_POST['secondname'];
      $phone = $_POST['phonenum'];
      $email = $_POST['email'];
      $cEmail = $_POST['confirmemail'];
      $pass = $_POST['password'];
      $cPass = $_POST['confirmpassword'];

      //start the validations
      //first we have to filter the input then validate it with the proper function
      $userName = input_data($userName);
      $fName = input_data($fName);
      $lName = input_data($lName);
      $phone = input_data($phone);
      $email = input_data($email);
      $cEmail = input_data($cEmail);
      $pass = input_data($pass);
      $cPass = input_data($cPass);

      //then we call the validation function
      $usernameErr = validateUserName($userName);
      $fnameErr = validateString($fName);
      $lnameErr = validateString($lName);
      $phoneErr = validateNumber($phone);
      $emailErr = validateEmail($email);
      $cemailErr = validateEmail($cEmail);
      $passErr = validatePassword($pass);
      $cpassErr = validatePassword($cPass);

      //then check the size of each input
      $usernameErr = sizeString($userName);
      $fnameErr = sizeString($fName);
      $lnameErr = sizeString($lName);
      $phoneErr = sizeNumber($phone);
      $emailErr = sizeEmail($email);
      $cemailErr = sizeEmail($cEmail);

      //check all of the errors
      if ($usernameErr == "" && $fnameErr == "" && $lnameErr == "" && $phoneErr == "" && $emailErr == "" &&
          $cemailErr == "" && $passErr == "" && $cpassErr == "") {
        //try to get the username and email from the database
        $userResult = isUsedUserName($userName, $db);
        $emailResult = isUsedEmail($email, $db);
        //check if the user name or email is already used by another admin
        if ($userResult || $emailResult) {
          if ($userResult) {
            $usernameErr = "This user name is already used! Try another one";
          }
          if ($emailResult) {
            $emailErr = "This email is already used! Try another one";
          }
        } else {
          //check for the confirm email and pass
          if ($cEmail != $email || $cPass != $pass) {
            if ($cEmail != $email) {
              $cemailErr = "Emails must be the same";
            }
            if ($cPass != $pass) {
              $cpassErr = "Passwords must be the same";
            }
          } else {
            //every thing good and ready to insert the data to db
            AddNewAdmin($userName, $fName, $lName, $email, $pass, $db);
            if ($phone) {
              InsertPhone($userName, $phone, $db);
            }
            $userName = $fName = $lName = $phone = $email = $cEmail = $pass = $cPass = '';
            header("Location: index.php");
          }
        } 
      }
    }
?>
<div class="AdminsForm container mb-5">
  <h1 class="text-center">Add New Admins</h1>
  <form class="col-lg-8 m-auto" action="?do=Add" method="POST">
    <!-- User Name -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="far fa-user"></i></span>
      <input type="text" class="form-control" name="username" placeholder="User Name" aria-label="Username"
        aria-describedby="basic-addon1" value="<?php echo $userName; ?>" required>
    </div>
    <span class="error"><?php echo $usernameErr; ?></span>
    <!-- First Name -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="far fa-user"></i></span>
      <input type="text" class="form-control" name="firstname" placeholder="First Name" aria-label="FirstName"
        aria-describedby="basic-addon1" value="<?php echo $fName; ?>" required>
    </div>
    <span class="error"><?php echo $fnameErr; ?></span>
    <!-- Last Name -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="far fa-user"></i></span>
      <input type="text" class="form-control" name="secondname" placeholder="Last Name" aria-label="LastName"
        aria-describedby="basic-addon1" value="<?php echo $lName; ?>" required>
    </div>
    <span class="error"><?php echo $lnameErr; ?></span>
    <!-- Phone -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="fas fa-phone"></i></span>
      <input type="tel" class="form-control" name="phonenum" placeholder="Phone Number" aria-label="PhoneNumber"
        aria-describedby="basic-addon1" value="<?php echo $phone; ?>">
    </div>
    <span class="error"><?php echo $phoneErr; ?></span>
    <!-- Email -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input type="email" class="form-control" name="email" placeholder="Email" aria-label="Email"
        aria-describedby="basic-addon1" value="<?php echo $email; ?>" required>
    </div>
    <span class="error"><?php echo $emailErr; ?></span>
    <!-- Confirm Email -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input type="email" class="form-control" name="confirmemail" placeholder="Confirm Email" aria-label="ConfirmEmail"
        aria-describedby="basic-addon1" value="<?php echo $cEmail; ?>" required>
    </div>
    <span class="error"><?php echo $cemailErr; ?></span>
    <!-- Password -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
      <input type="password" class="form-control" name="password" id="password1"
        placeholder="Password must be hard & complex" aria-label="Password" aria-describedby="basic-addon1"
        value="<?php echo $pass; ?>" required>
      <span class="input-group-text" onclick="togglePasswordVisibility(1)"><i class="bi bi-eye"
          id="eyeIcon1"></i></span>
    </div>
    <span class="error"><?php echo $passErr; ?></span>
    <!-- Confirm Password -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
      <input type="password" class="form-control" name="confirmpassword" id="password2"
        placeholder="Confirm The Password" aria-label="ConfirmPassword" aria-describedby="basic-addon1"
        value="<?php echo $cPass; ?>" required>
      <span class="input-group-text" onclick="togglePasswordVisibility(2)"><i class="bi bi-eye"
          id="eyeIcon2"></i></span>
    </div>
    <span class="error"><?php echo $cpassErr; ?></span>
    <button type="submit" class="btn btn-primary form-btn">Add</button>
  </form>
</div>
<?php
  }elseif ($do == 'Phones') {
    $phoneErr = '';
    $phone = '';
    $adminId = isset($_GET['adminId']) ?  $_GET['adminId'] : "NotFound";
    if ($adminId == "NotFound") {
      header('Location: index.php');
    } else {
      if(isset($_POST['submit'])) {
        $phone = $_POST['phonenum'];
        $phone = input_data($phone);
        $phoneErr = validateNumber($phone);
        $phoneErr = sizeNumber($phone);
        
        if ($phoneErr == "") {
          if ($phone) {
            $check = CheckPhone($adminId, $phone, $db);
            if (!$check) {
              InsertNewPhone($adminId, $phone, $db);
            }
            $phone = "";
            header("Location: index.php?do=Phones&adminId=" . $adminId . "");
          }
        }
      }
    }
?>
<div class="AdminsForm container mb-5">
  <h1 class="text-center">Delete A Phone</h1>
  <div class="table-responsive w-75 m-auto">
    <table class="table table-bordered text-center">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="table-dark">Phone</th>
          <th scope="col" class="table-dark">Control</th>
        </tr>
      </thead>
      <tbody>
        <?php
            $flag = 1;
            $phones = GetAdminPhones($adminId, $db);
            if (empty($phones)) {
              echo '<tr>';
              echo '<td scope="row" colspan="2" style="font-size: 25px; color: #c13131;">No Result Found</td>';
              echo '</tr>';
            } else {
            foreach($phones as $Printphone) {
              echo '<tr>';
              if ($flag) {
                echo '<th scope="row">' . $Printphone['phone'] . '</th>';
              }else {
                echo '<td>' . $Printphone['phone'] . '</td>';
              }
              echo '<td><a href="?do=DeleteP&adminId=' . $adminId . '&phone=' . $Printphone['phone'] . '" class="btn btn-danger">
                        <i class="fas fa-user-minus"></i> Delete</a>
                    </td>';
              echo '</tr>';
            }}
            ?>
      </tbody>
    </table>
  </div>
  <h1 class="text-center">Add New Phone</h1>
  <form class="col-lg-6 m-auto" action="?do=Phones&adminId=<?php echo $adminId; ?>" method="POST">
    <!-- Phone -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="fas fa-phone"></i></span>
      <input type="tel" class="form-control" name="phonenum" placeholder="Phone Number" aria-label="PhoneNumber"
        aria-describedby="basic-addon1" value="<?php echo $phone; ?>">
    </div>
    <span class="error"><?php echo $phoneErr; ?></span>
    <button type="submit" name="submit" class="btn btn-primary form-btn">Add</button>
  </form>
</div>
<?php
  } elseif ($do == 'DeleteP') {
    $adminId = isset($_GET['adminId']) ?  $_GET['adminId'] : "NotFound";
    $phone = isset($_GET['phone']) ? $_GET['phone'] : "NotFound";
    if ($adminId == "NotFound" || $phone == "NotFound") {
      header('Location: index.php');
    } else {
      $check = CheckPhone($adminId, $phone, $db);
      if ($check) {
        DeletePhone($adminId, $phone, $db);
        header("Location: index.php?do=Phones&adminId=" . $adminId . "");
      }
    }
  } elseif ($do == 'Edit') {
    $adminId = isset($_GET['adminId']) && is_numeric($_GET['adminId']) ? intval($_GET['adminId']) : 0;
    if (!$adminId) {
      header("Location: index.php");
    }
    $admin = GetAdminByID($adminId, $db);
    //define the error messages and input values
    $usernameErr = $fnameErr = $lnameErr = $emailErr = $opassErr = $npassErr = '';
    $oldUserName = $admin[0]['userName'];
    $userName = $admin[0]['userName'];
    $fName = $admin[0]['fName'];
    $lName = $admin[0]['lName'];
    $email = $admin[0]['email'];
    $oPass = $nPass = '';

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
      //get the data from the form
      $userName = $_POST['username'];
      $fName = $_POST['firstname'];
      $lName = $_POST['secondname'];
      $email = $_POST['email'];
      $oPass = $_POST['password'];
      $nPass = $_POST['newpassword'];

      //start the validations
      //first we have to filter the input then validate it with the proper function
      $userName = input_data($userName);
      $fName = input_data($fName);
      $lName = input_data($lName);
      $email = input_data($email);
      $oPass = input_data($oPass);
      if ($nPass != ""){
        $nPass = input_data($nPass);
      }

      //then we call the validation function
      $usernameErr = validateUserName($userName);
      $fnameErr = validateString($fName);
      $lnameErr = validateString($lName);
      $emailErr = validateEmail($email);

      //then check the size of each input
      $usernameErr = sizeString($userName);
      $fnameErr = sizeString($fName);
      $lnameErr = sizeString($lName);
      $emailErr = sizeEmail($email);

      if ($nPass != ""){
        $npassErr = validatePassword($nPass);
      } else {
        $nPass = $oPass;
      }

      //check all of the errors
      if ($usernameErr == "" && $fnameErr == "" && $lnameErr == "" && $emailErr == "" &&
          $opassErr == "" && $npassErr == "") {
        //check the old password
        if (sha1($oPass) == $admin[0]['password']) {
          //check if the username used before or no
          if (isUsedUserNameEdit($oldUserName, $userName, $db)) {
            $usernameErr = "This user name is already used! Try another one";
          } else {
            UpdateAdmin($adminId, $userName, $fName, $lName, $email, $nPass, $db);
            $userName = $fName = $lName = $email = $oPass = $nPass = '';
            header("Location: index.php");
          }
        }else {
          $opassErr = "Wrong Password";
        }
      }
    }
?>
<div class="AdminsForm container mb-5">
  <h1 class="text-center">Edit Admin</h1>
  <form class="col-lg-8 m-auto" action="?do=Edit&adminId=<?php echo $adminId ?>" method="POST">
    <!-- User Name -->
    <label for="username" class="form-label ms-3">User Name</label>
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="far fa-user"></i></span>
      <input type="text" class="form-control" name="username" id="username" placeholder="User Name"
        aria-label="Username" aria-describedby="basic-addon1" value="<?php echo $userName; ?>" required>
    </div>
    <span class="error"><?php echo $usernameErr; ?></span>
    <!-- First Name -->
    <label for="fname" class="form-label ms-3">First Name</label>
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="far fa-user"></i></span>
      <input type="text" class="form-control" name="firstname" id="fname" placeholder="First Name"
        aria-label="FirstName" aria-describedby="basic-addon1" value="<?php echo $fName; ?>" required>
    </div>
    <span class="error"><?php echo $fnameErr; ?></span>
    <!-- Last Name -->
    <label for="lname" class="form-label ms-3">Last Name</label>
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="far fa-user"></i></span>
      <input type="text" class="form-control" name="secondname" id="lname" placeholder="Last Name" aria-label="LastName"
        aria-describedby="basic-addon1" value="<?php echo $lName; ?>" required>
    </div>
    <span class="error"><?php echo $lnameErr; ?></span>
    <!-- Email -->
    <label for="email" class="form-label ms-3">Email</label>
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input type="email" class="form-control" name="email" id="email" placeholder="Email" aria-label="Email"
        aria-describedby="basic-addon1" value="<?php echo $email; ?>" required>
    </div>
    <span class="error"><?php echo $emailErr; ?></span>
    <!-- Old Password -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
      <input type="password" class="form-control" name="password" id="password1" placeholder="Old Password"
        aria-label="Password" aria-describedby="basic-addon1" value="<?php echo $oPass; ?>" required>
      <span class="input-group-text" onclick="togglePasswordVisibility(1)"><i class="bi bi-eye"
          id="eyeIcon1"></i></span>
    </div>
    <span class="error"><?php echo $opassErr; ?></span>
    <!-- New Password -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
      <input type="password" class="form-control" name="newpassword" id="password2" placeholder="New Password"
        aria-label="NewPassword" aria-describedby="basic-addon1">
      <span class="input-group-text" onclick="togglePasswordVisibility(2)"><i class="bi bi-eye"
          id="eyeIcon2"></i></span>
    </div>
    <span class="error"><?php echo $npassErr; ?></span>
    <button type="submit" class="btn btn-primary form-btn">Edit</button>
  </form>
</div>

<?php
  } elseif ($do == 'Delete') {
    $adminId = isset($_GET['adminId']) && is_numeric($_GET['adminId']) ? intval($_GET['adminId']) : 0;
    if (!$adminId) {
      header("Location: index.php");
    }else {
      $admin = GetAdminByID($adminId, $db);
      if (empty($admin)) {
        header("Location: index.php");
      }
      if(isset($_POST['submit'])) {
        DeleteAdminByID($adminId, $db);
        header("Location: index.php");
      }
    }
?>
<div class="AdminsForm container mb-5">
  <h1 class="text-center">Delete Admin</h1>
  <div class="delete-box shadow">
    <h3 class="text-center">Are you Sure You Want To Delete <b><?php echo $admin[0]['userName'] ?></b></h3>
    <form action="?do=Delete&adminId=<?php echo $adminId; ?>" method="POST" class="text-center">
      <button type="submit" name="submit" class="btn btn-danger">Yes</button>
      <a class="btn btn-success" href="?do=Manage">No</a>
    </form>
  </div>
</div>
<?php
  } else {
    header("Location: index.php");
  }

include $tpl . 'footer.php';
?>