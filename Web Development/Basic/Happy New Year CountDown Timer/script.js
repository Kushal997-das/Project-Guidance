const days = document.querySelectorAll("days");
const hours = document.querySelectorAll("hours");
const minutes = document.querySelectorAll("minutes");
const seconds = document.querySelectorAll("seconds");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 1 ${currentYear + 1} 00:00:00`);

// Update Countdowntime
function updateCountDownTime() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  // converting time from milliseconds->seconds->minutes->hours->days
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor(diff / 1000 / 60);
  const s = Math.floor(diff / 1000);

  days.textContent = d;
  document.getElementById("days").textContent = d;
  document.getElementById("hours").textContent = h < 10 ? "0" + h : h;
  document.getElementById("minutes").textContent = m < 10 ? "0" + m : m;
  document.getElementById("seconds").textContent = m < 10 ? "0" + s : s;
}

setInterval(updateCountDownTime, 1000);
