<?php
$noNavbar = '';
$pageTitle = 'SignUp';
$images = "layout/images/";
include "init.php";
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // For printing
    $_SESSION['signup_email'] = htmlentities($_POST['email']);
    $_SESSION['signup_username'] = htmlentities($_POST['username']);
    $_SESSION['signup_firstName'] = htmlentities($_POST['firstName']);
    $_SESSION['signup_lastName'] = htmlentities($_POST['lastName']);
    $_SESSION['signup_phone'] = htmlentities($_POST['phone']);
    $_SESSION['signup_password'] = htmlentities($_POST['password']);
    $_SESSION['signup_userType'] = htmlentities($_POST['userType']);
    // error checking
    $_SESSION["missingError"] = "";
    $_SESSION['userNameError'] = "";
    $_SESSION['emailError'] = "";
    $_SESSION['firstNameError'] = "";
    $_SESSION['lastNameError'] = "";
    $_SESSION['passwordError'] = "";
    $_SESSION["missingError"] = $_SESSION["missingError"] . (empty($_POST['email']) ? " email" : "");
    $_SESSION["missingError"] = $_SESSION["missingError"] . (empty($_POST['username']) ? " username" : "");
    $_SESSION["missingError"] = $_SESSION["missingError"] . (empty($_POST['firstName']) ? " first name" : "");
    $_SESSION["missingError"] = $_SESSION["missingError"] . (empty($_POST['lastName']) ? " last name" : "");
    $_SESSION["missingError"] = $_SESSION["missingError"] . (empty($_POST['phone']) ? " phone number" : "");
    $_SESSION["missingError"] = $_SESSION["missingError"] . (empty($_POST['password']) ? " password" : "");
    $_SESSION["missingError"] = $_SESSION["missingError"] . (empty($_POST['userType']) ? " user type" : "");

    $_SESSION['buyerUsername'] = $buyerUsername = isBuyerUserNameExist($_POST["username"], $db);
    $_SESSION['sellerUsername'] = $sellerUsername = isSellerUserNameExist($_POST["username"], $db);
    $_SESSION['adminUsername'] =$adminUsername = isAdminUserNameExist($_POST["username"], $db);

    $_SESSION['buyeremail'] =$buyerEmail = isBuyerEmailExist($_POST["email"], $db);
    $_SESSION['selleremail']=$sellerEmail = isSellerEmailExist($_POST["email"], $db);
    $_SESSION['adminemail'] =$adminEmail = isAdminEmailExist($_POST["email"], $db);

    $_SESSION['userNameError'] = validateUserName($_POST['username']);
    $_SESSION['emailError'] = validateEmail($_POST['email']);
    $_SESSION['firstNameError'] = validateName($_POST['firstName']);
    $_SESSION['lastNameError'] = validateName($_POST['lastName']);
    $_SESSION['passwordError'] = validatePassword($_POST['password']);
    $_SESSION['phoneError'] = validateNumber($_POST['phone']);
    if((int)$_POST['phone']>99999999999){
        $_SESSION['phoneError'] = "* Only numeric value is allowed and should be less than or equal 11 digits";
    }
    if(strlen($_POST['email'])>70){
        $_SESSION['emailError'] = "* Invalid email format and should be less than or equal 70 characters";
    }
    if(strlen($_POST['username'])>20){
        $_SESSION['userNameError'] = "* Invalid username format and should be less than or equal 20 characters";
    }
    if(strlen($_POST['password'])>50){
        $_SESSION['passwordError'] = "* Password should be at least 8 characters in length and should include at least one upper case letter, and one number and should be less than 50 characters";
    }
    if(strlen($_POST['firstName'])>20){
        $_SESSION['firstNameError'] = "* Only alphabets and white space are allowed and should be less than 20 characters";
    }
    if(strlen($_POST['lastName'])>20){
        $_SESSION['lastNameError'] = "* Only alphabets and white space are allowed and should be less than 20 characters";
    }
    if ($buyerUsername || $sellerUsername || $adminUsername) {
        $_SESSION['userNameError'] = $_SESSION['signup_username'] . " already exists";
    }
    if ($buyerEmail || $sellerEmail || $adminEmail) {
        $_SESSION['emailError'] = $_SESSION['signup_email'] . " already exists";
    }
    if ((!isset($_SESSION['missingError']) || empty($_SESSION['missingError']))
        &&(!isset($_SESSION['userNameError']) || empty($_SESSION['userNameError']))
        && (!isset($_SESSION['emailError']) || empty($_SESSION['emailError']))
        && (!isset($_SESSION['firstNameError']) || empty($_SESSION['firstNameError']))
        && (!isset($_SESSION['lastNameError']) || empty($_SESSION['lastNameError']))
        && (!isset($_SESSION['passwordError']) || empty($_SESSION['passwordError']))
        && (!isset($_SESSION['phoneError']) || empty($_SESSION['phoneError']))) {
        if($_SESSION['signup_userType']=="buyer") {
            $_SESSION['signup_password'] = sha1($_SESSION['signup_password']);
            $_SESSION['id'] = insertBuyer($_SESSION['signup_username'], $_SESSION['signup_password'], $_SESSION['signup_email'], $_SESSION['signup_firstName'], $_SESSION['signup_lastName'], $db);
            insertBuyerPhoneNumber($_SESSION['id'],$_SESSION['signup_phone'],$db);
            $_SESSION['typeOfUser'] = 'buyer';
        }
        else {
            $_SESSION['signup_password'] = sha1($_SESSION['signup_password']);
            $_SESSION['id'] = insertSeller($_SESSION['signup_username'], $_SESSION['signup_password'], $_SESSION['signup_email'], $_SESSION['signup_firstName'], $_SESSION['signup_lastName'], $db);
            insertSellerPhoneNumber($_SESSION['id'],$_SESSION['signup_phone'],$db);
            $_SESSION['typeOfUser'] = 'seller';
        }
        $_SESSION['username'] = $_SESSION['signup_username'];
        header("Location: index.php");
        return;
    }
    else{
        if(isset($_SESSION['missingError']) && !empty($_SESSION['missingError']))
        $_SESSION['missingError'] = "Please enter your " . $_SESSION['missingError'];
        header("Location: signup.php");
        return;
    }
}
?>
    <div class="container-fluid text-center shadow p-2">
        <a href="index.php" class="navbar-brand"  style="text-decoration: none;color: black">
                <img src="<?= $images."Logo2.png" ?>" width="50" height="50" alt="logo">
                Dawrha
            </a>
    </div>
    <div class="row justify-content-evenly container-fluid">
        <div class="col-md-10 row justify-content-center m-5 text-center shadow">
            <div class="col-lg-5 col-md-12 ">
                <form method="POST" action="signup.php" class="form-signin p-5">
                    <h3 class="m-3">Create your account</h3>
                    <p class="lead m-3">Dawrha </p>
                    <div class="input-group mb-4">
                        <span class="input-group-text">@</span>
                        <input type="email" required id="email" class="form-control" placeholder="Email Address" name="email"
                               value="<?php
                               if (isset($_SESSION['signup_email'])) {
                                   echo $_SESSION['signup_email'];
                                   unset($_SESSION['signup_email']);
                               }
                               ?>">
                    </div>
                    <?php
                    if(isset($_SESSION['emailError']) && !empty($_SESSION['emailError'])){
                        echo' <div class="alert alert-danger" role="alert">'.$_SESSION["emailError"].'</div> ';
                        unset($_SESSION['emailError']);
                    }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <input type="text" required id="username" class="form-control" placeholder="Username" name="username"
                               value="<?php
                               if (isset($_SESSION['signup_username'])) {
                                   echo $_SESSION['signup_username'];
                                   unset($_SESSION['signup_username']);
                               }
                               ?>">
                    </div>
                    <?php
                        if(isset($_SESSION['userNameError'])&& !empty($_SESSION['userNameError'])){
                            echo' <div class="alert alert-danger" role="alert">'.$_SESSION["userNameError"].'</div> ';
                            unset($_SESSION['userNameError']);
                        }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-file-person"></i></span>
                        <input type="text" required id="firstName" class="form-control" placeholder="First Name" name="firstName"
                               value="<?php
                               if (isset($_SESSION['signup_firstName'])) {
                                   echo $_SESSION['signup_firstName'];
                                   unset($_SESSION['signup_firstName']);
                               }
                               ?>">
                    </div>
                    <?php
                    if(isset($_SESSION['firstNameError']) && !empty($_SESSION['firstNameError'])){
                        echo' <div class="alert alert-danger" role="alert">'.$_SESSION["firstNameError"].'</div> ';
                        unset($_SESSION['firstNameError']);
                    }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-file-person"></i></span>
                        <input type="text" required id="lastName" class="form-control" placeholder="Last Name" name="lastName"
                               value="<?php
                               if (isset($_SESSION['signup_lastName'])) {
                                   echo $_SESSION['signup_lastName'];
                                   unset($_SESSION['signup_lastName']);
                               }
                               ?>"
                        >
                    </div>
                    <?php
                    if(isset($_SESSION['lastNameError']) && !empty($_SESSION['lastNameError'])){
                        echo' <div class="alert alert-danger" role="alert">'.$_SESSION["lastNameError"].'</div> ';
                        unset($_SESSION['lastNameError']);
                    }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-phone"></i></span>
                        <input type="tel" required id="typePhone" class="form-control" placeholder="Phone Number" name="phone"
                               value="<?php
                               if (isset($_SESSION['signup_phone'])) {
                                   echo $_SESSION['signup_phone'];
                                   unset($_SESSION['signup_phone']);
                               }
                               ?>">

                    </div>
                    <?php
                    if(isset($_SESSION['phoneError'])&& !empty($_SESSION['phoneError'])){
                        echo' <div class="alert alert-danger" role="alert">'.$_SESSION["phoneError"].'</div> ';
                        unset($_SESSION['phoneError']);
                    }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input type="password" required id="password" class="form-control" placeholder="Password" name="password"
                               value="<?php
                               if (isset($_SESSION['signup_password'])) {
                                   echo $_SESSION['signup_password'];
                                   unset($_SESSION['signup_password']);
                               }
                               ?>">
                        <span class="input-group-text" onclick="togglePasswordVisibility()"><i class="bi bi-eye"
                                                                                               id="eyeIcon"></i></span>
                    </div>
                    <?php
                    if(isset($_SESSION['passwordError']) && !empty($_SESSION['passwordError'])){
                        echo' <div class="alert alert-danger" role="alert">'.$_SESSION["passwordError"].'</div> ';
                        unset($_SESSION['passwordError']);
                    }
                    ?>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="userType" id="buyerCheck" value="buyer"
                            <?php
                            if (!isset($_SESSION['signup_userType']) || $_SESSION['signup_userType'] == "buyer") {
                                echo "checked";
                                unset($_SESSION['signup_userType']);
                            }
                            ?>>
                        <label class="form-check-label" for="buyerCheck">Buyer</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="userType" id="sellerCheck" value="seller"
                            <?php
                            if (isset($_SESSION['signup_userType']) && $_SESSION['signup_userType'] == "seller") {
                                echo "checked";
                                unset($_SESSION['signup_userType']);
                            }
                            ?>>
                        <label class="form-check-label" for="sellerCheck">Seller</label>
                    </div>
                    <div class="text-danger">
                        <?php
                        if(isset($_SESSION['missingError']) && !empty($_SESSION['missingError'])){
                            echo' <div class="alert alert-danger" role="alert">'.$_SESSION["missingError"].'</div> ';
                            unset($_SESSION['missingError']);
                        }
                        ?>
                    </div>
                    <p class="mb-4 text-secondary">By clicking Sign-up, you agree to our
                        <a href="#" class="link-primary">Terms of Use</a> and our
                        <a href="#" class="link-primary">Privacy Policy</a>.</p>
                    <div class="d-grid gap-2">
                        <input type="submit" class="btn btn-block btn-success text-white rounded-pill btn-lg"
                               value="Sign-up">
                    </div>
                    <span class="d-block text-left my-4 text-muted">— or sign-in —</span>
                    <a href="signin.php" type="button"
                       class="btn btn-block btn-success text-white rounded-pill btn-lg ps-5 pe-5">Sign-in</a>
                </form>
            </div>
            <div class="col-lg-7 col-md-12 order-lg-first">
                <img src=" <?php echo $imgs . "Signup.png" ?>" alt="Login image" class="img-fluid">
            </div>
        </div>
    </div>

<?php include $tpl . "footer.php" ?>