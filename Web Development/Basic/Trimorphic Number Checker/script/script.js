function getInputValue() {
  var inputVal = document.getElementById("userinput").value;
  
  if (isTrimorphic(inputVal)) {
    document.getElementById("result").value = "Trimorphic Number";
  }
  else {
    document.getElementById("result").value = "Not a Trimorphic Number";
  }
}

function isTrimorphic(N)
{
   
    let cube = N * N * N;
 
    while (N > 0)
    {
        if (N % 10 != cube % 10)
            return false;
     
      
        N = parseInt(N / 10, 10);
        cube = parseInt(cube / 10, 10);
    }
    return true;
}





function reset() {
  document.getElementById("userinput").value = "";
  document.getElementById("result").value = "";
}