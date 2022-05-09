function togglePasswordVisibility(num) {
  let password = document.getElementById("password" + num);
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
  let eyeIcon = document.getElementById("eyeIcon" + num);
  if (eyeIcon.classList.contains("bi-eye")) {
    eyeIcon.classList.remove("bi-eye");
    eyeIcon.classList.add("bi-eye-slash");
  } else {
    eyeIcon.classList.remove("bi-eye-slash");
    eyeIcon.classList.add("bi-eye");
  }
}

let thumbArray = document.querySelectorAll(".thumbnails img");
let mainImage = document.querySelector("#screen img");
thumbArray.forEach((element) => {
  element.addEventListener("click", function () {
    //change the main image src with this src
    let newsrc = element.getAttribute("src");
    mainImage.setAttribute("src", newsrc);
  });
});