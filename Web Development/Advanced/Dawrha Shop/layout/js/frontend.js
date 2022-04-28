// Start SignIn
function togglePasswordVisibility() {
  let password = document.getElementById("password");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
  let eyeIcon = document.getElementById("eyeIcon");
  if (eyeIcon.classList.contains("bi-eye")) {
    eyeIcon.classList.remove("bi-eye");
    eyeIcon.classList.add("bi-eye-slash");
  } else {
    eyeIcon.classList.remove("bi-eye-slash");
    eyeIcon.classList.add("bi-eye");
  }
}
// End SignIn

//Start ReviewItem
//counter to the number of items to add to cart
let amount = document.getElementById("amount");
if (amount) {
  amount.value = 0;
}
function ereasing() {
  amount.value--;
  if (amount.value < 0) {
    amount.value = 0;
  }
}
function adding(max) {
  if (amount.value < max) {
    amount.value++;
  }
}

//function to change the main image of the item
let thumbArray = document.querySelectorAll(".thumbnails img");
let mainImage = document.querySelector("#screen img");
thumbArray.forEach((element) => {
  element.addEventListener("click", function () {
    //change the main image src with this src
    let newsrc = element.getAttribute("src");
    mainImage.setAttribute("src", newsrc);
  });
});
//End ReviewItem

// Start NavBar
let myMedia = window.matchMedia("(max-width: 991px)");
if (myMedia.matches) {
  let myElement = document.querySelector(".dropdown-menu-profile");
  if (myElement) myElement.classList.add("show");
}

const bellElement = document.querySelector("#Notification-bell");
if (bellElement) {
  bellElement.addEventListener("click", function () {
    if (bellElement.classList.contains("add-red")) {
      bellElement.classList.remove("add-red");
      bellElement.classList.add("add-white");
    }
  });
}

const NotiItemsAll = document.querySelectorAll(".noti-items-red");
if (NotiItemsAll) {
  for (let i = 0; i < NotiItemsAll.length; i++) {
    NotiItemsAll[i].addEventListener("click", function () {
      if (NotiItemsAll[i].classList.contains("add-red"))
        NotiItemsAll[i].classList.remove("add-red");
    });
  }
}

// End NavBar

//Start profileSeller page
function permanentlyDeleteItem() {
  return confirm(
    "You are going to delete this item permanently, are you sure?"
  );
}
//Start profileSeller page
// Start Scroll to top
const scrollToTopElement = document.querySelector(".scroll-to-top");
window.onscroll = function () {
  if (this.scrollY >= 100) {
    scrollToTopElement.classList.add("scroll-to-top-show");
  } else {
    scrollToTopElement.classList.remove("scroll-to-top-show");
  }
};

scrollToTopElement.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// End Scroll to top
