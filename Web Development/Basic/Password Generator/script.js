const passwordLength = document.getElementById("len-p");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const special = document.getElementById("special");
const number = document.getElementById("number");
const submitBtn = document.getElementById("gen");

submitBtn.addEventListener("click", () => {
  const len = passwordLength.value;

  if (len < 0) {
    alert("Please provide positive number");
  }

  const upperString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerString = "abcdefghijklmnopqrstuvwxyz";
  const specialString = "@#$";
  const numberString = "1234567890";

  let finalString = "";

  if (upper.checked) {
    finalString = finalString + upperString;
  }
  if (lower.checked) {
    finalString = finalString + lowerString;
  }
  if (special.checked) {
    finalString = finalString + specialString;
  }
  if (number.checked) {
    finalString = finalString + numberString;
  }

  let password = "";

  for (let index = 0; index < len; index++) {
    let randomIndex = Math.floor(Math.random() * finalString.length);
    password = password + finalString[randomIndex];
  }

  document.getElementById("passarea").value = password;
});
