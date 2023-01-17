function load() {
    var url_string = window.location;
    var url = new URL(url_string);
    var prev = url.searchParams.get("prev");
    var id = url.searchParams.get("id");

    let content = ""
    for (var i = 0; i < products.length; i++) {
        if (id == products[i].p_id) {
            let discounted = (products[i].p_price * products[i].p_discount) / 100
            let $final_price = products[i].p_price - discounted
            content = `<!-- Bread Navigation -->
        <nav class="container-fluid breadnav" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" id="prev-url"><a href="${prev}">Back</a></li>
                <li class="breadcrumb-item active" aria-current="page">${products[i].p_name}</li>
            </ol>
        </nav>
    
        <!-- Product -->
        <section id="product" class="container">
            <div class="row g-0" id="product-summary">
                <div class="col-md-6">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                    <img src="../../${products[i].images[0].p_image_name}" class="d-block w-100" alt="${products[i].images[0].p_image_name}">
                            </div>
                            <div class="carousel-item active">
                                    <img src="../../${products[i].images[1].p_image_name}" class="d-block w-100" alt="${products[i].images[1].p_image_name}">
                            </div>
                            <div class="carousel-item active">
                                    <img src="../../${products[i].images[2].p_image_name}" class="d-block w-100" alt="${products[i].images[2].p_image_name}">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
    
                <div class="col-md-6" id="product-summary-details">
                    <span class="category">${products[i].p_category} <i class="bi bi-chevron-right"></i> ${products[i].p_subcategory}</span>
                    <h2>${products[i].p_name}</h5></h2>
                    <h4>Rs.${$final_price} <del>Rs.${products[i].p_price}</del></h4>
                    <!-- user-ratings -->
                    <div class="star-reviews">
                    
                    <i class='bi bi-star-fill'></i>
                    <i class='bi bi-star-fill'></i>
                    <i class='bi bi-star-fill'></i>
                    <i class='bi bi-star-fill'></i>
                      
                    </div>
                    <p class="product-summary">
                        ${products[i].p_information}
                    </p>
                    <div class="d-flex">
                        <div class="product-color">
                            <span>Color : ${products[i].p_color}</span>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="product-size">
                            <span>Size : ${products[i].p_size}</span>
                        </div>
                    </div>
                    <div class="buttons">
                    <button class="btn btn-remove btn-outline-dark"><i class="bi bi-bag"></i> Add to Cart</button>
                    <a class="btn btn-danger" href="#">Buy Now</a>
                    </div>
                </div>
            </div>
    
            <!-- Product Information -->
            <div id="product-description">
                <div class="card" style="border: 1px solid gainsboro; border-radius: 0;">
                    <div class="card-body">
                        <div class="d-flex">
                            <a class="card-title" id="link-description">Description</a>
                            <a class="card-title" id="link-details">Details</a>
                            <a class="card-title" id="link-reviews-by-buyers">Reviews</a>
                        </div>
    
                        <div class="card-inside">
                            <!-- Description -->
                            <div class="card-info container" id="description">
                                <p class="card-text">
                                    ${products[i].p_description}
                                </p>
                            </div>
    
                            <!-- Details -->
                            <div class="card-info container" id="details" style="display:none">
                                <span class="weight"><strong>Type</strong>: ${products[i].p_type}</span><br />
                                <span class="material"><strong>Materials</strong>: ${products[i].p_material}</span><br />
                                <span class="mat-col"><strong>Color</strong>: ${products[i].p_color}</span><br />
                                <span class="mat-size"><strong>Size</strong>: ${products[i].p_size}</span><br />
                            </div>
    
                            <!-- Reviews -->
                            <div class="card-info container" id="reviews-by-buyers" style="display:none">
                                <div class="row g-0">
                                    <div class="add-a-review">
                                        <h4>Add a Review</h4>
                                        <form method='post'>
                                            <div>
                                                <label>Your Rating:</label> 
                                                <span class="bi bi-star" id="1" onclick="checkRev(this.id)"></span>
                                                <span class="bi bi-star" id="2" onclick="checkRev(this.id)"></span>
                                                <span class="bi bi-star" id="3" onclick="checkRev(this.id)"></span>
                                                <span class="bi bi-star" id="4" onclick="checkRev(this.id)"></span>
                                                <span class="bi bi-star" id="5" onclick="checkRev(this.id)"></span>

                                                <input type="text" id="urating" value="" name="urating" style="display: none;">
                                            </div>
                                            <label>Your Review:</label>
                                            <textarea name="ureview" id="ureview" class="form-control" rows="3"></textarea>
                                            <button type="submit" class="btn btn-dark" name="submit_review">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    }
    document.getElementById('load-data').innerHTML = content;
}