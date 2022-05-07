<?php
$pageTitle = "Items";
include 'init.php';

  if(!isset($_SESSION['typeOfUser']))
    header("Location: ../signin.php");

if (isset($_SESSION['typeOfUser']) && $_SESSION['typeOfUser'] != "admin") {
  header("Location: ../signin.php");
}
  //check the wanted page [Manage | Edit(Update) | Add(Insert) | Delete] before going there
  $do = isset($_GET['do'])? $_GET['do'] : 'Manage';

  if($do == 'Manage') {
    $items = GetItems($db);

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
        $items = GetItemBySellerID($id, $db);
      } elseif ($name != "") {
        $items = GetItemBySellerUserName($name, $db);
      } else {
        $items = array();
      }
    }
    if (isset($_POST['showall'])) {
      $items = GetItems($db);
    }
?>

<div class="searching-area container items">
  <h1 class="text-center">Manage Items</h1>
  <form action="?do=Manage" method="POST" class="search-form">
    <div class="name">
      <div>Seller UserName:</div>
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

<div class="container items">
  <div class="table-responsive">
    <table class="table table-bordered text-center">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="table-dark">#ID</th>
          <th scope="col" class="table-dark">Item Name</th>
          <th scope="col" class="table-dark">Category</th>
          <th scope="col" class="table-dark">Owner's Name</th>
          <th scope="col" class="table-dark">Price</th>
          <th scope="col" class="table-dark">Quantity</th>
          <th scope="col" class="table-dark">Control</th>
        </tr>
      </thead>
      <tbody>
        <?php
                  if (empty($items)) {
                    echo '<tr>';
                    echo '<td scope="row" colspan="7" style="font-size: 25px; color: #c13131;">No Result Found</td>';
                    echo '</tr>';
                  } else {
                  foreach ($items as $item) {
                    echo '<tr>';
                    echo '<th scope="row">' . $item['itemId'] . '</th>';
                    echo '<td>' . $item['title'] . '</td>';
                    echo '<td>' . $item['categoryName'] . '</td>';
                    echo '<td>' . $item['fName'] . ' ' . $item['lName'] . '</td>';
                    echo '<td>' . $item['price'] . ' $</td>';
                    echo '<td>' . $item['quantity'] . '</td>';
                    echo '</td>';
                    echo '<td>
                            <a href="?do=View&itemId=' . $item['itemId'] . '" class="btn btn-primary"><i class="fas fa-eye"></i> View</a>
                            <a href="?do=Delete&itemId=' . $item['itemId'] . '" class="btn btn-danger"><i class="fas fa-user-minus"></i> Delete</a>
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
    $itemId = isset($_GET['itemId']) && is_numeric($_GET['itemId']) ? intval($_GET['itemId']) : 0;
    if (!$itemId) {
      header("Location: items.php");
    }else {
      $item = GetItemByID($itemId, $db);
      if(isset($_POST['submit'])) {
        DeleteItemByID($itemId, $db);
        header("Location: items.php");
      }
    }
?>

<div class="ItemsForm container mb-5">
  <h1 class="text-center">Delete Item</h1>
  <div class="delete-box shadow">
    <h3 class="text-center">Are you Sure You Want To Delete <b><?php echo $item[0]['title'] ?></b></h3>
    <form action="?do=Delete&itemId=<?php echo $itemId; ?>" method="POST" class="text-center">
      <button type="submit" name="submit" class="btn btn-danger">Yes</button>
      <a class="btn btn-success" href="?do=Manage">No</a>
    </form>
  </div>
</div>

<?php
  } elseif ($do == 'View') {
    $itemId = isset($_GET['itemId']) && is_numeric($_GET['itemId']) ? intval($_GET['itemId']) : 0;
    if (!$itemId) {
      header("Location: items.php");
    } else {
      $item = GetItemViewByID($itemId, $db);
      $images = GetImagesByID($itemId, $db);
      $dataimages = "../data/uploads/items/";
?>

<div class="ItemsForm container mb-5 shadow">
  <section class="review-item">
    <div class="gallery">
      <!-- the main image -->
      <div id="screen">
        <?php 
          if (!empty($images)) {
            echo '<img src="' . $dataimages . $images[0]['image'] . '" alt="primary">';
          } else {
            echo '<img src="' . $dataimages . 'default.png" alt="primary">';
          }
        ?>
      </div>
      <div class="thumbnails">
        <?php 
          for($i = 0; $i < count($images); $i++) {
            echo '<img src="' . $dataimages . $images[$i]['image'] . '" alt="primary">';
          }
        ?>
      </div>
    </div>
    <div class="product">
      <a href="?do=Manage" class="seller-name"><?php echo $item[0]['fName'] . ' ' . $item[0]['lName']; ?></a>
      <hr>
      <span class="date-of-item"><?php echo $item[0]['addDate']; ?></span>
      <p class="item-name"><?php echo $item[0]['title']; ?></p>
      <p class="description"><?php echo $item[0]['description']; ?></p>
      <div class="price">
        <?php 
                if ($item[0]['discount'] == 0) {
                  echo '<div class="new-price">';
                  echo $item[0]['price'] . " $";
                  echo '</div>';
                }else {
                  echo '<div class="new-price">';
                  echo $item[0]['price'] - ($item[0]['price'] * ($item[0]['discount']/100)) . " $";
                  echo '</div>';
                  echo '<div class="discount">';
                  echo $item[0]['discount'] . "%";
                  echo '</div>';
                  echo '<div class="old-price">';
                  echo $item[0]['price'] . " $";
                  echo '</div>';
                }
              ?>
      </div>
      <p class="loctaion">Location: <?php echo $item[0]['homeNumber'] . ', ' .
                                  $item[0]['street'] . ' ' . $item[0]['city'] . ' ' . $item[0]['country'];?></p>
    </div>
  </section>
</div>

<?php
      }
    }else {
      header("Location: index.php");
    }
  include $tpl . 'footer.php';
?>