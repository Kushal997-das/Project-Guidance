<?php
ob_start();
$pageTitle = 'Profile';
$imagesUploades = "data/uploads/items/";
include "init.php";
if (!isset($_SESSION['username'])) {
    header("Location: signin.php");
    return;
}
if (isset($_GET['deleteOrderId'])) {
    deleteOrder($_GET['deleteOrderId'], $db);
    header("Location: profileBuyer.php");
    return;
}
$buyerData = getBuyer($db, $_SESSION['username'])[0];
$buyerMobiles = getBuyerMobiles($_SESSION['id'], $db);
$orderedItems = getBuyerOrderedItems($_SESSION['id'], $db);
$pendingOrderedItems = getBuyerPendingOrderedItems($_SESSION['id'], $db);
$acceptedOrderedItems = getBuyerAcceptedOrderedItems($_SESSION['id'], $db);
$rejectedOrderedItems = getBuyerRejectedOrderedItems($_SESSION['id'], $db);
?>


    <div class="container p-3 position-static">
        <div class="row shadow rounded p-3 m-5 text-lg-start text-md-center text-sm-center border-start border-5 border-success">
            <div class="col-lg-3 m-auto">
                <h1 class="card-title"><?=$buyerData['userName']?></h1>
            </div>
            <div class="col-lg-7 m-auto">
                <div class="m-2">
                    <h4 class="d-inline-block">Email: </h4>
                    <a href="mailto:<?= $buyerData["email"] ?>"  class="mb-2 link-dark fa-1x "><h5
                            class="text-muted d-inline-block">
                            <?=$buyerData["email"]?>
                        </h5></a>
                </div>
                <div class="m-2">
                    <h4 class="d-inline-block">Mobile: </h4>
                    <h5 class="mb-2 text-muted d-inline-block ">
                        <ul class="list-group list-group-flush profile_scroll" style="max-height: 120px;overflow: auto">
                            <?php
                            foreach ($buyerMobiles as $mobile) {
                                echo "<li class='list-group-item'> $mobile->phone</li>";
                            }
                            ?>
                    </h5>
                </div>
                <div class="m-2">
                    <h4 class="d-inline-block">Join date: </h4>
                    <h5 class=" mb-2 text-muted d-inline-block"><?= $buyerData["joinDate"] ?></h5>
                </div>
            </div>
            <div class="col-lg-2 m-auto">
                <a href="EditProfile.php" class="link-dark"><i class="bi bi-pencil fa-3x"></i></a>
            </div>
        </div>


        <!------------------------------------------------>
        <!--   Dashboard   -->
        <!------------------------------------------------>
        <div class="row justify-content-around m-3">
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title mt-0 mb-4">Total Reviews</h4>
                        <div class="row flex-row flex-nowrap justify-content-evenly">
                            <div style="width: fit-content">
                                <i class="bi bi-people-fill fa-4x"></i>
                            </div>
                            <div class="text-end" style="width: fit-content">
                                <h2 class="fw-normal pt-2 mb-1 text-center"> <?= $buyerData["likes"] + $buyerData["disLikes"] ?> </h2>
                                <p class="text-muted mb-1 text-center">Review</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title mt-0 mb-4">Total likes</h4>
                        <div class="row flex-row flex-nowrap justify-content-evenly">
                            <div style="width: fit-content">
                                <i class="bi bi-hand-thumbs-up fa-4x"></i>
                            </div>
                            <div class="text-end" style="width: fit-content">
                                <h2 class="fw-normal pt-2 mb-1 text-center"> <?= $buyerData["likes"] ?> </h2>
                                <p class="text-muted mb-1 text-center">Like</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title mt-0 mb-4">Total dislikes</h4>
                        <div class="row flex-row flex-nowrap justify-content-evenly">
                            <div style="width: fit-content">
                                <i class="bi bi-hand-thumbs-down fa-4x"></i>
                            </div>
                            <div class="text-end" style="width: fit-content">
                                <h2 class="fw-normal pt-2 mb-1 text-center"> <?= $buyerData["disLikes"] ?> </h2>
                                <p class="text-muted mb-1 text-center">Dislike</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title mt-0 mb-4">Total transactions</h4>
                        <div class="row flex-row flex-nowrap justify-content-evenly">
                            <div style="width: fit-content">
                                <i class="bi bi-cash-coin fa-4x"></i>
                            </div>
                            <div class="text-end" style="width: fit-content">
                                <h2 class="fw-normal pt-2 mb-1 text-center"> <?= $buyerData["transactions"] ?> </h2>
                                <p class="text-muted mb-1 text-center">Transaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <!------------------------------------------------>
        <!-- pending  ordered  -->
        <!------------------------------------------------>
        <div class="row justify-content-around" id="ordered">
            <div class="jumbotron jumbotron-fluid m-3">
                <div class="container">
                    <h1 class="display-4">Pending ordered Items</h1>
                    <hr class="my-4">
                    <p class="lead">List of all pending ordered items.</p>
                </div>
            </div>
            <div class="col-sm-12 ">
                <section class="row flex-row flex-nowrap p-3 overflow-auto profile_scroll rounded position-static "style="gap: 60px;">
                    <?php
                    foreach ($pendingOrderedItems as $orderedItem) {
                    $imageName = getImageOfAnItem($orderedItem->itemId,$db);
                    $category = getCategory($orderedItem->categoryId, $db)[0];
                    $orderQuantity = getOrder($orderedItem->orderId,$db)[0]->quantity;
                    echo '
                    <div class="col-lg-3 m-0 text-center">
                        <div class="card m-md-auto shadow" style="width: 18rem;">
                                '; ?>
                    <a href="reviewItem.php?do=Manage&itemId=<?= $orderedItem->itemId?>&itemName=<?=$orderedItem->title?>" style="text-decoration: none;color: black;">

                        <?php
                        if($imageName){
                            echo'<img src="'.$imagesUploades. $imageName[0]->image .' " class="card-img-top" alt="Item">';
                        } else {
                            echo'<img src="'.$imagesUploades. 'default.png" class="card-img-top" alt="Item">';
                        }
                        ?>
                        <?php echo '       
                    <div class="card-body">
                                <h5 class="card-title">' . $orderedItem->title . '</h5>
                                <h6 class="card-title">' . $category->categoryName . '</h6>
                                <p class="card-text">' . $orderedItem->description . '</p>
                                <h6 class="card-title">' . $orderedItem->orderPrice . '$</h6>
                                <h6 class="card-title"> Quantity: ' . $orderQuantity . '</h6>
                                <h6 class="card-title">' . $orderedItem->orderDate . '</h6>
                                <div class="card-body">
                                    
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>
                    ';
                        } ?>
