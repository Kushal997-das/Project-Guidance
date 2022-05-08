<?php
$pageTitle = "Categories";
include 'init.php';

  if(!isset($_SESSION['typeOfUser']))
    header("Location: ../signin.php");
if (isset($_SESSION['typeOfUser']) && $_SESSION['typeOfUser'] != "admin") {
  header("Location: ../signin.php");
}

  //check the wanted page [Manage | Edit | Add | Delete] before going there
  $do = isset($_GET['do'])? $_GET['do'] : 'Manage';

  if($do == 'Manage') { //manage page to show all the categories
    $categories = GetCategories($db);
?>
<div class="container category">
  <h1 class="text-center">Manage Categories</h1>
  <div class="table-responsive">
    <table class="table table-bordered text-center">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="table-dark">Category Name</th>
          <th scope="col" class="table-dark">Category Description</th>
          <th scope="col" class="table-dark">Control</th>
        </tr>
      </thead>
      <tbody>
        <?php
            foreach($categories as $cat) {
              echo '<tr>';
              echo '<th scope="row">' . $cat['categoryName'] . '</th>';
              echo '<td>' . $cat['categoryDescription'] . '</td>';
              echo '<td>
                      <a href="?do=Edit&categoryId=' . $cat['categoryId'] . '" class="btn btn-success"><i class="fas fa-edit"></i> Edit</a>
                      <a href="?do=Delete&categoryId=' . $cat['categoryId'] . '" class="btn btn-danger"><i class="fas fa-user-minus"></i> Delete</a>
                    </td>';
              echo '</tr>';
            }
            ?>
      </tbody>
    </table>
  </div>
  <a href="?do=Add" class="btn btn-primary add-btn"><i class="fa fa-plus"></i> Add New Category</a>
</div>

<?php
  } elseif ($do == 'Add') {
    $catName = $catDes = '';
    $catNameErr = $catDesErr = '';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $catName = $_POST['name'];
      $catDes = $_POST['description'];

      $catName = input_data($catName);
      $catDes = input_data($catDes);

      $catNameErr = sizeCatName($catName);
      $catDesErr = sizeCatDes($catDes);

      if ($catNameErr == "" && $catDesErr == "") {
        AddNewCategory($catName, $catDes, $db);
        header("Location: categories.php");
      }
    }
?>
<div class="CategoriesForms container mb-5">
  <h1 class="text-center">Add New Category</h1>
  <form class="col-lg-8 m-auto" action="?do=Add" method="POST">
    <!-- Name -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="fas fa-signature"></i></span>
      <input type="text" class="form-control" name="name" placeholder="Name" aria-label="Name"
        aria-describedby="basic-addon1" value="<?php echo $catName; ?>" required>
    </div>
    <span class="error"><?php echo $catNameErr; ?></span>
    <!-- Description -->
    <div class="mb-3">
      <label for="des" class="form-label">Description</label>
      <textarea class="form-control" id="des" rows="3" name="description"><?php echo $catDes; ?></textarea>
    </div>
    <span class="error"><?php echo $catDesErr; ?></span>
    <button type="submit" class="btn btn-primary form-btn">Add</button>
  </form>
</div>

<?php
  } elseif ($do == 'Edit') {
    $catId = isset($_GET['categoryId']) && is_numeric($_GET['categoryId']) ? intval($_GET['categoryId']) : 0;
    if (!$catId) {
      header("Location: categories.php");
    }
    $catNameErr = $catDesErr = '';
    $category = GetCategoryByID($catId, $db);
    $catName = $category[0]['categoryName'];
    $catDes = $category[0]['categoryDescription'];

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $catName = $_POST['name'];
      $catDes = $_POST['description'];

      $catName = input_data($catName);
      $catDes = input_data($catDes);

      $catNameErr = sizeCatName($catName);
      $catDesErr = sizeCatDes($catDes);

      if ($catNameErr == "" && $catDesErr == "") {
        UpdateCategory($catId, $catName, $catDes, $db);
        header("Location: categories.php");
      }
    }
?>
<div class="CategoriesForms container mb-5">
  <h1 class="text-center">Edit Categories</h1>
  <form class="col-lg-8 m-auto" action="?do=Edit&categoryId=<?php echo $catId; ?>" method="POST">
    <!-- Name -->
    <div class="input-group mb-2">
      <span class="input-group-text" id="basic-addon1"><i class="fas fa-signature"></i></span>
      <input type="text" class="form-control" name="name" placeholder="Name" aria-label="Name"
        aria-describedby="basic-addon1" value="<?php echo $catName; ?>" required>
    </div>
    <span class="error"><?php echo $catNameErr; ?></span>
    <!-- Description -->
    <div class="mb-3">
      <label for="des" class="form-label">Description</label>
      <textarea class="form-control" id="des" rows="3" name="description"><?php echo $catDes; ?></textarea>
    </div>
    <span class="error"><?php echo $catDesErr; ?></span>
    <button type="submit" class="btn btn-primary form-btn">Edit</button>
  </form>
</div>
<?php

  } elseif ($do == 'Delete') {
    $catId = isset($_GET['categoryId']) && is_numeric($_GET['categoryId']) ? intval($_GET['categoryId']) : 0;
    if (!$catId) {
      header("Location: categories.php");
    }else {
      $category = GetCategoryByID($catId, $db);
      if(isset($_POST['submit'])) {
        DeleteCategoryByID($catId, $db);
        header("Location: categories.php");
      }
    }
?>
<div class="CategoriesForms container mb-5">
  <h1 class="text-center">Delete Category</h1>
  <div class="delete-box shadow">
    <h3 class="text-center">Are you Sure You Want To Delete <b><?php echo $category[0]['categoryName'] ?></b></h3>
    <form action="?do=Delete&categoryId=<?php echo $catId; ?>" method="POST" class="text-center">
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