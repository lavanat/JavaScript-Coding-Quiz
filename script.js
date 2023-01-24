// Get all of the HTML elements
var startButton = document.getElementById("start-button");
var highScoresListEl = document.getElementById("high-scores-list");
var questioncontainer = document.getElementById("question-container");
var infoEl = document.getElementById("info");
var questionEl = document.getElementById("question");
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");
var timerEl = document.getElementById("countdown");

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
var answerEls = [answer1El, answer2El, answer3El, answer4El];
var timerCount = 60;
var highScoreslist;
var userinitials;
var nextQuestion = 0;
var message;
var userAnswer;
var score;

function init () {
    infoEl.style.display = "flex";
    questioncontainer.style.display = "none";
}

function startQuiz () {
    infoEl.style.display = "none";
    startButton.style.display = "none";
    questioncontainer.style.display = "flex";
    startTimer ();
    getQuestion (nextQuestion);
}

function startTimer () {
    timer = setInterval (function () {
        if (timerCount >0) {
            timerCount --;
            timerEl.textContent = timerCount;
        }
        // add logic to display loss if time runs out
    }, 1000);
}

function getQuestion (nextQuestion) {
        questionEl.textContent = quizQuestions[nextQuestion].title;
        answer1El.textContent = quizQuestions[nextQuestion].answers[0];
        answer2El.textContent = quizQuestions[nextQuestion].answers[1];
        answer3El.textContent = quizQuestions[nextQuestion].answers[2];
        answer4El.textContent = quizQuestions[nextQuestion].answers[3];
    }

function checkAnswer () {
     userAnswer = this.id;
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
        displayScore (score);
        clearInterval(timer);
     } else if (timerCount <= 0) {
        timerCount = 0;
        timerEl.textContent = timerCount;
        displayLoss ();
     } else {
     nextQuestion++;
     getQuestion(nextQuestion);
     infoEl.textContent = message;
     infoEl.style.display = "flex";
     }
 }

 function displayScore (score) {
    message = "Congratulations! You have successfully completed the quiz! Enter your initials below to save your score. Your score is: "
    infoEl.textContent = message + score;
    questioncontainer.style.display = "none";
    // add code to get user initials
    // save score and initials to local storage
    // update high scores list with running total

 }

 function displayLoss () {
    message = "You did not complete the questions in time! Do you want to play again?"
    infoEl.textContent = message;
    questioncontainer.style.display = "none";
    startButton.style.display = "flex";
    clearInterval(timer);
    timerCount = 60;
 }

 init ();
startButton.addEventListener("click", startQuiz);
answer1El.addEventListener("click", checkAnswer);
answer2El.addEventListener("click", checkAnswer);
answer3El.addEventListener("click", checkAnswer);
answer4El.addEventListener("click", checkAnswer);