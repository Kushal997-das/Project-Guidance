<?php
ob_start();
$pageTitle = 'Orders';
$images = "layout/images/";
include "init.php";
if (!isset($_SESSION['username'])) {
    header("location: signin.php");
    return;
}
if (!isset($_GET['itemid'])) {
    header("Location: profileSeller.php");
    return;
}
if(isset($_GET['feedback'])){
    if($_GET['feedback']=="like"){
        likeBuyer($_GET['buyerId'],$_GET['buyerUserName'],$db);
    }
    else{
        dislikeBuyer($_GET['buyerId'],$_GET['buyerUserName'],$db);
    }
    header("Location: orders.php?itemid=".$_GET['itemid'] );
    return;
}
$orderDetails = getOrdersOfItem($_GET['itemid'], $db);
$itemName = GetItemByID($_GET['itemid'], $db)[0]['title'];
$CurrentItem = GetItemByID($_GET['itemid'], $db)[0];
$mobileSeller = getSellerMobiles($_SESSION['id'],$db);
if (isset($_GET['deleteOrderId'])) {
    $message = "Hello ".$_GET['buyerUserName']." regarding your order for ".$itemName.", quantity: ".$_GET['quantity'].", price: ".$_GET['price']." ,at address ".$CurrentItem['homeNumber']." ".$CurrentItem['street']." ".$CurrentItem['city']." we want to inform you that it has been declined\n you can communicate with the seller through ".(count($mobileSeller)>0?$mobileSeller[0]->phoneNo:"");
    insertNotificationBuyer($message,$_SESSION['id'],$_GET['buyerId'], $db);
    addToItemQuantity($_GET['itemid'],$_GET['quantity'],$db);
    setOrderRejected($_GET['deleteOrderId'], $db);
    ?>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Feedback</h5>
            </div>
            <div class="modal-body text-center">
                <h6>Rate <?=$_GET['buyerUserName']?></h6>
                <hr>
                <a href="orders.php?itemid=<?=$_GET['itemid']?>&feedback=like&buyerUserName=<?=$_GET['buyerUserName']?>&buyerId=<?=$_GET['buyerId']?>" type="button" class="btn btn-success" data-dismiss="modal">Like  <i class="bi bi-hand-thumbs-up-fill"></i></a>
                <a href="orders.php?itemid=<?=$_GET['itemid']?>&feedback=dislike&buyerUserName=<?=$_GET['buyerUserName']?>&buyerId=<?=$_GET['buyerId']?>" type="button" class="btn btn-secondary">Dislike  <i class="bi bi-hand-thumbs-down-fill"></i></a>

                <p>Your feedback helps us improve our service.</p>
            </div>
            <div class="modal-footer">
                <a href="orders.php?itemid=<?=$_GET['itemid']?>" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</a>
            </div>
        </div>
    </div>
    <?php
}
else if (isset($_GET['acceptOrderId'])) {
    $message = "Hello ".$_GET['buyerUserName']." regarding your order for ".$itemName.", quantity: ".$_GET['quantity'].", price: ".$_GET['price']." ,at address ".$CurrentItem['homeNumber']." ".$CurrentItem['street']." ".$CurrentItem['city']." we want to inform you that it has been accepted\n you can communicate with the seller through ".(count($mobileSeller)>0?$mobileSeller[0]->phoneNo:"");    insertNotificationBuyer($message,$_SESSION['id'],$_GET['buyerId'], $db);
    incrementBuyer_SellerTransactions($_GET['buyerId'],$_SESSION['id'],$_GET['buyerUserName'],$_SESSION['username'],$db);
    setOrderAccepted($_GET['acceptOrderId'], $db);
    ?>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Feedback</h5>
            </div>
            <div class="modal-body text-center">
                <h6>Rate <?=$_GET['buyerUserName']?></h6>
                <hr>
                <a href="orders.php?itemid=<?=$_GET['itemid']?>&feedback=like&buyerUserName=<?=$_GET['buyerUserName']?>&buyerId=<?=$_GET['buyerId']?>" type="button" class="btn btn-success" data-dismiss="modal">Like  <i class="bi bi-hand-thumbs-up-fill"></i></a>
                <a href="orders.php?itemid=<?=$_GET['itemid']?>&feedback=dislike&buyerUserName=<?=$_GET['buyerUserName']?>&buyerId=<?=$_GET['buyerId']?>" type="button" class="btn btn-secondary">Dislike  <i class="bi bi-hand-thumbs-down-fill"></i></a>

                <p>Your feedback helps us improve our service.</p>
            </div>
            <div class="modal-footer">
                <a href="orders.php?itemid=<?=$_GET['itemid']?>" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</a>
            </div>
        </div>
    </div>
    <?php
}
else{
?>
    <div class="container">
        <h1 class="text-center m-5">Orders for <?=$itemName?></h1>

        <table class="table table-hover text-center">
            <thead class="bg-success text-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Order date</th>
                <th scope="col">Buyer</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <?php
            $cnt = count($orderDetails);
            for ($i = 0; $i < $cnt; $i++) {
                $buyer = getBuyerById($orderDetails[$i]->buyerId, $db)[0];
                ?>
                <tr>
                    <th scope="row"><?= $i ?></th>
                    <td> <?= $orderDetails[$i]->orderPrice ?> </td>
                    <td> <?= $orderDetails[$i]->quantity ?> </td>
                    <td> <?= $orderDetails[$i]->orderDate ?> </td>
                    <td> <?= $buyer->userName ?> </td>
                    <td>
                        <a href="orders.php?itemid=<?=$_GET['itemid']?>&acceptOrderId=<?=$orderDetails[$i]->orderId?>&buyerUserName=<?=$buyer->userName?>&price=<?=$orderDetails[$i]->orderPrice?>&quantity=<?=$orderDetails[$i]->quantity?>&orderDate=<?= $orderDetails[$i]->orderDate ?>&buyerId=<?=$orderDetails[$i]->buyerId?>" class="btn btn-success">Accept</a>
                        <a href="orders.php?itemid=<?=$_GET['itemid']?>&deleteOrderId=<?=$orderDetails[$i]->orderId?>&buyerUserName=<?=$buyer->userName?>&price=<?=$orderDetails[$i]->orderPrice?>&quantity=<?=$orderDetails[$i]->quantity?>&orderDate=<?= $orderDetails[$i]->orderDate ?>&buyerId=<?=$orderDetails[$i]->buyerId?>" class="btn btn-danger">Decline</a>
                    </td>
                </tr>
                <?php
            }
            ?>

            </tbody>
        </table>

    </div>
<?php }include $tpl . "footer.php";
ob_end_flush(); ?>