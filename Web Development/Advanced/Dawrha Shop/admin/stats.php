<?php 
  ob_start();
  $pageTitle = "Statistics";
  include 'init.php';

  if(!isset($_SESSION['typeOfUser']))
    header("Location: ../signin.php");

  if (isset($_SESSION['typeOfUser']) && $_SESSION['typeOfUser'] != "admin") {
    header("Location: ../signin.php");
  }
?>

<div class="container mt-5 mb-5">
  <div class="table-responsive">
    <table class="table shadow-sm table-bordered text-center">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="table-dark">Stats</th>
          <th scope="col" class="table-dark">Number</th>
        </tr>
      </thead>
      <tbody>
        <?php 
              echo '
              <tr>
              <th scope="row">Number of Buyers</th>
              <td>' . GetNumOfBuyers($db) . '</td>
              </tr>';
              echo '
              <tr>
              <th scope="row">Number of Sellers</th>
              <td>' . GetNumOfSellers($db) . '</td>
              </tr>';
              echo '
              <tr>
              <th scope="row">Number of Users Joined During Last Month</th>
              <td>' . LastMonthUsers($db) . '</td>
              </tr>';
              echo '
              <tr>
              <th scope="row">Number of Users Joined During Last Year</th>
              <td>' . LastYearUsers($db) . '</td>
              </tr>';
              echo '
              <tr>
              <th scope="row">Number of Orders During Last Month</th>
              <td>' . LastMonthOrders($db) . '</td>
              </tr>';
              echo '
              <tr>
              <th scope="row">Number of Orders During Last Year</th>
              <td>' . LastYearOrders($db) . '</td>
              </tr>';
              echo '
              <tr>
              <th scope="row">Total Number Of Items</th>
              <td>' . NumberOfItems($db) . '</td>
              </tr>';
          ?>
      </tbody>
    </table>
  </div>
</div>


<?php 
include $tpl . 'footer.php';
ob_end_flush();
?>