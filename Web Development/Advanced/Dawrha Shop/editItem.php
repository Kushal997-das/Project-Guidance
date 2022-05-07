<?php
ob_start();
$pageTitle = 'Edit Item';
include "init.php";


if (!isset($_SESSION['username']) || (isset($_SESSION['typeOfUser']) && $_SESSION['typeOfUser'] != 'seller')) {
    header("Location:index.php");
    return;
}


if (isset($_POST['DONE'])) {
    //filter data
    $_SESSION["item_name"] = input_data($_POST['name']);
    $_SESSION["price"] = input_data($_POST['priceOfItem']);
    $_SESSION["discount_item"] = input_data($_POST['discountOfItem']);
    $_SESSION["quantity_item"] = input_data($_POST['quantity']);
    $_SESSION["description_item"] = input_data($_POST['description']);
    $_SESSION["city"] = input_data($_POST['city']);
    $_SESSION["country"] = input_data($_POST['country']);
    $_SESSION["categoryId"] = input_data($_POST['category']);
    $_SESSION['homeNum'] = input_data($_POST['homenumber']);
    $_SESSION['st'] = input_data($_POST['street']);
    $_SESSION['st_er'] = "";
    $_SESSION["pricerr"] = "";
    $_SESSION['item_namerr'] = "";
    $_SESSION['description_er'] = "";
    $_SESSION["cat_er"] = "";
    $_SESSION['home_er'] = "";
    $_SESSION["city_er"] = "";
    $_SESSION["country_er"] = "";
    $_SESSION['DB_er'] = "";
    $_SESSION['quantity_er'] = "";
    if ($_SESSION['discount_item'] == "") {
        $_SESSION['discount_item'] = 0;
    }

    if (strlen($_SESSION['item_name']) > 20) {
        $_SESSION['item_namerr'] = "* Title item is Longer 20 character";
    }
    //validate description
    if (strlen($_SESSION['description_item']) > 300) {
        $_SESSION['description_er'] = "* Description Item is Longer Than 300 character";
    }
    if (strlen($_SESSION['city']) > 30) {
        $_SESSION['city_er'] = "* City Name is Longer Than 30 character";
    }
    if (strlen($_SESSION['country']) > 30) {
        $_SESSION['country_er'] = "*Country Name is Longer Than 30 character";
    }
    if ($_SESSION['homeNum'] > 99999999999) {
        $_SESSION['home_er'] = "* Home Number is Longer Than 11 digit";

    }
    if ($_SESSION['quantity_item'] > 99999999999) {
        $_SESSION['quantity_er'] = "* Quantity  is Longer Than 11 digit";

    }
    //validate priceItem
    if (!(filter_var($_SESSION["price"], FILTER_VALIDATE_FLOAT) === 0 || filter_var($_SESSION["price"], FILTER_VALIDATE_FLOAT)) || floatval($_SESSION["price"]) < 0) {
        $_SESSION["pricerr"] = "* Invalid Number";
    }

    //street validation
    if (!ctype_alpha(str_replace(' ', '', $_SESSION['st']))) {
        $_SESSION["st_er"] = "* Only Alphabets and White Space Are Allowed";
    }
    //validate city & country
    if ((!ctype_alpha(str_replace(' ', '', $_SESSION['city']))) || (!ctype_alpha(str_replace(' ', '', $_SESSION['country'])))) {
        $_SESSION["country_er"] = "* Only Alphabets and White Space Are Allowed";
    }
    //validate Category
    if ($_SESSION["categoryId"] == "Choose Categories...") {
        $_SESSION["cat_er"] = " * Please Choose Category";
    }


    if ($_SESSION['city_er'] == "" && $_SESSION['quantity_er'] == "" && $_SESSION['home_er'] == "" && $_SESSION['description_er'] == "" && $_SESSION['item_namerr'] == "" && $_SESSION["pricerr"] == ""
        && $_SESSION["cat_er"] == "" && $_SESSION["country_er"] == "" && $_SESSION["st_er"] == "") {
        updateTitle($db, $_SESSION['itemID'], $_SESSION['item_name']);
        updatePrice($db, $_SESSION['itemID'], $_SESSION['price']);
        updateDescription($db, $_SESSION['itemID'], $_SESSION['description_item']);
        updateCountry($db, $_SESSION['itemID'], $_SESSION['country']);
        updateCity($db, $_SESSION['itemID'], $_SESSION['city']);
        updateStreet($db, $_SESSION['itemID'], $_SESSION['st']);
        updateCategory($db, $_SESSION['itemID'], $_SESSION['categoryId']);
        updateQuantity($db, $_SESSION['itemID'], $_SESSION['quantity_item']);
        updateDiscount($db, $_SESSION['itemID'], $_SESSION['discount_item']);
        $_SESSION['DB_er'] = 1;


        $targetDir = "data/uploads/items/";
        $allowTypes = array('jpg', 'png', 'jpeg', 'gif', 'JPG', 'PNG', 'JPEG', 'GIF', 'TIFF', 'PSD', 'PDF', 'EPS', 'AI', 'INDD', 'RAW', 'tiff', 'psd', 'pdf', 'eps', 'ai', 'indd', 'raw', 'jfif', 'JFIF', 'webp', 'WEBP');
        $fileNames = array_filter($_FILES['files']['name']);
        $arrFile = array();
        if (!empty($fileNames)) {
            foreach ($_FILES['files']['name'] as $key => $val) {
                $fileName = basename($_FILES['files']['name'][$key]);
                $randomName = uniqid() . "-" . time();
                $fileType = pathinfo($fileName, PATHINFO_EXTENSION);
                $newfilename = $randomName . '.' . $fileType;
                $targetFilePath = $targetDir . $newfilename;
                if (in_array($fileType, $allowTypes)) {
                    if (move_uploaded_file($_FILES["files"]["tmp_name"][$key], $targetFilePath)) {
                        array_push($arrFile, $newfilename);
                    }
                }
            }
        }

        if (!empty($arrFile)) {
            updateImageItem($db, $arrFile, $_SESSION['itemID']);
        }
    } else {
        header("Location:editItem.php?id=" . $_SESSION['itemID']);
        return;
    }
    if ($_SESSION['DB_er'] == 1) {
        $_SESSION["item_name"] = "";
        $_SESSION["price"] = "";
        $_SESSION["discount_item"] = "";
        $_SESSION["quantity_item"] = "";
        $_SESSION["description_item"] = "";
        $_SESSION["city"] = "";
        $_SESSION["country"] = "";
        $_SESSION["categoryId"] = "";
        $_SESSION['homeNum'] = "";
        $_SESSION['st'] = "";
        $_SESSION['st_er'] = "";
        $_SESSION['item_namerr'] = "";
        $_SESSION['description_er'] = "";
        $_SESSION["pricerr"] = "";
        $_SESSION['home_er'] = "";
        $_SESSION["cat_er"] = "";
        $_SESSION["city_er"] = "";
        $_SESSION["country_er"] = "";
        $_SESSION['DB_er'] = "";
        header("Location:profileSeller.php");
        return;
    }
    header("Location:editItem.php?id=" . $_SESSION['itemID']);
    return;
}


