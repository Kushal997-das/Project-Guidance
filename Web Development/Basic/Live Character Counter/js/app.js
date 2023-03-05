var text = document.getElementById("textarea");
function countingCharacter(){
    var counter = text.value.length;
    document.querySelector(".counter").innerText = `${counter}`;
}

