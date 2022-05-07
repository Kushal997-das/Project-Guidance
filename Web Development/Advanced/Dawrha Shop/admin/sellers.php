<?php
$pageTitle = "Sellers";
include 'init.php';

  if(!isset($_SESSION['typeOfUser']))
    header("Location: ../signin.php");

if (isset($_SESSION['typeOfUser']) && $_SESSION['typeOfUser'] != "admin") {
  header("Location: ../signin.php");
}
//check the wanted page [Manage | Edit | Add | Delete] before going there
$do = isset($_GET['do'])? $_GET['do'] : 'Manage';

if ($do == 'Manage') {
  $sellers = GetSellers($db);

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
        $sellers = GetSellerByID($id, $db);
      } elseif ($name != "") {
        $sellers = GetSellerByUserName($name, $db);
      } else {
        $sellers = array();
      }
    }
    if (isset($_POST['showall'])) {
      $sellers = GetSellers($db);
    }
?>
<div class="searching-area container seller">
  <h1 class="text-center">Manage Sellers</h1>
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

<div class="container seller">
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
          <th scope="col" class="table-dark"># of Items</th>
          <th scope="col" class="table-dark">Phones</th>
          <th scope="col" class="table-dark">Control</th>
        </tr>
      </thead>
      <tbody>
        <?php 
                if (empty($sellers)) {
                  echo '<tr>';
                  echo '<td scope="row" colspan="10" style="font-size: 25px; color: #c13131;">No Result Found</td>';
                  echo '</tr>';
                } else {
                foreach($sellers as $seller) {
                  echo '<tr>';
                  echo '<th scope="row">' . $seller['ID'] . '</th>';
                  echo '<td>' . $seller['userName'] . '</td>';
                  echo '<td>' . $seller['fName'] . ' ' . $seller['lName'] . '</td>';
                  echo '<td>' . $seller['email'] . '</td>';
                  echo '<td>' . $seller['likes'] . '</td>';
                  echo '<td>' . $seller['disLikes'] . '</td>';
                  echo '<td>' . $seller['transactions'] . '</td>';
                  echo '<td>' . itemsForSeller($seller['ID'], $db) . '</td>';
                  echo '<td>';
                  $phones = GetSellerPhones($seller['ID'], $db);
                  foreach($phones as $phone) {
                    echo $phone['phoneNo'] . '<br>';}
                  echo '</td>';
                  echo '<td>
                          <a href="?do=Delete&sellerId=' . $seller['ID'] . '" class="btn btn-danger"><i class="fas fa-user-minus"></i> Delete</a>
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
    $sellerId = isset($_GET['sellerId']) && is_numeric($_GET['sellerId']) ? intval($_GET['sellerId']) : 0;
    if (!$sellerId) {
      header("Location: sellers.php");
    }else {
      $seller = GetSellerByID($sellerId, $db);
      if(isset($_POST['submit'])) {
        DeleteSellerByID($sellerId, $db);
        header("Location: sellers.php");
      }
    }
?>
<div class="Users container mb-5">
  <h1 class="text-center">Delete Seller</h1>
  <div class="delete-box shadow">
    <h3 class="text-center">Are you Sure You Want To Delete <b><?php echo $seller[0]['userName'] ?></b></h3>
    <form action="?do=Delete&sellerId=<?php echo $sellerId; ?>" method="POST" class="text-center">
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