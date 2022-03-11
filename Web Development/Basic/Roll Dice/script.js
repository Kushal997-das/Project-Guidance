"use strict";

// Main elements we will need
const player1CurrentScoreEl = document.getElementById("current--0");
const player2CurrentScoreEl = document.getElementById("current--1");

const player1ScoreEl = document.getElementById("score--0");
const player2ScoreEl = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

let playing = true;
newGame();

btnRoll.addEventListener("click", rollingDice);
btnHold.addEventListener("click", holdScore);
btnNew.addEventListener("click", newGame);

// Rolling dice function
function rollingDice() {
  // Generate random number
  if (!playing) return;
  const randomNumber = Math.trunc(Math.random() * 6 + 1);

  diceEl.src = `img/dice-${randomNumber}.png`;
  if (diceEl.classList.contains("hidden")) diceEl.classList.remove("hidden");

  // Check if the number is 1
  if (randomNumber === 1) {
    switchPlayers();
  } else {
    // Check which player is playing now
    if (
      document.querySelector(".player--0").classList.contains("player--active")
    )
      player1CurrentScoreEl.textContent =
        Number(player1CurrentScoreEl.textContent) + randomNumber;
    else if (
      document.querySelector(".player--1").classList.contains("player--active")
    )
      player2CurrentScoreEl.textContent =
        Number(player2CurrentScoreEl.textContent) + randomNumber;
    else diceEl.classList.add("hidden");
  }
}

// Holding score function
function holdScore() {
  if (!playing) return;

  if (
    document.querySelector(".player--0").classList.contains("player--active")
  ) {
    player1ScoreEl.textContent =
      Number(player1ScoreEl.textContent) +
      Number(player1CurrentScoreEl.textContent);

    if (Number(player1ScoreEl.textContent) >= 100) {
      playing = false;
      document.querySelector(".player--0").classList.add("player--winner");
      document.querySelector(".player--0").classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else switchPlayers();
  } else if (
    document.querySelector(".player--1").classList.contains("player--active")
  ) {
    player2ScoreEl.textContent =
      Number(player2ScoreEl.textContent) +
      Number(player2CurrentScoreEl.textContent);

    if (Number(player2ScoreEl.textContent) >= 100) {
      playing = false;
      document.querySelector(".player--1").classList.add("player--winner");
      document.querySelector(".player--1").classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else switchPlayers();
  }
}

// New game function
function newGame() {
  // Starting game logic
  playing = true;
  diceEl.classList.add("hidden");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  player1CurrentScoreEl.textContent = 0;
  player2CurrentScoreEl.textContent = 0;
  player1ScoreEl.textContent = 0;
  player2ScoreEl.textContent = 0;
}

// Helper functions
function switchPlayers() {
  // Check which player is playing now then make his score to 0 and switch the players

  if (!playing) return;
  if (
    document.querySelector(".player--0").classList.contains("player--active")
  ) {
    player1CurrentScoreEl.textContent = 0;
    document.querySelector(".player--0").classList.remove("player--active");
    document.querySelector(".player--1").classList.add("player--active");
  } else {
    player2CurrentScoreEl.textContent = 0;
    document.querySelector(".player--1").classList.remove("player--active");
    document.querySelector(".player--0").classList.add("player--active");
  }
}
