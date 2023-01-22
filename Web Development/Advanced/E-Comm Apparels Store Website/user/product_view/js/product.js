function checkRev(id) {
    for (let i = 1; i <= id; i++) {
        let element = document.getElementById(i);
        element.classList.remove("bi-star");
        element.classList.add("bi-star-fill");
        element.classList.add("checked");
    }
    document.getElementById("urating").value=id;
}
$(document).ready(function () {
    $("#link-details").click(function () {
        $("#description").hide();
        $("#reviews-by-buyers").hide();
        $("#details").fadeIn(500);
        $("#link-details").addClass("card-title-active")
        $("#link-reviews-by-buyers").removeClass("card-title-active")
        $("#link-description").removeClass("card-title-active")
    });
    $("#link-reviews-by-buyers").click(function () {
        $("#description").hide();
        $("#details").hide();
        $("#reviews-by-buyers").fadeIn(500);
        $("#link-reviews-by-buyers").addClass("card-title-active")
        $("#link-description").removeClass("card-title-active")
        $("#link-details").removeClass("card-title-active")
    });
    $("#link-description").click(function () {
        $("#reviews-by-buyers").hide();
        $("#details").hide();
        $("#description").fadeIn(500);
        $("#link-description").addClass("card-title-active")
        $("#link-details").removeClass("card-title-active")
        $("#link-reviews-by-buyers").removeClass("card-title-active")
    });
    document.getElementById("link-description").className += " card-title-active"
})