var convertButton = document.querySelector("#convert")

convertButton.addEventListener
(
    "click",
    displayResult()
)

function displayResult ()
{
    var result = document.querySelector(".result");
    result.innerHTML = "<p>Hello there</p>";
}