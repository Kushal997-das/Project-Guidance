<?php
  $pageTitle = "Buyers";
  include 'init.php';

  if(!isset($_SESSION['typeOfUser']))
    header("Location: ../signin.php");

  if (isset($_SESSION['typeOfUser']) && $_SESSION['typeOfUser'] != "admin") {
    header("Location: ../signin.php");
  }
  //check the wanted page [Manage | Edit | Add | Delete] before going there
  $do = isset($_GET['do'])? $_GET['do'] : 'Manage';

  if ($do == 'Manage') {
    $buyers = GetBuyers($db);

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
        $buyers = GetBuyerByID($id, $db);
      } elseif ($name != "") {
        $buyers = GetBuyerByUserName($name, $db);
      } else {
        $buyers = array();
      }
    }
    if (isset($_POST['showall'])) {
      $buyers = GetBuyers($db);
    }
?>
<div class="searching-area container buyer">
  <h1 class="text-center">Manage Buyers</h1>
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

<div class="container buyer">
  <div class="table-responsive">
    <table class="table table-bordered text-center">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="table-dark">#ID</th>
          <th scope="col" class="table-dark">Username</th>
          <th scope="col" class="table-dark">Fullname</th>
          <th scope="col" class="table-dark">Email</th>
          <th scope="col" class="table-dark">Likes</th>
          <th scope="col" class="table-dark">DisLikes</th>
          <th scope="col" class="table-dark">Transactions</th>
          <th scope="col" class="table-dark">Phones</th>
          <th scope="col" class="table-dark">Control</th>
        </tr>
      </thead>
      <tbody>
        <?php
                  if (empty($buyers)) {
                    echo '<tr>';
                    echo '<td scope="row" colspan="9" style="font-size: 25px; color: #c13131;">No Result Found</td>';
                    echo '</tr>';
                  } else {
                  foreach($buyers as $buyer) {
                    echo '<tr>';
                    echo '<th scope="row">' . $buyer['ID'] . '</th>';
                    echo '<td>' . $buyer['userName'] . '</td>';
                    echo '<td>' . $buyer['fName'] . ' ' . $buyer['lName'] . '</td>';
                    echo '<td>' . $buyer['email'] . '</td>';
                    echo '<td>' . $buyer['likes'] . '</td>';
                    echo '<td>' . $buyer['disLikes'] . '</td>';
                    echo '<td>' . $buyer['transactions'] . '</td>';
                    echo '<td>';
                    $phones = GetBuyerPhones($buyer['ID'], $db);
                    foreach($phones as $phone) {
                      echo $phone['phone'] . '<br>';}
                    echo '</td>';
                    echo '<td>
                            <a href="?do=Delete&buyerId=' . $buyer['ID'] . '&cartId=' . $buyer['cartId'] . '" class="btn btn-danger"><i class="fas fa-user-minus"></i> Delete</a>
                          </td>';
                    echo '</tr>';
                  } }
                ?>
      </tbody>
    </table>
  </div>
</div>

<?php
  } elseif ($do == 'Delete') {
    $buyerId = isset($_GET['buyerId']) && is_numeric($_GET['buyerId']) ? intval($_GET['buyerId']) : 0;
    $cartId = isset($_GET['cartId']) && is_numeric($_GET['cartId']) ? intval($_GET['cartId']) : 0;
    if (!$buyerId) {
      header("Location: buyers.php");
    } elseif (!$cartId) {
      header("Location: buyers.php");
    } else {
      $buyer = GetBuyerByID($buyerId, $db);
      if(isset($_POST['submit'])) {
        DeleteBuyerByID($buyerId, $db);
        DeleteCart($cartId, $db);
        header("Location: buyers.php");
      }
    }
?>
<div class="Users container mb-5">
  <h1 class="text-center">Delete Buyer</h1>
  <div class="delete-box shadow">
    <h3 class="text-center">Are you Sure You Want To Delete <b><?php echo $buyer[0]['userName'] ?></b></h3>
    <form action="?do=Delete&buyerId=<?php echo $buyerId; ?>&cartId=<?php echo $cartId; ?>" method="POST"
      class="text-center">
      <button type="submit" name="submit" class="btn btn-danger">Yes</button>
      <a class="btn btn-success" href="?do=Manage">No</a>
    </form>
  </div>
</div>
<?php
  }else {
    header("Location: index.php");
  }
include $tpl . 'footer.php';
?>