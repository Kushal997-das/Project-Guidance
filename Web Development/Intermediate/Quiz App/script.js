const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section")
const main = document.querySelector(".main");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
const optionList = document.querySelector(".option-list");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");

startBtn.addEventListener("click", ()=>{
    popupInfo.classList.add('active');
    main.classList.add('active')
})

exitBtn.addEventListener("click", ()=>{
    popupInfo.classList.remove('active');
    main.classList.remove('active')
})

continueBtn.addEventListener("click", ()=>{
    quizSection.classList.add("active");
    popupInfo.classList.remove('active');
    main.classList.remove('active')
    quizBox.classList.add("active");
    questionCounter();
    showQuestions(0)
})

tryAgainBtn.addEventListener("click", ()=>{
    quizBox.classList.add("active");
    resultBox.classList.remove("active");
    nextBtn.classList.remove("active");

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;

    showQuestions(questionCount)
    questionCounter(questionNumber-1)

    headerScore();
})

goHomeBtn.addEventListener("click", ()=>{
    quizSection.classList.remove("active");
    resultBox.classList.remove("active");
    nextBtn.classList.remove("active");

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;

    showQuestions(questionCount)
    questionCounter(questionNumber-1)

    headerScore();
})

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

nextBtn.addEventListener("click", ()=>{
    if(questionCount < questions.length-1){
        questionCount++;
        showQuestions(questionCount)
        nextBtn.classList.remove("active")
    } else {
        showResultBox();
    }
})

function showQuestions(idx){
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[idx].numb}. ${questions[idx].question}`

    let optionTag = `
        <div class="option"><span>${questions[idx].option[0]}</span></div>
        <div class="option"><span>${questions[idx].option[1]}</span></div>
        <div class="option"><span>${questions[idx].option[2]}</span></div>
        <div class="option"><span>${questions[idx].option[3]}</span></div>
    `
    optionList.innerHTML = optionTag

    questionCounter(questionCount);
    headerScore()

    const option = document.querySelectorAll(".option");
    for(let i=0; i<option.length; i++){
        option[i].setAttribute('onclick', "optionSelected(this)")
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions= optionList.children.length

    if(userAnswer == correctAnswer){
        answer.classList.add("correct");
        userScore++;
        headerScore()
    } else {
        answer.classList.add("incorrect");

        // if incorrect auto select correct answer
        for(let i=0; i<allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute("class", "option correct")
            }
        }
    }

    for(let i=0; i<allOptions; i++){
        optionList.children[i].classList.add("disable")
    }

    nextBtn.classList.add("active")
}

function questionCounter(index){
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index+1} of ${questions.length} Questions`
}

function headerScore(){
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`
}

function showResultBox(){
    quizBox.classList.remove("active");
    resultBox.classList.add("active");

    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");

    let progressStartValue = 0;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 30;

    if(userScore > 0){
        let progress = setInterval(()=>{
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`
            circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue*3.6}deg, rgba(255, 255, 255, .1) 0deg)`
            
            if(progressStartValue === progressEndValue){
                clearInterval(progress)
            }
        }, speed)
    }
}