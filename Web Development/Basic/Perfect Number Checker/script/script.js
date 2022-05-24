function getInputValue() {
  var inputVal = document.getElementById("userinput").value;

  if (isPerfect(inputVal)) {
    document.getElementById("result").value = "Perfect Number";
  }
  else {
    document.getElementById("result").value = "Not a Perfect Number";
  }
}

function isPerfect(n) {

  if (n == 1)
  return false;

var sum = 1;

for (var i = 2; i < n; i++) {
  
  if (n % i == 0) {
      sum += i;
  }
  
}

if (sum == n)
  return true;

return false;
}








function reset() {
  document.getElementById("userinput").value = "";
  document.getElementById("result").value = "";
}