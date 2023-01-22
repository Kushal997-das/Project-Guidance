carousel = [
    {
        "offer_id": "1",
        "offer_category": "womens",
        "offer_title": "Newly Arrived",
        "offer_desc": "upto 30% Discount",
        "offer_info": "Hurry up! Check out our new collection.",
        "offer_image": "assets/slider images/womensfashion.jpg"
    },
    {
        "offer_id": "2",
        "offer_category": "footwear",
        "offer_title": "Nike Discount Days",
        "offer_desc": "Starting at Rs.999",
        "offer_info": "Get premium quality shoes from Nike.",
        "offer_image": "assets/slider images/shoecollection.jpg"
    },
    {
        "offer_id": "3",
        "offer_category": "mens",
        "offer_title": "Summer Collection",
        "offer_desc": "upto 50% Discount",
        "offer_info": "On brands like Nike, Puma, Addidas etc.",
        "offer_image": "assets/slider images/mensfashion.jpg"
    },
    {
        "offer_id": "6",
        "offer_category": "accessories",
        "offer_title": "Watches from Timex",
        "offer_desc": "Buy 1 Get 1 free",
        "offer_info": "Chronograph, round stainless steel watches form Timex.",
        "offer_image": "assets/slider images/watch.jpg"
    }
]

function loadSliderItems() {
    let div = document.getElementById("carousel-items");

    let context = "";

    for (let i = 0; i < carousel.length; i++) {
        let active = ""
        if (i == 0) {
            active = " active"
        }

        context += `<div class="carousel-item${active}">
                <img src="${carousel[i].offer_image}" class="d-block w-100" alt="${carousel[i].offer_title}">
                    <div class="details">
                        <span class="category">
                        ${carousel[i].offer_category}
                        </span>
                        <h1>
                        ${carousel[i].offer_title}
                        </h1>
                        <h4>
                        ${carousel[i].offer_desc}
                        </h4>
                        <p>
                        ${carousel[i].offer_info}
                        </p>
                        <a href="user/products_page/index.html" class="btn btn-dark">Shop Now</a>
                    </div>
            </div>`
    }

    div.innerHTML = context
}

loadSliderItems()