if (!isset($_GET['id'])) {
    header("Location:index.php");
    return;
}

if (isset($_GET['id'])) {
    $_SESSION['itemID'] = $_GET['id'];
}
$oldItem = GetItem($db, $_SESSION['itemID']);
foreach ($oldItem as $item)
    $_SESSION["item_name"] = input_data($item['title']);
$_SESSION['description_item'] = input_data($item['description']);
$_SESSION['discount_item'] = input_data($item['discount']);
$_SESSION['quantity_item'] = input_data($item['quantity']);
$_SESSION['price'] = input_data($item['price']);
$_SESSION['city'] = input_data($item['city']);
$_SESSION['country'] = input_data($item['country']);
$_SESSION['homeNum'] = input_data($item['homeNumber']);
$_SESSION['st'] = input_data($item['street']);
$rows = getCategoryName($item['categoryId'], $db);
foreach ($rows as $i)
    $_SESSION['categoryId'] = $i['categoryId'];
$_SESSION['categoryName'] = $i['categoryName'];

//delete photo
if (isset($_GET['deleteImage'])) {
    deleteItemImage($db, $_SESSION['itemID'], $_GET['deleteImage']);
    header("Location:editItem.php?id=" . $_GET['id']);
    return;
}


?>
    <div class="container-fluid ">
        <div class=" row justify-content-center  ">
            <div class=" col-md-10 row  justify-content-center m-5 text-center input-group-lg shadow">
                <div class="display h1 mt-4 mb-4">Edit Item</div>
                <div class=" col-lg-5 col-md-12 col-sm-6 justify-content-center col-fluid">
                    <form action="editItem.php" method="POST" id="contactFrom" enctype="multipart/form-data">
                        <div class="mb-4 input-group ">
                            <input type="name" class="form-control" placeholder="Item Name" name='name' autofocus
                                   value="<?php if (isset($_SESSION["item_name"])) {
                                       echo $_SESSION["item_name"];
                                       unset($_SESSION["item_name"]);
                                   } ?>">
                        </div>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION["item_namerr"])) {
                                echo $_SESSION["item_namerr"];
                                unset($_SESSION["item_namerr"]);
                            } ?></p>
                        <div class=" mb-4 input-group">
            <textarea placeholder="Description" class="form-control" rows="2"
                      name="description"><?php if (isset($_SESSION['description_item'])) {
                    echo $_SESSION['description_item'];
                    unset($_SESSION['description_item']);
                }; ?>
                    </textarea>
                        </div>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION["description_er"])) {
                                echo $_SESSION["description_er"];
                                unset($_SESSION["description_er"]);
                            } ?></p>
                        <div class="input-group  mb-4">
                            <select value="<?php if (isset($_SESSION["categoryId"])) {
                                echo $_SESSION["categoryId"];
                                unset($_SESSION["categoryId'"]);
                            } ?>" class="form-select " id="inputGroupSelect02" name="category">
                                <?php
                                ?>
                                <?php $row = getCategories($db);
                                foreach ($row as $cat):
                                    if ($cat['categoryId'] == $_SESSION['categoryId']) {
                                        echo '<option selected value="' . $_SESSION['categoryId'] . '">' . $_SESSION['categoryName'] . '</option>';
                                    } else {
                                        echo '<option value="' . $cat['categoryId'] . '">' . $cat['categoryName'] . '</option>';
                                    } ?>
                                <?php endforeach ?>
                            </select>
                            <label class="input-group-text bg-success text-light"
                                   for="inputGroupSelect02">Options</label>
                        </div>
                        <p class="diplay text-danger "><?php
                            if (isset($_SESSION["cat_er"])) {
                                echo $_SESSION["cat_er"];
                                unset($_SESSION["cat_er"]);
                            } ?></p>
                        <div class="row g-2 mb-4">
                            <div class="col-sm-6">
                                <input min=1 type="number" name="homenumber" class="form-control"
                                       placeholder="Home Number" value="<?php if (isset($_SESSION["homeNum"])) {
                                    echo $_SESSION["homeNum"];
                                    unset($_SESSION["homeNum"]);
                                } ?>">
                            </div>
                            <div class="col-sm-6">
                                <input name="street" type="text" class="form-control" placeholder="Street"
                                       aria-label="streett" value="<?php if (isset($_SESSION["st"])) {
                                    echo $_SESSION["st"];
                                    unset($_SESSION["st"]);
                                } ?>">
                            </div>
                        </div>
                        <p class="diplay text-danger "><?php
                            if (isset($_SESSION["st_er"])) {
                                echo $_SESSION["st_er"];
                                unset($_SESSION["st_er"]);
                            } ?></p>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION["home_er"])) {
                                echo $_SESSION["home_er"];
                                unset($_SESSION["home_er"]);
                            } ?></p>
                        <div class="row g-2 mb-4">
                            <div class="col-sm-6">
                                <input type="text" name="city" class="form-control" placeholder="City" aria-label="City"
                                       value="<?php if (isset($_SESSION["city"])) {
                                           echo $_SESSION["city"];
                                           unset($_SESSION["city"]);
                                       } ?>">
                            </div>
                            <div class="col-sm-6">
                                <input name="country" type="text" class="form-control" placeholder="Country"
                                       aria-label="country" value="<?php if (isset($_SESSION["country"])) {
                                    echo $_SESSION["country"];
                                    unset($_SESSION["country"]);
                                } ?>">
                            </div>
                        </div>
                        <p class="diplay text-danger "><?php if (isset($_SESSION["country_er"])) {
                                echo $_SESSION["country_er"];
                                unset($_SESSION["country_er"]);
                            } ?></p>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION["city_er"])) {
                                echo $_SESSION["city_er"];
                                unset($_SESSION["city_er"]);
                            } ?></p>
                        <div class=" input-group mb-4">
                            <input value="<?php if (isset($_SESSION["price"])) {
                                echo $_SESSION["price"];
                                unset($_SESSION["price"]);
                            } ?>" placeholder=" Price" name="priceOfItem" type="text"
                                   class="form-control  " aria-label="Dollar amount (with dot and two decimal places)">
                            <span class="input-group-text bg-success text-light">$</span>
                            <!-- <span class="input-group-text bg-success text-light">0.00</span> -->
                        </div>
                        <p class="diplay text-danger "><?php if (isset($_SESSION["pricerr"])) {
                                echo $_SESSION["pricerr"];
                                unset($_SESSION["pricerr"]);
                            } ?></p>
                        <div class=" input-group mb-4">
                            <input min=0 placeholder="Discount" max=100 name="discountOfItem" type="number"
                                   class="form-control" value="<?php if (isset($_SESSION["discount_item"])) {
                                echo $_SESSION["discount_item"];
                                unset($_SESSION["discount_item"]);
                            } ?>">
                            <span class=" input-group-text  bg-success text-light">$</span>
                            <!-- <span class="input-group-text bg-success text-light">%</span> -->
                        </div>
                        <div class="input-group  mb-4 ">
                            <input name="files[]" type="file" class="form-control " id="inputGroupFile04" multiple
                                   aria-describedby="inputGroupFileAddon04 " aria-label="Upload"/>
                        </div>
                        <div class="input-group mb-4">
                            <input class="form-control" type="number" placeholder="Quantity" name="quantity" min=0
                                   value="<?php if (isset($_SESSION["quantity_item"])) {
                                       echo $_SESSION["quantity_item"];
                                       unset($_SESSION["quantity_item"]);
                                   } ?>">
                        </div>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION['quantity_er'])) {
                                echo $_SESSION['quantity_er'];
                                unset($_SESSION['quantity_er']);
                            } ?></p>
                        <button class="btn  btn-success text-align-light mt-2 mb-4" type="submit" name="DONE">Save
                            item
                        </button>
                    </form>

                </div>
                <?php
                $imageCount = getCountOfImage($db, $_SESSION['itemID']);
                if ($imageCount == 0):?>
                    <div class="col-lg-6 col-md-12">
                        <img src="<?php echo $imgs . "editing.png" ?>" alt=" item's photo" class="img-fluid">
                    </div>
                <?php endif; ?>
                <div class=" col-md-7 row  justify-content-center ">
                    <?php $imagesOfitem = GetImagesByID($_SESSION['itemID'], $db); ?>

                    <?php foreach ($imagesOfitem as $image): ?>
                        <div class="card m-md-auto col-lg-4 border-0 col-sm-5 mb-5 ">
                            <a href="editItem.php?deleteImage=<?php echo $image['image'] ?>&id=<?php echo $_GET['id'] ?>"
                               id="stopRedirect"
                               class="btn btn-danger rounded-pill position-absolute"
                               style="width: fit-content; top: 0;right: 0"
                               onclick="return deleteImage()"><span class="badge b-5"><i
                                            class="bi bi-trash "></i></span></a>
                            <img src="<?php echo $dataimages . $image['image'] ?>" alt=" item's photo"
                                 class="img-fluid">
                        </div>
                    <?php endforeach ?>
                </div>
            </div>
        </div>
    </div>
<?php include $tpl . "footer.php";
ob_end_flush();
?>