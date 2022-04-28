<?php
ob_start();
$pageTitle = 'Edit profile';
$images = "layout/images/";
include "init.php";

// if not signed in return to sign in
if (!isset($_SESSION['username'])) {
    header("Location: signin.php");
    return;
}
if (!isset($_SESSION['password_checked'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_POST['password']) || empty($_POST['password'])) {
            $_SESSION['error'] = "Please enter your password";
            header("Location: EditProfile.php");
            return;
        }
        $password = input_data($_POST['password']);
        $password = sha1($password);
        if ($_SESSION['typeOfUser'] == 'seller') {
            $checkSeller = getSeller($db, $_SESSION['username'])[0];
            if ($password == $checkSeller['password']) {
                $_SESSION['password_checked'] = "checked";
                header("Location: EditProfile.php");
                return;
            } else {
                $_SESSION['error'] = "Incorrect password";
                header("Location: EditProfile.php");
                return;
            }
        } else {
            $checkBuyer = getBuyer($db, $_SESSION['username'])[0];
            if ($password == $checkBuyer['password']) {
                $_SESSION['password_checked'] = "checked";
                echo "checked";
                header("Location: EditProfile.php");
                return;
            } else {
                $_SESSION['error'] = "Incorrect password";
                echo $_SESSION['error'];
                header("Location: EditProfile.php");
                return;
            }
        }
    }
    ?>
    <div class="row justify-content-evenly container-fluid">
    <div class="col-md-10 row justify-content-center m-5 text-center shadow">
        <div class="col-lg-5 col-md-12">
            <form method="POST" action="EditProfile.php" class="form-signin p-5">
                <h3 class="m-3">Enter your password</h3>
                <p class="lead m-3"> Dawrha </p>
                <div class="input-group mb-4">
                    <input type="password" required id="password" class="form-control" placeholder="Password"
                           name="password">
                    <span class="input-group-text" onclick="togglePasswordVisibility()">
            <i class="bi bi-eye" id="eyeIcon"></i>
          </span>
                </div>
                <?php
                if (isset($_SESSION['error']) && !empty($_SESSION['error'])) {
                    echo ' <div class="alert alert-danger" role="alert">' . $_SESSION["error"] . '</div> ';
                    unset($_SESSION['error']);
                }
                ?>
                <div class="d-grid gap-2">
                    <input type="submit" class="btn btn-block btn-success text-white rounded-pill btn-lg"
                           value="Submit">
                </div>
            </form>
        </div>
        <div class="col-lg-7 col-md-12">
            <img src=" <?php echo $imgs . "Security_On-bro.png" ?>" alt="Login image" class="img-fluid">
        </div>
    </div>
    <?php

} else {
    if (isset($_GET['delete_mobile'])) {
        $mobile = input_data($_GET['delete_mobile']);
        echo $mobile;
        if ($_SESSION['typeOfUser'] == 'seller') {
            deleteMobileSeller($_SESSION['id'], $mobile, $db);
        } else {
            deleteMobileBuyer($_SESSION['id'], $mobile, $db);
        }
        header("Location: EditProfile.php");
        return;
    }
    $userDate = "";
    if ($_SESSION['typeOfUser'] == 'buyer') {
        $userDate = getBuyer($db, $_SESSION['username'])[0];
        $_SESSION['Edit_phone'] = getBuyerMobiles($_SESSION['id'], $db);
    } else {
        $userDate = getSeller($db, $_SESSION['username'])[0];
        $_SESSION['Edit_phone'] = getSellerMobiles($_SESSION['id'], $db);
    }
    $_SESSION['Edit_email'] = $userDate['email'];
    $_SESSION['Edit_username'] = $userDate['userName'];
    $_SESSION['Edit_firstName'] = $userDate['fName'];
    $_SESSION['Edit_lastName'] = $userDate['lName'];
    $_SESSION['Edit_password'] = '';
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['mobileForm'])) {
        $mobile = input_data($_POST['phone']);
        echo $mobile;
        $_SESSION['phoneError'] = validateNumber($_POST['phone']);
        if (!empty($_SESSION['phoneError'])) {
            header("Location: EditProfile.php");
            return;
        }
        if ($_SESSION['typeOfUser'] == 'seller') {
            $userAllMobiles = getSellerMobiles($_SESSION['id'], $db);
            foreach ($userAllMobiles as $mobileUser) {
                if ($mobileUser->phoneNo == $mobile) {
                    $_SESSION['phoneError'] = "phone number already exist";
                    header("Location: EditProfile.php");
                    return;
                }
            }
            insertSellerPhoneNumber($_SESSION['id'], $mobile, $db);
        } else {
            $userAllMobiles = getBuyerMobiles($_SESSION['id'], $db);
            foreach ($userAllMobiles as $mobileUser) {
                if ($mobileUser->phone == $mobile) {
                    $_SESSION['phoneError'] = "phone number already exist";
                    header("Location: EditProfile.php");
                    return;
                }
            }
            insertBuyerPhoneNumber($_SESSION['id'], $mobile, $db);
        }
        header("Location: EditProfile.php");
        return;
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // For printing
        $_SESSION['Edit_email'] = htmlentities($_POST['email']);
        $_SESSION['Edit_username'] = htmlentities($_POST['username']);
        $_SESSION['Edit_firstName'] = htmlentities($_POST['firstName']);
        $_SESSION['Edit_lastName'] = htmlentities($_POST['lastName']);
        $_SESSION['Edit_password'] = htmlentities($_POST['password']);
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
        $_SESSION["missingError"] = $_SESSION["missingError"] . (empty($_POST['password']) ? " password" : "");

        $_SESSION['buyerUsernameId'] = $buyerUsernameId = (getBuyerIdByUserName($_POST["username"], $db) != null ? getBuyerIdByUserName($_POST["username"], $db)[0]->id : null);
        $_SESSION['sellerUsernameId'] = $sellerUsernameId = (getSellerIdByUserName($_POST["username"], $db) != null ? getSellerIdByUserName($_POST["username"], $db)[0]->id : null);
        $_SESSION['adminUsernameId'] = $adminUsernameId = getAdminIdByUserName($_POST["username"], $db);

        $_SESSION['buyerEmailId'] = $buyerEmailId = (getBuyerIdByEmail($_POST["email"], $db) != null ? getBuyerIdByEmail($_POST["username"], $db)[0]->id : null);
        $_SESSION['sellerEmailId'] = $sellerEmailId = (getSellerIdByEmail($_POST["email"], $db) != null ? getSellerIdByEmail($_POST["username"], $db)[0]->id : null);
        $_SESSION['adminEmailId'] = $adminEmailId = getAdminIdByEmail($_POST["email"], $db);

        $_SESSION['userNameError'] = validateUserName($_POST['username']);
        $_SESSION['emailError'] = validateEmail($_POST['email']);
        $_SESSION['firstNameError'] = validateName($_POST['firstName']);
        $_SESSION['lastNameError'] = validateName($_POST['lastName']);
        $_SESSION['passwordError'] = validatePassword($_POST['password']);
        $condition1 = false;
        $condition2 = false;
        if ($_SESSION['typeOfUser'] == 'buyer') {
            $condition1 = ($buyerUsernameId && $buyerUsernameId != $_SESSION['id']) || ($sellerUsernameId) || ($adminUsernameId);
            $condition2 = ($buyerEmailId && $buyerEmailId != $_SESSION['id']) || ($sellerEmailId) || ($adminUsernameId);
        } else {
            $condition1 = ($buyerUsernameId) || ($sellerUsernameId && $sellerUsernameId != $_SESSION['id']) || ($adminUsernameId);
            $condition2 = ($buyerEmailId) || ($sellerEmailId && $sellerEmailId != $_SESSION['id']) || ($adminEmailId);
        }
        if ($condition1) {
            $_SESSION['userNameError'] = $_SESSION['Edit_username'] . " already exists";
        }
        if ($condition2) {
            $_SESSION['emailError'] = $_SESSION['Edit_email'] . " already exists";
        }
        if ((!isset($_SESSION['missingError']) || empty($_SESSION['missingError']))
            && (!isset($_SESSION['userNameError']) || empty($_SESSION['userNameError']))
            && (!isset($_SESSION['emailError']) || empty($_SESSION['emailError']))
            && (!isset($_SESSION['firstNameError']) || empty($_SESSION['firstNameError']))
            && (!isset($_SESSION['lastNameError']) || empty($_SESSION['lastNameError']))
            && (!isset($_SESSION['passwordError']) || empty($_SESSION['passwordError']))) {
            if ($_SESSION['typeOfUser'] == "buyer") {
                $_SESSION['Edit_password'] = sha1($_SESSION['Edit_password']);
                updateBuyer($_SESSION['id'], $_SESSION['Edit_username'], $_SESSION['Edit_password'], $_SESSION['Edit_email'], $_SESSION['Edit_firstName'], $_SESSION['Edit_lastName'], $db);
                $_SESSION['username'] = $_SESSION['Edit_username'];
                header("Location: profileBuyer.php");
                return;
            } else {
                $_SESSION['Edit_password'] = sha1($_SESSION['Edit_password']);
                updateSeller($_SESSION['id'], $_SESSION['Edit_username'], $_SESSION['Edit_password'], $_SESSION['Edit_email'], $_SESSION['Edit_firstName'], $_SESSION['Edit_lastName'], $db);
                $_SESSION['username'] = $_SESSION['Edit_username'];
                header("Location: profileSeller.php");
                return;
            }
        } else {
            if (isset($_SESSION['missingError']) && !empty($_SESSION['missingError']))
                $_SESSION['missingError'] = "Please enter your " . $_SESSION['missingError'];
            header("Location: EditProfile.php");
            return;
        }
    }
    ?>
    <div class="row justify-content-evenly container-fluid">
        <div class="col-md-10 row justify-content-center m-5 text-center shadow">
            <div class="col-lg-5 col-md-12 ">
                <form method="POST" action="EditProfile.php" class="form-signin p-5">
                    <h3 class="m-3">Edit your data</h3>
                    <p class="lead m-3">Dawrha </p>
                    <div class="input-group mb-4">
                        <span class="input-group-text">@</span>
                        <input type="email" required id="email" class="form-control" placeholder="Email Address"
                               name="email"
                               value="<?php
                               if (isset($_SESSION['Edit_email'])) {
                                   echo $_SESSION['Edit_email'];
                               }
                               ?>">
                    </div>
                    <?php
                    if (isset($_SESSION['emailError']) && !empty($_SESSION['emailError'])) {
                        echo ' <div class="alert alert-danger" role="alert">' . $_SESSION["emailError"] . '</div> ';
                        unset($_SESSION['emailError']);
                    }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <input type="text" required id="username" class="form-control" placeholder="Username"
                               name="username"
                               value="<?php
                               if (isset($_SESSION['Edit_username'])) {
                                   echo $_SESSION['Edit_username'];
                               }
                               ?>">
                    </div>
                    <?php
                    if (isset($_SESSION['userNameError']) && !empty($_SESSION['userNameError'])) {
                        echo ' <div class="alert alert-danger" role="alert">' . $_SESSION["userNameError"] . '</div> ';
                        unset($_SESSION['userNameError']);
                    }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-file-person"></i></span>
                        <input type="text" required id="firstName" class="form-control" placeholder="First Name"
                               name="firstName"
                               value="<?php
                               if (isset($_SESSION['Edit_firstName'])) {
                                   echo $_SESSION['Edit_firstName'];
                               }
                               ?>">
                    </div>
                    <?php
                    if (isset($_SESSION['firstNameError']) && !empty($_SESSION['firstNameError'])) {
                        echo ' <div class="alert alert-danger" role="alert">' . $_SESSION["firstNameError"] . '</div> ';
                        unset($_SESSION['firstNameError']);
                    }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-file-person"></i></span>
                        <input type="text" required id="lastName" class="form-control" placeholder="Last Name"
                               name="lastName"
                               value="<?php
                               if (isset($_SESSION['Edit_lastName'])) {
                                   echo $_SESSION['Edit_lastName'];
                               }
                               ?>"
                        >
                    </div>
                    <?php
                    if (isset($_SESSION['lastNameError']) && !empty($_SESSION['lastNameError'])) {
                        echo ' <div class="alert alert-danger" role="alert">' . $_SESSION["lastNameError"] . '</div> ';
                        unset($_SESSION['lastNameError']);
                    }
                    ?>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input type="password" required id="password" class="form-control" placeholder="Password"
                               name="password"
                               value="<?php
                               if (isset($_SESSION['Edit_password'])) {
                                   echo $_SESSION['Edit_password'];
                               }
                               ?>">
                        <span class="input-group-text" onclick="togglePasswordVisibility()"><i class="bi bi-eye"
                                                                                               id="eyeIcon"></i></span>
                    </div>
                    <?php
                    if (isset($_SESSION['passwordError']) && !empty($_SESSION['passwordError'])) {
                        echo ' <div class="alert alert-danger" role="alert">' . $_SESSION["passwordError"] . '</div> ';
                        unset($_SESSION['passwordError']);
                    }
                    ?>
                    <div class="text-danger">
                        <?php
                        if (isset($_SESSION['missingError']) && !empty($_SESSION['missingError'])) {
                            echo ' <div class="alert alert-danger" role="alert">' . $_SESSION["missingError"] . '</div> ';
                            unset($_SESSION['missingError']);
                        }
                        ?>
                    </div>
                    <div class="d-grid gap-2">
                        <input type="submit" class="btn btn-block btn-success text-white rounded-pill btn-lg"
                               value="Submit">
                    </div>
                </form>
                <div>
                    <table class="table table-hover ">
                        <tbody class="profile_scroll d-block" style="max-height: 220px; overflow: auto;">
                        <?php
                        foreach ($_SESSION['Edit_phone'] as $phone) {
                            echo "<tr>";
                            echo '<th scope="row" style="width: 100%">' . ($_SESSION['typeOfUser'] == "seller" ? $phone->phoneNo : $phone->phone) . '</th>';
                            echo '<th scope="row" style="width: 100%"><a href="EditProfile.php?delete_mobile=' . ($_SESSION['typeOfUser'] == "seller" ? $phone->phoneNo : $phone->phone) . '" class="btn btn-block btn-danger text-white rounded-pill ">Delete</a></th>';
                            echo "<tr>";
                        }
                        ?>
                        </tbody>
                        <caption>
                            <form action="EditProfile.php" method="post">
                                <div class="input-group mb-4">
                                    <span class="input-group-text"><i class="bi bi-phone"></i></span>
                                    <input type="tel" required id="typePhone" class="form-control"
                                           placeholder="Phone Number" name="phone">
                                    <input type="submit" class="btn btn-block btn-success text-white rounded btn p-3"
                                           value="Add" name="mobileForm">
                                    <br>
                                </div>
                                <div>
                                    <?php
                                    if (isset($_SESSION['phoneError']) && !empty($_SESSION['phoneError'])) {
                                        echo ' <div class="alert alert-danger" role="alert">' . $_SESSION["phoneError"] . '</div> ';
                                        unset($_SESSION['phoneError']);
                                    }
                                    ?>
                                </div>
                            </form>
                        </caption>
                    </table>
                </div>
            </div>
            <div class="col-lg-7 col-md-12 order-lg">
                <img src=" <?php echo $imgs . "Profile_data_bro.png" ?>" alt="Login image" class="img-fluid">
            </div>
        </div>

    </div>
    <?php
}
?>
<?php include $tpl . "footer.php";
ob_end_flush(); ?>