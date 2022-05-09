<?php
//this file will be used to write sql commands like insert a new buyer or select items or etc..
// Start homepage functions
function getItems($db)
{
    $sql = "call GetAllitems();";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function getItemsImages($db)
{
    $sql = "call GetAllImages();";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function getCategories($db)
{
    $sql = "call GetAllCategories();";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function getItemsByCategory($db, $categoryName)
{
    $sql = "call getItemsByCertainCategory ('$categoryName');";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function searchForItems($db,$keyWord){
    $sql = "call searchForItemsByKeyword('%$keyWord%');";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

// End homepage functions
// Start Navbar
function getBuyer($db,$username){
  $sql = "CALL `getBuyerWithUserName`('$username');";
  $stmt = $db->query($sql);
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getSeller($db,$username){
  $sql = "CALL `getSellerWithUserName`('$username');";
  $stmt = $db->query($sql);
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}
function getSellerId($db,$id){
  $sql = "select * from seller where ID = $id";
  $stmt = $db->query($sql);
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getNotificationsForBuyer($db,$ownerID){
  $sql = "SELECT DISTINCT n.id, message,date,seen,sellerId,ownerID, s.fName ,s.lName  from notification as n , buyernotification , seller as s WHERE n.id = notificationId and ownerID =". $ownerID ." and s.ID = sellerId ORDER by date DESC;";
  $stmt = $db->query($sql);
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getNotificationsForSeller($db,$ownerID){
  $sql = "SELECT DISTINCT n.id, message,date,seen,buyerId,ownerID, s.fName ,s.lName  from notification as n , sellernotifications , buyer as s WHERE n.id = notificationId and ownerID =" . $ownerID. " and s.ID = buyerId ORDER by date DESC;";
  $stmt = $db->query($sql);
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}
// End Navbar
// Signin functions
function getBuyerPassword_ID($username, $db)
{
    $sql = "SELECT password,ID FROM buyer WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getSellerPassword_ID($username, $db)
{
    $sql = "SELECT password,ID FROM seller WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getAdminPassword_ID($username, $db)
{
    $sql = "SELECT password,ID FROM admin WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

// Signup functions
function isBuyerUserNameExist($username, $db)
{
    $sql = "SELECT 1 FROM buyer WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function isSellerUserNameExist($username, $db)
{
    $sql = "SELECT 1 FROM seller WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function isAdminUserNameExist($username, $db)
{
    $sql = "SELECT 1 FROM admin WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function isBuyerEmailExist($email, $db)
{
    $sql = "SELECT 1 FROM buyer WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":email" => $email));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function isAdminEmailExist($email, $db)
{
    $sql = "SELECT 1 FROM admin WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":email" => $email));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function isSellerEmailExist($email, $db)
{
    $sql = "SELECT 1 FROM seller WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":email" => $email));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function insertCart($db)
{
    $sql = "insert into cart (itemCount,payment) values (0,0)";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $last_id = $db->lastInsertId();
    return $last_id;
}

function insertBuyer($username, $password, $email, $fname, $lname, $db)
{
    $cartID = insertCart($db);
    $sql = "insert into buyer (userName,password,email,fName,lName,cartId) values (:username,:password,:email,:fname,:lname,:cartid)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":username" => $username,
        ":password" => $password,
        ":email" => $email,
        ":fname" => $fname,
        ":lname" => $lname,
        ":cartid" => $cartID
    ));
    $last_id = $db->lastInsertId();
    return $last_id;
}

function insertSeller($username, $password, $email, $fname, $lname, $db)
{
    $sql = "insert into seller (userName,password,email,fName,lName) values (:username,:password,:email,:fname,:lname)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":username" => $username,
        ":password" => $password,
        ":email" => $email,
        ":fname" => $fname,
        ":lname" => $lname
    ));
    $last_id = $db->lastInsertId();
    return $last_id;
}
function insertBuyerPhoneNumber($id,$mobile,$db){
    $sql = "insert into mobilebuyer (mobilebuyer.buyerId,mobilebuyer.phone) values (:id,:mobile)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":id" => $id,
        ":mobile" => $mobile,
    ));
    $last_id = $db->lastInsertId();
    return $last_id;
}
function insertSellerPhoneNumber($id,$mobile,$db){
    $sql = "insert into mobileseller (mobileseller.sellerId,mobileseller.phoneNo) values (:id,:mobile)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":id" => $id,
        ":mobile" => $mobile,
    ));
    $last_id = $db->lastInsertId();
    return $last_id;
}
// Add Item

function insertItem($title,$Des,$price,$quantity,$catId,$discount,$sellerid,$homeNum,$street,$city,$country,$db){
    $sql="INSERT INTO item ( title, description, price, quantity, categoryId,sellerId,discount,homeNumber,street,city,country)
    VALUES ('".$title."', '".$Des."', ".$price.", ".$quantity.", ".$catId.",".$sellerid.",".$discount.", ".$homeNum.",'".$street."','".$city."','".$country."')";
    $stmt=$db->prepare($sql);
    $stmt->execute();
    }

    function checkUnique($db,$homeNum,$street,$city,$country){
        $sql="SELECT COUNT(*) FROM item WHERE  item.homeNumber=".$homeNum." AND item.city='".$city."' AND item.street='".$street."'
         AND item.country='".$country."'";
        $stmt = $db->query($sql);
        $result = $stmt->fetchColumn();
        return $result;
    }

    //image uploading
    function insertImage($Arrimage,$db){
    $itemID=$db->lastInsertId();
    foreach($Arrimage as $image){
        $sql="INSERT INTO itemimage (itemId,image) 
        VALUES (".$itemID.",'".$image."')";
        $stmt=$db->prepare($sql);
        $stmt->execute();
    }
    }


// Seller's profile functions
function getSellerMobiles($id, $db)
{
    $sql = "SELECT phoneNo FROM mobileseller WHERE sellerId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getSellerForSaleItems($id, $db)
{
    $sql = "SELECT * FROM seller,item WHERE seller.ID = item.sellerId AND item.isDeleted = 0 AND item.quantity != 0 AND seller.ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getSellerDeletedItems($id, $db)
{
    $sql = "SELECT * FROM seller,item WHERE seller.ID = item.sellerId AND item.isDeleted = 1 AND seller.ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getSellerSoldOutItems($id, $db)
{
    $sql = "SELECT * FROM seller,item WHERE seller.ID = item.sellerId AND item.isDeleted = 0 AND item.quantity = 0  AND seller.ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getCategory($catId, $db)
{
    $sql = "SELECT * from category WHERE category.categoryId = :catId";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":catId" => $catId));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function shallowDeleteItem($id, $db)
{
    $sql = "UPDATE item set item.isDeleted = 1 WHERE itemId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
}

function retrieveItem($id, $db)
{
    $sql = "UPDATE item set item.isDeleted = 0 WHERE itemId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
}

function permanentlyDeleteItem($id, $db)
{
    $sql = "DELETE FROM item WHERE item.itemId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
}
function getImageOfAnItem($id,$db){
    $sql = "SELECT image from itemimage WHERE itemimage.itemId = :id LIMIT 1";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function getOrdersCount($itemId,$db){
    $sql = "SELECT count(*) FROM orders,item WHERE orders.itemId = item.itemId AND item.itemId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $itemId));
    $rows = $stmt->fetchColumn();
    return $rows;
}
function getPendingOrdersCount($itemId,$db){
    $sql = "SELECT count(*) FROM orders,item WHERE orders.itemId = item.itemId AND item.itemId = :id AND orders.status = 0";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $itemId));
    $rows = $stmt->fetchColumn();
    return $rows;
}
// end profile seller
// Start notifications
function setNotificationsSeenForBuyer($db,$ownerID){
    $sql = "UPDATE notification set seen = 1 where id in (SELECT notificationId from buyernotification WHERE ownerID = :ownerId)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":ownerId" => $ownerID));
    
}
function setNotificationsSeenForSeller($db,$ownerID){
    $sql = "UPDATE notification set seen = 1 where id in (SELECT notificationId from sellernotifications WHERE ownerID = :ownerId)";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":ownerId" => $ownerID));
}
// End notifications

// start edit item
function updateTitle($db,$itemID,$title){
    $sql="UPDATE `item` SET `title` = '".$title."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateDescription($db,$itemID,$Des){
    $sql="UPDATE `item` SET `description` = '".$Des."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updatePrice($db,$itemID,$price){
    $sql="UPDATE `item` SET `price` = '".$price."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateCategory($db,$itemID,$cat){
    $sql="UPDATE `item` SET `categoryId` = '".$cat."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateDiscount($db,$itemID,$discount){
    $sql="UPDATE `item` SET `discount` = '".$discount."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateHomeNumber($db,$itemID,$homeNum){
    $sql="UPDATE `item` SET `homeNumber` = '".$homeNum."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateStreet($db,$itemID,$street){
    $sql="UPDATE `item` SET `street` = '".$street."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateCity($db,$itemID,$city){
    $sql="UPDATE `item` SET `city` = '".$city."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateCountry($db,$itemID,$country){
    $sql="UPDATE `item` SET `country` = '".$country."' WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateQuantity($db,$itemID,$quantity){
    $sql="UPDATE `item` SET `quantity` = ".$quantity." WHERE `item`.`itemId` = ".$itemID."";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
//end edit item

// functions for buyer profile
function getBuyerMobiles($id, $db)
{
    $sql = "SELECT phone FROM mobilebuyer WHERE buyerId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function getBuyerOrderedItems($id, $db)
{
    $sql = "SELECT * FROM buyer,orders,item WHERE buyer.ID = orders.buyerId AND orders.itemId = item.itemId AND buyer.ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function getBuyerPendingOrderedItems($id, $db)
{
    $sql = "SELECT * FROM buyer,orders,item WHERE buyer.ID = orders.buyerId AND orders.itemId = item.itemId AND orders.status = 0 AND buyer.ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function getBuyerAcceptedOrderedItems($id, $db)
{
    $sql = "SELECT * FROM buyer,orders,item WHERE buyer.ID = orders.buyerId AND orders.itemId = item.itemId AND orders.status = 1 AND buyer.ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function getBuyerRejectedOrderedItems($id, $db)
{
    $sql = "SELECT * FROM buyer,orders,item WHERE buyer.ID = orders.buyerId AND orders.itemId = item.itemId AND orders.status = 2 AND buyer.ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function getBuyerDeletedItems($id, $db)
{
    $sql = "SELECT * FROM buyer,item WHERE buyer.ID = item.buyerId AND item.isDeleted = 1 AND buyer.ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function deleteOrder($id,$db){
    $sql = "DELETE FROM orders WHERE orders.orderId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
}
//start cart 

function cartItem($db,$buyerId){
    $sql="SELECT title,price,description,discount,cartitem.quantity ,item.itemId 
            from item ,buyer,cartitem,cart WHERE buyer.cartId = cart.cartId and cartitem.cartId=cart.cartId and 
    buyer.ID=".$buyerId." and cartitem.itemId = item.itemId";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
function deleteItemCart($cartID, $itemID, $db)
{
    $sql = "DELETE FROM cartitem WHERE cartitem.cartId=" . $cartID . " AND cartitem.itemId=" . $itemID . ";";
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
function updateTheCartAfterDeletion($cartID, $finalPrice, $db) {
    $updateSql = "UPDATE cart SET itemCount=itemCount-1, payment=payment-" . $finalPrice . " WHERE cart.cartId=" . $cartID . ";";
    $db->exec($updateSql);
}
function countItemCart($db,$cartID){
    $sql="SELECT COUNT(cartitem.itemId)from cartitem WHERE cartitem.cartId=".$cartID.";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchColumn();
    return $result;
}
function getPayItemcount($db,$cartID){
    $sql="SELECT itemCount,payment from cart WHERE cart.cartId=".$cartID.";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
// end cart

//Start reviewItem
function GetItemByID($id, $db) {
    $sql = "SELECT * FROM item,seller WHERE item.sellerId=seller.ID AND item.itemId=" . $id . ";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
function GetCartIDFromBuyer($id, $db) {
    $sql = "SELECT cartId  FROM buyer WHERE ID=" . $id . ";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
function UpdateItemCount($id, $price, $db) {
    $updateSql = "UPDATE cart SET itemCount=itemCount+1, payment=payment+" . $price . " WHERE cart.cartId=" . $id . ";";
    $db->exec($updateSql);
}
function UpdateItemCountPrice($id, $oldPrice, $newPrice, $db) {
    $updateSql = "UPDATE cart SET payment=payment-" . $oldPrice . "+" . $newPrice ." WHERE cart.cartId=" . $id . ";";
    $db->exec($updateSql);
}
function InsertCartItem($cartID, $itemID, $quantity, $db) {
    $insertSql = "INSERT INTO cartitem (cartId, itemId, quantity) VALUES (" . $cartID . ", " . $itemID . ", " . $quantity . ");";
    $db->exec($insertSql);
}
function UpdateCartItem($cartID, $itemID, $quantity, $db) {
    $updateSql = "UPDATE cartitem SET quantity=" . $quantity . " WHERE cartId=" . $cartID . " AND itemId=" . $itemID . ";";
    $db->exec($updateSql);
}
function SelectQuantityOfItem($cartID, $itemID, $db) {
    $sql = "SELECT quantity FROM cartitem WHERE cartId=" . $cartID . " AND itemId=" . $itemID . ";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
function QuantityOfItem($itemID, $db) {
    $sql = "SELECT quantity FROM item WHERE itemId=" . $itemID . ";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
function CheckBuyerAndItem($cartID, $itemID, $db) {
    $sql = "SELECT * FROM cartitem WHERE cartId=" . $cartID . " AND itemId=" . $itemID . ";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return count($result);
}
function GetImagesByID($itemID, $db) {
    $sql = "SELECT * FROM itemimage WHERE itemId=" . $itemID . ";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
//End reviewItem
// edit profile start
function updateBuyer($id,$username, $password, $email, $fname, $lname, $db)
{
    $sql = "UPDATE buyer SET userName = :username,password = :password,email = :email, fName = :fname,lName = :lname WHERE Id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":username" => $username,
        ":password" => $password,
        ":email" => $email,
        ":fname" => $fname,
        ":lname" => $lname,
        ":id"=>$id
    ));
}

function updateSeller($id,$username, $password, $email, $fname, $lname, $db)
{
    $sql = "UPDATE seller SET userName = :username,password = :password,email = :email, fName = :fname,lName = :lname WHERE Id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":username" => $username,
        ":password" => $password,
        ":email" => $email,
        ":fname" => $fname,
        ":lname" => $lname,
        ":id"=>$id
    ));
}
function getBuyerIdByUserName($username, $db)
{
    $sql = "SELECT id FROM buyer WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getSellerIdByUserName($username, $db)
{
    $sql = "SELECT id FROM seller WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getAdminIdByUserName($username, $db)
{
    $sql = "SELECT id FROM admin WHERE userName = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":username" => $username));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getBuyerIdByEmail($email, $db)
{
    $sql = "SELECT id FROM buyer WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":email" => $email));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getAdminIdByEmail($email, $db)
{
    $sql = "SELECT id FROM admin WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":email" => $email));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function getSellerIdByEmail($email, $db)
{
    $sql = "SELECT id FROM seller WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":email" => $email));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function deleteMobileSeller($sellerId,$mobile,$db){
    $sql = "DELETE FROM mobileseller WHERE mobileseller.sellerId = :id AND mobileseller.phoneNo = :mobile";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $sellerId,":mobile"=>$mobile));
}
function deleteMobileBuyer($buyerId,$mobile,$db){
    $sql = "DELETE FROM mobilebuyer WHERE mobilebuyer.buyerId = :id AND mobilebuyer.phone = :mobile";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $buyerId,":mobile"=>$mobile));
}

// Start order
function makeAnOrder($db,$buyerId,$itemID,$orderPrice,$quantity){

    // Check if the wanted quantity still available or not
    $sql5 = "SELECT item.quantity, item.sellerId, item.title from item WHERE item.itemId = $itemID";
    $stmt5 = $db->query($sql5);
    $result5 = $stmt5->fetchAll(PDO::FETCH_ASSOC);
    $stmt5->closeCursor();

    $sellerID = $result5[0]['sellerId'];
    if((int)$quantity>(int)$result5[0]['quantity'])
        return (int)$result5[0]['quantity'];

    $sql = "call getItemCartWithItemIdandBuyerId($buyerId,$itemID);";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();

    $sql2 = "CALL  deleteFromCartItem(:cartId ,:itemId);";
    $stmt2 = $db->prepare($sql2);
    $stmt2->execute(array(":cartId"=>$result[0]['cartId'],":itemId"=>$result[0]['itemId'] ));
    $stmt2->closeCursor();

    $sql3 = "CALL insertNewOrder(:orderPrice,:quantity,:buyerId,:itemID)";
    $stmt3 = $db->prepare($sql3);
    $stmt3->execute(array(":orderPrice"=>$orderPrice,":quantity"=>$quantity,":buyerId"=>$buyerId,":itemID"=>$itemID ));
    $stmt3->closeCursor();
    
    $sql4 = "UPDATE item set item.quantity = item.quantity - :itemQTY WHERE itemId = :itemIDD;";
    $stmt4 = $db->prepare($sql4);
    $stmt4->execute(array(":itemQTY"=>$quantity,":itemIDD"=>$itemID));
    $stmt4->closeCursor();

    
    $sql6 = "SELECT fName, lName from seller WHERE ID = $sellerID";
    $stmt6 = $db->query($sql6);
    $result6 = $stmt6->fetchAll(PDO::FETCH_ASSOC);
    $stmt6->closeCursor();
    
    $sql7 = "SELECT fName, lName, cartId from buyer WHERE ID = $buyerId";
    $stmt7 = $db->query($sql7);
    $result7 = $stmt7->fetchAll(PDO::FETCH_ASSOC);
    $stmt7->closeCursor();

    $sql10 = "UPDATE cart SET itemCount = itemCount - 1 , payment = payment - :orderPrice WHERE cartId = :buyerId";
    $stmt10 = $db->prepare($sql10);
    $stmt10->execute(array(":orderPrice"=>$orderPrice,":buyerId"=>$buyerId));
    $stmt10->closeCursor();

    date_default_timezone_set("EET");
    $date = date('Y-m-d', time());

    $msg = "Hello ".$result6[0]['fName']." " .$result6[0]['lName'].", " .$result7[0]['fName'] ." ". $result7[0]['lName']." ordered your item: ".$result5[0]['title'].", Quantity: ".$quantity.", Price: ".$orderPrice.", at ".$date;
    
    
    $sql8 = "INSERT INTO notification(message) VALUES('$msg')";
    $db->exec($sql8);
    $notiID = $db->lastInsertId();


    $sql9 = "INSERT INTO sellernotifications VALUES('$notiID','$buyerId','$sellerID')";
    $db->exec($sql9);
    
    return -1;
}

// End order
// edit Item
function GetItem($db,$itemID){
    $sql="SELECT * from item WHERE item.itemId=".$itemID."";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function getCategoryName($catId, $db)
{
    $sql = "SELECT * from category WHERE category.categoryId = ".$catId."";
    $stmt = $db->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
function deleteItemImage($db,$itemID,$image){
    $sql="DELETE from itemimage WHERE itemimage.itemId=".$itemID." and itemimage.image='".$image."';";
    $stmt=$db->prepare($sql);
    $stmt->execute();
}
function updateImageItem($db,$Arrimage,$itemID){
foreach($Arrimage as $image){
    $sql="INSERT INTO itemimage (itemId,image) 
    VALUES (".$itemID.",'".$image."')";
    $stmt=$db->prepare($sql);
    $stmt->execute();
}
}
function getCountOfImage($db,$itemID){
    $sql="SELECT COUNT(image) from itemimage WHERE itemimage.itemId=".$itemID.";";
    $stmt = $db->query($sql);
    $result = $stmt->fetchColumn();
    return $result;
}
// end edit Item
// order page
function getOrdersOfItem($id, $db)
{
    $sql = "SELECT * FROM orders WHERE orders.itemId = :id AND orders.status = 0";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function getBuyerById($id,$db){
    $sql = "SELECT * FROM buyer where ID = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}

function insertNotificationBuyer($message,$sellerid, $ownerid, $db)
{
    $sql1 = "insert into notification (message) values (:message)";
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute(array(
        ":message" => $message
    ));
    $last_id = $db->lastInsertId();
    $sql2 = "insert into buyernotification (notificationId,sellerId,ownerID) values (:notificationId,:sellerid,:ownerid)";
    $stmt2 = $db->prepare($sql2);
    $stmt2->execute(array(
        ":sellerid" => $sellerid,
        ":ownerid" => $ownerid,
        ":notificationId"=>$last_id
    ));

    return $last_id;
}
function likeBuyer($id,$userName,$db)
{
    $sql1 = getBuyer($db,$userName)[0];
    $likes = $sql1['likes']+1;
    $sql = "UPDATE buyer SET likes = :likes WHERE Id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":likes" => $likes,
        ":id"=>$id
    ));
}
function dislikeBuyer($id,$userName,$db)
{
    $sql1 = getBuyer($db,$userName)[0];
    $dislikes = $sql1['disLikes']+1;
    $sql = "UPDATE buyer SET disLikes = :dislikes WHERE Id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":dislikes" => $dislikes,
        ":id"=>$id
    ));
}
function likeSeller($db,$id)
{
    $sql = "UPDATE seller SET likes = likes + 1 WHERE Id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id"=>$id));
}
function dislikeSeller($db,$id)
{
    $sql = "UPDATE seller SET disLikes = disLikes + 1 WHERE Id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id"=>$id));
}

function incrementBuyer_SellerTransactions($buyerid,$sellerid,$buyerUsername,$sellerUsername,$db)
{
    $sql1 = getBuyer($db,$buyerUsername)[0];
    $buyerTransactions = $sql1['transactions']+1;

    $sql2 = "UPDATE buyer SET transactions = :transactions WHERE Id = :buyerid";
    $stmt2 = $db->prepare($sql2);
    $stmt2->execute(array(
        ":transactions" => $buyerTransactions,
        ":buyerid"=>$buyerid
    ));

    $sql3 = getSeller($db,$sellerUsername)[0];
    $sellerTransactions = $sql3['transactions']+1;

    $sql4 = "UPDATE seller SET transactions = :transactions WHERE Id = :sellerid";
    $stmt4 = $db->prepare($sql4);
    $stmt4->execute(array(
        ":transactions" => $sellerTransactions,
        ":sellerid"=>$sellerid
    ));
}

function setOrderAccepted($id,$db){
    $sql = "UPDATE orders SET orders.status = 1 WHERE orders.orderId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
}
function setOrderRejected($id,$db){
    $sql = "UPDATE orders SET orders.status = 2 WHERE orders.orderId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
}
function getOrder($id, $db)
{
    $sql = "SELECT * FROM orders WHERE orders.orderId = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(":id" => $id));
    $rows = $stmt->fetchAll(PDO::FETCH_CLASS);
    return $rows;
}
function addToItemQuantity($id,$quantity,$db){
    $sql = "UPDATE item set item.quantity = item.quantity + :quantity WHERE itemId = :id;";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(
        ":id" => $id,
        ":quantity" => $quantity
        ));
}
//end order page
?>