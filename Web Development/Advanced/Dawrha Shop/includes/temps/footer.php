<?php $images = "layout/images/"; ?>
<div class="bg-white">
  <div class="container">
    <li style="list-style:none">
      <hr class="dropdown-divider  my-3">
    </li>
    <footer class="row row-cols-5 py-2 my-3  justify-content-between class-for-footer">
      <div class="col-8 col-lg-4 col-xl-3">
        <a href="index.php" class="align-items-center  mb-3 link-dark text-decoration-none ">
          <img class="navbar-icon" src="<?php echo $images."Logo2.png" ?>" alt=" Logo">
        </a>
        <p class=" text-muted">&copy; 2022 Dawarha Team, Inc. All rights reserved.</p>
      </div>

      <div class="col-8 col-lg-4 col-xl-3">
        <h5>Developed By</h5>
        <ul class="nav flex-column">
        <li class="nav-item mb-2"><a target="_blank" href="https://github.com/ZeyadTarekk"
              class="nav-link p-0 text-muted">Zeyad
              Tarek</a></li>
          <li class="nav-item mb-2"><a target="_blank" href="https://github.com/Abd-ELrahmanHamza"
              class="nav-link p-0 text-muted">Abdelrahman Mohamed</a></li>
          <li class="nav-item mb-2"><a href="https://github.com/BeshoyMorad" target="_blank"
              class="nav-link p-0 text-muted">Beshoy
              Morad</a></li>

          <li class="nav-item mb-2"><a target="_blank" href="https://github.com/ZiadSheriif"
              class="nav-link p-0 text-muted">Ziad
              Sherif</a></li>
        </ul>
      </div>

    </footer>
  </div>
</div>
<script src="<?php echo $js; ?>popper.min.js"></script>
<script src="<?php echo $js; ?>bootstrap.min.js"></script>
<script src="<?php echo $js; ?>frontend.js"></script>
</body>

</html>