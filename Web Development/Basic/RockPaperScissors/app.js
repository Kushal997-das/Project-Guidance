var userScore = 0;
var computerScore = 0;
var noOfRounds = 1;
var gameOver = false;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".scoreboard");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const reset_button = document.getElementById("reset");
const rounds_span = document.getElementById("round-number");

function getComputerChoice() {
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}
function convertToWord(letter) {
    if (letter == 'r') {
        return "Rock";
    }
    if (letter == 'p') {
        return "Paper";
    }
    if (letter == 's') {
        return "Scissors";
    }
}
function win(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You win!`;
    document.getElementById(userChoice).classList.add("green-glow");
    setTimeout(() => userChoice_div.classList.remove("green-glow"), 300);
}
function lose(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(computerChoice)}${smallCompWord} beats ${convertToWord(userChoice)}${smallUserWord}. You lose.`;
    userChoice_div.classList.add("red-glow");
    setTimeout(() => document.getElementById(userChoice).classList.remove("red-glow"), 300);
}
function draw(userChoice, computerChoice) {
    userScore += 0.5;
    computerScore += 0.5;
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}. Its a draw🍎`;
    userChoice_div.classList.add("gray-glow");
    setTimeout(() => document.getElementById(userChoice).classList.remove("gray-glow"), 300);

}
function rounds() {
    noOfRounds += 1;
    if (noOfRounds == 11) {
        gameOver = true;
        result();
    }
    else {
        rounds_span.innerHTML = noOfRounds;
    }
}
function reset() {
    userScore = 0;
    computerScore = 0;
    noOfRounds = 1;
    gameOver = false;
    computerScore_span.innerHTML = userScore;
    userScore_span.innerHTML = computerScore;
    rounds_span.innerHTML = noOfRounds;
    result_p.innerHTML = "Paper covers rock. Rock destroys scissors. Scissors cut paper.";
}
function result() {
    if (userScore > computerScore) {
        result_p.innerHTML = "You won the  previous game😀";
    }
    else if (userScore < computerScore) {
        result_p.innerHTML = "You lost the previous game😔"
    }
    else {
        result_p.innerHTML = "Match ended in a draw🤝";
    }
}
function game(userChoice) {
    if (gameOver) {
        return;
    }
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            rounds();
            break;
        case "rp":
        case "sr":
        case "ps":
            lose(userChoice, computerChoice);
            rounds();
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            rounds();
            break;
    }
}
function main() {
    rock_div.addEventListener('click', () => game("r"));
    paper_div.addEventListener('click', () => game("p"));
    scissors_div.addEventListener('click', () => game("s"));
    reset_button.addEventListener('click', () => {
        reset();
    })
}
main();
