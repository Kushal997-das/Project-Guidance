
function loadNavAndFooter(dir) {
    let ind = dir == ".." ? "../../" : "";
    let footer = `<footer>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3">
                                <h6>Help</h6>
                                <ul>
                                    <li><a href="${dir}/contact_page/index.html">Contact</a></li>
                                    <li><a href="#">Returns</a></li>
                                    <li><a href="#">Track Orders</a></li>
                                    <li><a href="#">Shipping</a></li>
                                    <li><a href="#">FAQs</a></li>
                                </ul>
                            </div>
                            <div class="col-md-3">
                                <h6>Categories</h6>
                                <ul>
                                    <li><a href="${dir}/products_page/index.html">Womens</a></li>
                                    <li><a href="${dir}/products_page/index.html">Mens</a></li>
                                    <li><a href="${dir}/products_page/index.html">Shoes</a></li>
                                    <li><a href="${dir}/products_page/index.html">Accessories</a></li>
                                    <li><a href="${dir}/products_page/index.html">Bags</a></li>
                                </ul>
                            </div>
                            <div class="col-md-3">
                                <h6>Get in Touch</h6>
                                <p>Any questions? Let us know at 12th floor, 222 Fake St, New Delhi, IN 10018 or call us on (+0) 44 343 7769</p>
                                <div class="d-flex social-links">
                                    <a href="#"><i class="bi bi-facebook"></i></a>
                                    <a href="#"><i class="bi bi-instagram"></i></a>
                                    <a href="#"><i class="bi bi-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <p class="text-center">Copyright &copy; 2021 | All Rights Reserved</p>
                    </div>
                </footer>`;

    let nav = `<nav class="navbar-light container-fluid d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <a class="btn menu nav_btns" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                            <i class="bi bi-list"></i>
                        </a>
                        <h5 class="brand" style="transform: translateY(4.5px);"><span>STYL</span><strong>IN</strong></h5>
                    </div>

                    <!-- Sidebar -->
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel"><span>STYL</span><strong>IN</strong></h5>
                            <a type="button" class="btn menu nav_btns" data-bs-dismiss="offcanvas" aria-label="Close">
                                <i class="bi bi-x"></i>
                            </a>
                        </div>

                        <!-- Navlinks -->
                        <div class="offcanvas-body">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link" href="${ind}index.html">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="${dir}/products_page/index.html">Browse</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link" href="${dir}/cart_page/index.html">My Cart</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="${dir}/orders_page/index.html">Orders</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link" href="${dir}/about_page/index.html">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="${dir}/contact_page/index.html">Contact</a>
                                </li>
                                <hr>
                            </ul>
                        </div>
                    </div>

                    <div class="d-flex">
                        <a class="btn search-btn nav_btns"><i class="bi bi-search"></i></li>
                        <a href="${dir}/cart_page/index.html" class="btn nav_btns"><i class="bi bi-bag"></i></a>
                    </div>
                </nav>
                <div id="search-box" class="container-fluid">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" name="search_keyword" id="searchproduct" placeholder="Search for products, brands etc.">
                    <button type="submit" class="btn btn-danger" id="button-addon2" name="search"><i class="bi bi-search"></i></button>
                </div>
                </div>`

    document.getElementById("navbar-div").innerHTML = nav
    document.getElementById("footer-div").innerHTML = footer
}