import Bot from "/icons/botL.png";
import User from "/icons/userL.png";
import "./style.css";

const form = document.querySelector("form");
const chatText = document.querySelector("#chat-text");

let timeInterval;

const loader = (ele) => {
  ele.textContent = "";

  timeInterval = setInterval(() => {
    ele.textContent += ".";

    if (ele.textContent === "......") {
      ele.textContent = "";
    }
  }, 500);
};

const answeredText = (ele, text) => {
  let i = 0;

  let interval = setInterval(() => {
    if (i < text.length) {
      ele.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 25);
};

const generateID = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexaString = randomNumber.toString(16);

  return `id-${timestamp}-${hexaString}`;
};

const chat = (isAI, val, uniqueID) => {
  return `
  <div class="${isAI && "ai"}">
  <div class="chat">
  <div class="profile">
  <img src="${isAI ? Bot : User}" alt="${isAI ? "bot" : "user"}" />
  </div>
  <div class="message" id=${uniqueID}>${val}</div>
  </div>
  </div>
  `;
};


const submitHandler = async (event) => {
  event.preventDefault();

  const data = new FormData(form)

  chatText.innerHTML += chat(false, data.get('prompt'))
  form.reset()

  const uniqueID = generateID()
  chatText.innerHTML += chat(true, "", uniqueID)

  chatText.scrollTop = chatText.scrollHeight

  const messageM = document.getElementById(uniqueID)

  loader(messageM)

  // const response = await fetch("http://localhost:8080", {
  const response = await fetch("http://localhost:8080", {
    method: 'POST', headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ prompt: data.get('prompt') })
  })


  clearInterval(timeInterval)
  messageM.innerHTML = ""


  if (response.ok) {
    const data = await response.json()
    const parsedData = data.bot.trim()
    console.log(parsedData);

    answeredText(messageM, parsedData)
  } else {
    const err = await response.text()
    messageM.innerHTML = "Something went wrong..."
    alert(err)
  }
}

form.addEventListener('submit', submitHandler)
form.addEventListener('keyup', (e) => {
  e.preventDefault()
  if (e.keyCode === 13) {
    submitHandler(e)
  }
})