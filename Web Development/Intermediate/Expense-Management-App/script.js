
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const notification = document.getElementById("notification");

const dummyTransactions = [
  { id: 1, text: "Taxi", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Groceries", amount: -10 },
  { id: 4, text: "Mobile", amount: -150 },
];

let transactions = dummyTransactions;



function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addData(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    showNotification();
  } else {
    
    const type = document.getElementById('in_ex');
    const sel = type.value;
    const amt = (sel === "inc" ? +amount.value : -amount.value);
    
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: amt
    };
    
    transactions.push(transaction);
    updateDOM(transaction);
    updateValues();

    text.value = "";
    amount.value = "";
  }
}

function updateDOM(transaction) {
  
//   const type = document.getElementById('in_ex');
//   const sel = type.value;
//   const sign = (sel === "exp" ? "-" : "+");

  const sign = transaction.amount > 0 ? "+" : "-";
  const item = document.createElement("li");
  item.classList.add(sign === "+" ? "plus" : "minus");
  item.innerHTML = `
          ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span
          ><button class="delete-btn" onclick="removeTransaction(${
            transaction.id
          })"><img src="https://i.postimg.cc/t4x1Xhxw/icons8-xbox-x-35.png"/> </button>
    `;
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const income = amounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => (accumulator += value), 0) * -1
  ).toFixed(2);
  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  init();
}

// Init
function init() {
  list.innerHTML = "";
  transactions.forEach(updateDOM);
  updateValues();
}

init();

form.addEventListener("submit", addData);