<!--                        <a href="profileBuyer.php?deleteOrderId=' . $orderedItem->orderId . '" class="btn btn-danger">Delete</a>-->
                </section>
            </div>
        </div>


        <!------------------------------------------------>
        <!-- accepted  ordered  -->
        <!------------------------------------------------>
        <div class="row justify-content-around" id="ordered">
            <div class="jumbotron jumbotron-fluid m-3">
                <div class="container">
                    <h1 class="display-4">Accepted ordered Items</h1>
                    <hr class="my-4">
                    <p class="lead">List of all accepted ordered items.</p>
                </div>
            </div>
            <div class="col-sm-12 ">
                <section class="row flex-row flex-nowrap p-3 overflow-auto profile_scroll rounded position-static "style="gap: 60px;">
                    <?php
                    foreach ($acceptedOrderedItems as $orderedItem) {
                    $imageName = getImageOfAnItem($orderedItem->itemId,$db);
                    $category = getCategory($orderedItem->categoryId, $db)[0];
                    $orderQuantity = getOrder($orderedItem->orderId,$db)[0]->quantity;
                    echo '
                    <div class="col-lg-3 m-0 text-center">
                        <div class="card m-md-auto shadow" style="width: 18rem;">
                                '; ?>
                    <a href="reviewItem.php?do=Manage&itemId=<?= $orderedItem->itemId?>&itemName=<?=$orderedItem->title?>" style="text-decoration: none;color: black;">

                        <?php
                        if($imageName){
                            echo'<img src="'.$imagesUploades. $imageName[0]->image .' " class="card-img-top" alt="Item">';
                        } else {
                            echo'<img src="'.$imagesUploades. 'default.png" class="card-img-top" alt="Item">';
                        }
                        ?>
                        <?php echo '       
                    <div class="card-body">
                                <h5 class="card-title">' . $orderedItem->title . '</h5>
                                <h6 class="card-title">' . $category->categoryName . '</h6>
                                <p class="card-text">' . $orderedItem->description . '</p>
                                <h6 class="card-title">' . $orderedItem->orderPrice . '$</h6>
                                <h6 class="card-title"> Quantity: ' . $orderQuantity . '</h6>
                                <h6 class="card-title">' . $orderedItem->orderDate . '</h6>
                                <div class="card-body">
                                    
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>
                    ';
                        } ?>
                        <!--                        <a href="profileBuyer.php?deleteOrderId=' . $orderedItem->orderId . '" class="btn btn-danger">Delete</a>-->
                </section>
            </div>
        </div>


        <!------------------------------------------------>
        <!-- rejected  ordered  -->
        <!------------------------------------------------>
        <div class="row justify-content-around" id="ordered">
            <div class="jumbotron jumbotron-fluid m-3">
                <div class="container">
                    <h1 class="display-4">Rejected ordered Items</h1>
                    <hr class="my-4">
                    <p class="lead">List of all rejected ordered items.</p>
                </div>
            </div>
            <div class="col-sm-12 ">
                <section class="row flex-row flex-nowrap p-3 overflow-auto profile_scroll rounded position-static "style="gap: 60px;">
                    <?php
                    foreach ($rejectedOrderedItems as $orderedItem) {
                    $imageName = getImageOfAnItem($orderedItem->itemId,$db);
                    $category = getCategory($orderedItem->categoryId, $db)[0];
                    $orderQuantity = getOrder($orderedItem->orderId,$db)[0]->quantity;
                    echo '
                    <div class="col-lg-3 m-0 text-center">
                        <div class="card m-md-auto shadow" style="width: 18rem;">
                                '; ?>
                    <a href="reviewItem.php?do=Manage&itemId=<?= $orderedItem->itemId?>&itemName=<?=$orderedItem->title?>" style="text-decoration: none;color: black;">

                        <?php
                        if($imageName){
                            echo'<img src="'.$imagesUploades. $imageName[0]->image .' " class="card-img-top" alt="Item">';
                        } else {
                            echo'<img src="'.$imagesUploades. 'default.png" class="card-img-top" alt="Item">';
                        }
                        ?>
                        <?php echo '       
                    <div class="card-body">
                                <h5 class="card-title">' . $orderedItem->title . '</h5>
                                <h6 class="card-title">' . $category->categoryName . '</h6>
                                <p class="card-text">' . $orderedItem->description . '</p>
                                <h6 class="card-title">' . $orderedItem->orderPrice . '$</h6>
                                <h6 class="card-title"> Quantity: ' . $orderQuantity . '</h6>
                                <h6 class="card-title">' . $orderedItem->orderDate . '</h6>
                                <div class="card-body">
                                    
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>
                    ';
                        } ?>
                        <!--                        <a href="profileBuyer.php?deleteOrderId=' . $orderedItem->orderId . '" class="btn btn-danger">Delete</a>-->
                </section>
            </div>
        </div>


    </div>
<?php include $tpl . "footer.php";ob_end_flush();?>