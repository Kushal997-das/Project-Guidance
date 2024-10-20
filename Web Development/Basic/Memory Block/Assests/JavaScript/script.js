// Create array of emoji's
const emojis = ["😁","😁","😋","😋","😵‍💫","😵‍💫","🥺","🥺","🎃","🎃","♟️","♟️","🤨","🤨","📙","📙"];

// Randomized array
let shuffleEmoji = emojis.sort(() => (Math.random() > .5) ? 2 : -1);

// Counter variable for counting no. of steps
let Counter = 0;
function updateSteps(){
    Counter++;
    document.querySelector('p').textContent = `Steps: ${Counter}`;
}

// Function to start the timer
let timeElapsed = 0;
let timerInterval;
function startTimer() {
    timerInterval = setInterval(function() {
        timeElapsed++;
        document.querySelector('.timer').textContent = `${timeElapsed}Sec`;
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}
startTimer();

// Loop to display emojis 
for(let i = 0;i < emojis.length;i++){
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffleEmoji[i];
    box.onclick = function(){
        this.classList.add('boxOpen');
        setTimeout(function(){
            if(document.querySelectorAll('.boxOpen').length > 1){
                updateSteps(); // For updating steps
                if(document.querySelectorAll('.boxOpen')[0].innerHTML == document.querySelectorAll('.boxOpen')[1].innerHTML){
                    document.querySelectorAll('.boxOpen')[0].classList.add('boxMatched');
                    document.querySelectorAll('.boxOpen')[1].classList.add('boxMatched');

                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');

                    if(document.querySelectorAll('.boxMatched').length == emojis.length){
                        stopTimer();
                        alert('Hurrah!🥳 you win the game🥳');
                    }
                }
                else{
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');
                }
            }
        },400)
    }
    document.querySelector('.game').appendChild(box);
}

