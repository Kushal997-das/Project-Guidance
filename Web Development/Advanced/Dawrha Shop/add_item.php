<?php
ob_start();
$pageTitle = 'Add Item';
include "init.php";
if (!isset($_SESSION['username']) || (isset($_SESSION['typeOfUser']) && $_SESSION['typeOfUser'] != 'seller')) {
    header("Location:index.php");
    return;

}

if (isset($_POST['done'])) {
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
    $_SESSION['DBER'] = 0;
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
    $_SESSION['item_namerr'] = "";
    $_SESSION['description_er'] = "";
    $_SESSION["pricerr"] = "";
    $_SESSION['home_er'] = "";
    $_SESSION["cat_er"] = "";
    $_SESSION["city_er"] = "";
    $_SESSION["country_er"] = "";
    $_SESSION['quantity_er'] = "";
    if ($_SESSION['discount_item'] == "") {
        $_SESSION['discount_item'] = 0;
    }


    //validate title name
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

    if ($_SESSION['home_er'] == "" && $_SESSION['quantity_er'] == "" && $_SESSION['description_er'] == "" && $_SESSION['item_namerr'] == "" && $_SESSION["pricerr"] == "" && $_SESSION["cat_er"] == "" && $_SESSION["country_er"] == "" && $_SESSION["st_er"] == "") {
        insertItem($_SESSION['item_name'], $_SESSION['description_item'], $_SESSION['price'], $_SESSION['quantity_item']
            , $_SESSION['categoryId'], $_SESSION['discount_item'], $_SESSION['id'], $_SESSION['homeNum'], $_SESSION['st'],
            $_SESSION['city'], $_SESSION['country'], $db);
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
        $_SESSION['DBER'] = 1;

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
            insertImage($arrFile, $db);
        }
    } else {
        header("Location:add_item.php");
        return;

    }
    if ($_SESSION['DBER'] == 1) {
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
        header("Location:profileSeller.php");
        return;
    }
}
?>
    <div class="container-fluid ">
        <div class=" row justify-content-center  ">
            <div class=" col-md-10 row  justify-content-center m-5 text-center input-group-lg shadow">
                <div class="display h1 mt-4 mb-4">Add Item</div>
                <div class=" col-lg-5 col-md-12 col-sm-6">
                    <form action="add_item.php" method="POST" id="contactFrom" enctype="multipart/form-data"
                          style="height: fit-content;">
                        <div class="mb-4 input-group ">
                            <input type="name" class="form-control" placeholder="Item Name" name="name" required
                                   autofocus value="<?php
                            if (isset($_SESSION["item_name"])) {
                                echo $_SESSION["item_name"];
                                unset($_SESSION["item_name"]);
                            }
                            ?>">
                        </div>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION["item_namerr"])) {
                                echo $_SESSION["item_namerr"];
                                unset($_SESSION["item_namerr"]);
                            } ?></p>
                        <div class=" mb-4 input-group">
            <textarea placeholder="Description" rows="2" class="form-control" id="exampleFormControlTextarea1"
                      name="description"><?php if (isset($_SESSION["description_item"])) {
                    echo $_SESSION["description_item"];
                    unset($_SESSION["description_item"]);
                }; ?></textarea>
                        </div>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION["description_er"])) {
                                echo $_SESSION["description_er"];
                                unset($_SESSION["description_er"]);
                            } ?></p>
                        <div class="input-group  mb-4">
                            <select required value="<?php if (isset($_SESSION["categoryId"])) {
                                echo $_SESSION["categoryId"];
                                unset($_SESSION["categoryId'"]);
                            } ?>" class="form-select " id="inputGroupSelect02" name="category" required>
                                <option selected> Choose Categories...</option>
                                <?php $row = getCategories($db);
                                foreach ($row as $cat):
                                    echo '<option value="' . $cat['categoryId'] . '">' . $cat['categoryName'] . '</option>'; ?>
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
                                <input required min=0 type="number" name="homenumber" class="form-control"
                                       placeholder="Home Number"
                                       value="<?php if (isset($_SESSION["homeNum"])) {
                                           echo $_SESSION["homeNum"];
                                           unset($_SESSION["homeNum"]);
                                       } ?>">
                            </div>
                            <div class="col-sm-6">
                                <input required name="street" type="text" class="form-control" placeholder="Street"
                                       aria-label="streett"
                                       value="<?php if (isset($_SESSION["st"])) {
                                           echo $_SESSION["st"];
                                           unset($_SESSION["st"]);
                                       } ?>">
                            </div>
                        </div>
                        <p class="diplay text-danger ">
                            <?php
                            if (isset($_SESSION["st_er"])) {
                                echo $_SESSION["st_er"];
                                unset($_SESSION["st_er"]);
                            } ?>
                        </p>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION['home_er'])) {
                                echo $_SESSION['home_er'];
                                unset($_SESSION['home_er']);
                            } ?></p>
                        <div class="row g-2 mb-4">
                            <div class="col-sm-6">
                                <input required type="text" name="city" class="form-control" placeholder="City"
                                       aria-label="City" value="<?php if (isset($_SESSION["city"])) {
                                    echo $_SESSION["city"];
                                    unset($_SESSION["city"]);
                                } ?>">
                            </div>
                            <div class="col-sm-6">
                                <input required name="country" type="text" class="form-control" placeholder="Country"
                                       aria-label="country"
                                       value="<?php if (isset($_SESSION["country"])) {
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
                                   required class="form-control  "
                                   aria-label="Dollar amount (with dot and two decimal places)">
                            <span class="input-group-text bg-success text-light">$</span>
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
                        </div>
                        <div class="input-group  mb-4 ">
                            <input name="files[]" type="file" class="form-control " id="inputGroupFile04" multiple
                                   aria-describedby="inputGroupFileAddon04 " aria-label="Upload"/>
                        </div>
                        <div class="input-group mb-4" id="input_div">
                            <input required class="form-control " type="number" placeholder="Quantity" name="quantity"
                                   size="25" min=0
                                   id=" counting" value="<?php if (isset($_SESSION["quantity_item"])) {
                                echo $_SESSION["quantity_item"];
                                unset($_SESSION["quantity_item"]);
                            } ?>">
                        </div>
                        <p class="diplay text-danger mb-2">
                            <?php if (isset($_SESSION['quantity_er'])) {
                                echo $_SESSION['quantity_er'];
                                unset($_SESSION['quantity_er']);
                            } ?></p>
                        <button class="btn  btn-success text-align-light mt-2 mb-4" type="submit" name="done">Add
                            item
                        </button>
                    </form>
                </div>
                <div class="col-lg-6 col-md-12">
                    <img src="<?php echo $imgs . "itemPhoto.png" ?>" alt=" item's photo" class="img-fluid">
                </div>
                <?php
                if (isset($_SESSION['DBER']) && $_SESSION['DBER'] != 1) {
                    echo '<div class="alert alert-danger container-md  mt-5 mb-5" style="width: 50%;" role="alert">Invalid submit</div>';
                    unset($_SESSION["DBER"]);
                }
                if (isset($_SESSION['DBER'])) {
                    unset($_SESSION['DBER']);
                }
                ?>
            </div>
        </div>
    </div>
    </div>
<?php include $tpl . "footer.php";
ob_end_flush();
?>