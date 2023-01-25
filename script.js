// Get all of the HTML elements
var startButton = document.getElementById("start-button");
var highScoresListEl = document.getElementById("high-scores-list");
var highScoresButton = document.getElementById("high-score-button")
var infoEl = document.getElementById("info");
var timerEl = document.getElementById("countdown");

var questioncontainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");

var wincontainer = document.getElementById("win-text");
var scoreEl = document.getElementById("score");
var initialEl = document.getElementById("initials");
var submitButton = document.getElementById("submit")


// Create the Questions
let question1 = {
    title: "Which of the following are ways to declare a variable?",
    answers:["let", "var", "const", "all of the above"],
    correct: "answer4"
};

let question2 = {
    title: "How do you start single-line comments in JavaScript?",
    answers: ["//", "*/", "**", "##"],
    correct: "answer1"
};

let question3 = {
    title: "Which of the following is a valid variable name?",
    answers: ["my-name", "1stAddress", "$paycheck$", "phone number"],
    correct: "answer3"
};

let question4 = {
    title: "Which of the following is not a data type in JavaScript?",
    answers: ["boolean", "array", "null", "string"],
    correct: "answer2"
};

let question5 = {
    title: "How can you ask the user to type in their favorite pizza topping?",
    answers: ["alert", "confirm", "prompt", "none of the above"],
    correct: "answer3"
};

let question6 = {
    title: "var fullName = 'John' + 'Smith'; What is the value of fullName?",
    answers: ["John Smith", "10", "undefined", "JohnSmith"],
    correct: "answer4"
};

let question7 = {
    title: "Which of the following is the 'or' logical operator?",
    answers: ["||", "**", "&&", "!!"],
    correct: "answer1"
};

let question8 = {
    title: "What surrounds the function body?",
    answers: ["parantheses", "curly brackets", "brackets", "all of the above"],
    correct: "answer2"
};

let question9 = {
    title: "Which of the following statements about functions are true?",
    answers: ["Functions are values. They can be assigned, copied, or declared in any place of the code.", 
    "Function Declarations are processed before the code block is executed.", 
    "Function Expressions are created when the execution flow reaches them.", 
    "All of the above"],
    correct: "answer4"
};

// Create new variables
var timer;
var quizQuestions = [question1, question2, question3, question4, question5, question6, question7, question8, question9];
var timerCount = 60;
var highScoresList=[];
var userInitials;
var nextQuestion = 0;
var message;
var score;
var storedHighScores;

function init () {
    infoEl.style.display = "flex";
    questioncontainer.style.display = "none";
    wincontainer.style.display = "none";
    highScoresListEl.style.display = "none"
}

function startQuiz () {
    infoEl.style.display = "none";
    startButton.style.display = "none";
    questioncontainer.style.display = "flex";
    highScoresListEl.style.display = "none";
    nextQuestion = 0;
    submitButton.disabled = false;
    startTimer ();
    getQuestion ();
}

function startTimer () {
    timer = setInterval (function () {
        if (timerCount >0) {
            timerCount --;
            timerEl.textContent = timerCount;
        } else {
            clearInterval(timer);
            timerCount = 0;
            timerEl.textContent = timerCount;
            score = 0;
            displayScoreText ();
        }
    }, 1000);
}

function getQuestion () {
        questionEl.textContent = quizQuestions[nextQuestion].title;
        answer1El.textContent = quizQuestions[nextQuestion].answers[0];
        answer2El.textContent = quizQuestions[nextQuestion].answers[1];
        answer3El.textContent = quizQuestions[nextQuestion].answers[2];
        answer4El.textContent = quizQuestions[nextQuestion].answers[3];
    }

function checkAnswer () {
     var userAnswer = this.id;
    //  check if the answer is right or wrong
     if (quizQuestions[nextQuestion].correct === userAnswer) {
        message = "Correct Answer!";
     } else {
        message = "Wrong Answer!"
        timerCount = timerCount - 10;
     }
    //  go to high scores if this is the last question and there is time remaining
     if ((nextQuestion === 8) && (timerCount > 0)) {
        score = timerCount;
        displayScoreText ();
        clearInterval(timer);
     } else {
     nextQuestion++;
     getQuestion();
     infoEl.textContent = message;
     infoEl.style.display = "flex";
     }
 }

 function displayScoreText () {
    infoEl.style.display = "none";
    questioncontainer.style.display = "none";
    wincontainer.style.display = "flex";
    scoreEl.textContent = score;
    submitButton.addEventListener("click", saveScore)
 }

 function saveScore () {
    submitButton.disabled = true;
    userInitials = initialEl.value;
    highScoresList.push(userInitials + "- " + score);
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
    wincontainer.style.display = "none";
    startButton.style.display = "flex";
    showHighScoresList ();
    initialEl.value = "";
    timerCount = 60;
    infoEl.textContent = "Hit start if you want to play again!"
    infoEl.style.display = "flex";
 };

 function showHighScoresList () {
    if (highScoresListEl.style.display === "flex") {
        highScoresListEl.style.display = "none"
    } else {
    highScoresListEl.style.display = "flex"
    highScoresListEl.textContent = ""
    storedHighScores = JSON.parse(localStorage.getItem("highScoresList"));
    if (storedHighScores !== null) {
        highScoresList = storedHighScores;
      }
    for (var i = 0; i < highScoresList.length; i++) {
        var highScore = highScoresList[i];
    
        var li = document.createElement("li");
        li.textContent = highScore;
        li.setAttribute("data-index", i);
    
        highScoresListEl.appendChild(li);
      } 
    }
 }

 init ();
startButton.addEventListener("click", startQuiz);
answer1El.addEventListener("click", checkAnswer);
answer2El.addEventListener("click", checkAnswer);
answer3El.addEventListener("click", checkAnswer);
answer4El.addEventListener("click", checkAnswer);
highScoresButton.addEventListener("click", showHighScoresList);
