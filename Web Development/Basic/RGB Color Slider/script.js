var sliderR = document.getElementById("R");
var sliderG = document.getElementById("G");
var sliderB = document.getElementById("B");
var square = document.getElementById("square");

var outputR = document.getElementById("OutputR");
var outputG = document.getElementById("OutputG");
var outputB = document.getElementById("OutputB");

outputR.innerHTML = sliderR.value;
outputG.innerHTML = sliderG.value;
outputB.innerHTML = sliderB.value;

sliderR.oninput = function() {
  outputR.innerHTML = this.value;
  changeColor();
}

sliderG.oninput = function() {
  outputG.innerHTML = this.value;
  changeColor();
}

sliderB.oninput = function() {
  outputB.innerHTML = this.value;
  changeColor();
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function changeColor() {
  var r = sliderR.value;
  var g = sliderG.value;
  var b = sliderB.value;
  var hexColor = rgbToHex(parseInt(r), parseInt(g), parseInt(b));
  square.style.backgroundColor = `rgb(${r},${g},${b})`;
  document.querySelector(".hexacode").innerText = hexColor;
}

function handleKeyDown(event) {
  const step = event.shiftKey ? 10 : 1;
  if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      this.value = Math.min(parseInt(this.value) + step, 255);
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      this.value = Math.max(parseInt(this.value) - step, 0);
  }
  changeColor();
}

sliderR.addEventListener('keydown', handleKeyDown);
sliderG.addEventListener('keydown', handleKeyDown);
sliderB.addEventListener('keydown', handleKeyDown);

changeColor();
