<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <span class="navbar-brand">Admin Page</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="index.php">Admins</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="buyers.php">Buyers</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="sellers.php">Sellers</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="categories.php">Categories</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="items.php">Items</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="stats.php">Statistics</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <?php
              session_start();
              if(isset($_SESSION['username']))
              { echo ucfirst($_SESSION['username']); }?>
          </a>
          <ul class="dropdown-menu text-center" aria-labelledby="navbarDropdown">
            <!-- put the id of the session -->
            <li><a class="dropdown-item" href="index.php?do=Edit&adminId=<?php if(isset($_SESSION['id'])) {echo $_SESSION['id'];} ?>">Edit Profile</a></li>
            <li><a class="dropdown-item" href="logout.php">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>