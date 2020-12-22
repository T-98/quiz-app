//global variables
var quiz = document.getElementById("quiz");
var clock = document.getElementById("clock");
var timeLeft = 75;
var score = 0;

var quizQuestions = [{
        question: "Commonly used data types DO NOT include:",
        answers: ["Strings", "Booleans", "Alerts", "Numbers"],
        correctAnswer: "Booleans"
    },

    {
        question: "The condition in an if/else statement is enclosed within ________.",
        answers: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        correctAnswer: "Parenthesis"
    },

    {
        question: "Arrays in javascript can be used to store ________.",
        answers: ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"],
        correctAnswer: "All of the above"
    },

    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        correctAnswer: "Parenthesis"
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        answers: ["Javascript", "Terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    }
];

//before the start quiz button is clicked, set the default page view
if (timeLeft === 75) {
    var h1E1 = document.createElement("h1");
    var p1E1 = document.createElement("p");
    var startbtn = document.createElement("button");
    startbtn.className = "button";

    clock.textContent = " 0";
    h1E1.textContent = "Coding Quiz Challenge";
    p1E1.textContent = " Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! "
    startbtn.textContent = "Start Quiz";

    quiz.appendChild(h1E1);
    quiz.appendChild(p1E1);
    quiz.appendChild(startbtn);
}

startbtn.addEventListener('click', function() {
    quiz.removeChild(h1E1);
    quiz.removeChild(p1E1);
    quiz.removeChild(startbtn);

    countdown();
    startQuiz();
});


function countdown() {

    var timeInterval = setInterval(function() {
        if (timeLeft >= 0) {
            clock.textContent = timeLeft;
            --timeLeft;
        } else {
            clock.textContent = timeleft;
            clearInterval(timeInterval);
        }
    }, 1000);
}

function startQuiz() {

    var q = document.createElement("h1");
    quiz.appendChild(q);
    var i = 0;

    //iterate over the quiz questions array
    while (i < quizQuestions.length && timeLeft > 0) {

        //pick the questions from an object of quiz questions array
        q.textContent = quizQuestions[i].question;

        //prepare an ordered list to store answer choices as buttons
        var ansList = document.createElement("ol");
        ansList.className = "q-list";

        //iterate over the answers array of an object in quiz questions array
        for (var j = 0; j < quizQuestions[i].answers.length; ++j) {

            //create a button as we iterate through the answers array
            var ansLi = document.createElement("li");
            ansLi.className = "button";

            //add the current answer value to the text content of the button
            ansLi.textContent = `${j+1} ${quizQuestions[i].answers[j]}`;

            //add list items as buttons to the ordered list
            quiz.appendChild(ansList);
            ansList.appendChild(ansLi);
        }

        //select all the list items of the ordered list
        var items = document.querySelector(".q-list");

        //iterate over the list and add event listener to each item
        for (var x = 0; x < items.length; ++x) {

            items[x].addEventListener('click', function() {

                //if the text content of the button clicked matches the correct answer, increase score, and display message
                if (items.textContent === quizQuestions[i].correctAnswer) {
                    score += 10;
                    displayMessage('correct');
                }
                //else deduct time by 10 seconds 
                else {
                    timeLeft -= 10;
                    displayMessage('wrong');
                }

            });
        }
        ++i; //Putting the increment operation here obviously loops through the whole array, tried placing it within an onclick condition since I want to hold until the user clicks a button, but that becomes an infinite loop. How do i tackle this?
    }


}

function displayMessage(result) {

    var hr1E1 = document.createElement("hr");
    hr1E1.setAttribute("width", "5px");
    quiz.appendChild(hr1E1);
    var msg = document.createElement("p");
    msg.setAttribute('style', 'font-style:italic; opacity:0.8; color:lightgrey;');

    if (result === 'correct') {
        msg.textContent = "Correct!";
    } else {
        msg.textContent = "Wrong!";
    }

    quiz.appendChild(msg);
}