var tabCont = document.getElementById("tabLinks");
var links = tabCont.getElementsByClassName("link");
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active-tab-link");
        current[0].className = current[0].className.replace(" active-tab-link", "");
        this.className += " active-tab-link";
    });
}