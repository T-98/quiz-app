//global variables
var quiz = document.getElementById("quiz");
var clock = document.getElementById("clock");
var currentQuestion = 0;
var timeLeft = 75;
var score = 0;
var cleanup;
var timeInterval;
var username = "";

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
        correctAnswer: "Quotes"
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
    startQuiz();
});

function countdown() {
    timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            clock.textContent = timeLeft;
            --timeLeft;
        } else {
            clock.textContent = timeLeft;
            cleanup();
            //call end screen function
            endScreen();
        }
    }, 1000);
}

function startQuiz() {

    countdown();
    createQuestion();

}

//creates a question along with answer choices
function createQuestion(result) {

    var q = document.createElement("h1");
    quiz.appendChild(q);
    //pick the questions from an object of quiz questions array
    q.textContent = quizQuestions[currentQuestion].question;

    //prepare an ordered list to store answer choices as buttons
    var ansList = document.createElement("ul");
    ansList.className = "q-list";

    //prepare display message
    var msg = document.createElement("p");
    var hr1E1 = document.createElement("hr");
    hr1E1.setAttribute('style', 'display:none;');

    //presents answer choices
    //iterate over the answers array of an object in quiz questions array
    for (var j = 0; j < quizQuestions[currentQuestion].answers.length; ++j) {

        //create a button as we iterate through the answers array
        var ansLi = document.createElement("li");
        ansLi.className = "button";

        //add the current answer value to the text content of the button
        ansLi.textContent = `${j+1}. ${quizQuestions[currentQuestion].answers[j]}`;

        //add list items as buttons to the ordered list
        quiz.appendChild(ansList);
        ansList.appendChild(ansLi);

        cleanup = function() {
            quiz.removeChild(ansList);
            quiz.removeChild(q);
            quiz.removeChild(msg);
            quiz.removeChild(hr1E1);

            cleanup = function() {};
        }

        //iterate over the list and add event listener to each item
        ansLi.addEventListener('click', function() {
            var condition = "";
            //for every li, this will refer to the text content of every individual li
            if (this.textContent.slice(3) === quizQuestions[currentQuestion].correctAnswer) {
                //update score
                score += 10;
                //display message
                condition = "correct";
            } else {
                //deduct time by 10s
                timeLeft -= 10;

                //display message
                condition = "incorrect";
            }

            //cleanup the DOM before switching over
            cleanup();

            //update current question index
            if (currentQuestion < quizQuestions.length - 1) {
                ++currentQuestion;
                //switch to the next question
                createQuestion(condition);
            } else {
                //end screen
                endScreen(condition);
            }


        });
    }

    //appending line and msg with no text content for the first question
    quiz.appendChild(hr1E1);
    quiz.appendChild(msg);

    if (result != undefined) {
        hr1E1.setAttribute('style', 'display:flex; color:grey;');
        msg.setAttribute('style', 'font-style:italic; color:lightgrey;');

        if (result === 'correct') {
            msg.textContent = "Correct!";
        } else {
            msg.textContent = "Wrong!";
        }
    }

}

function endScreen(condition) {
    var head = document.createElement("h1");
    var final = document.createElement("p");
    head.textContent = "All done!";
    final.textContent = `Your final score is ${score}.`;

    var inputLabel = document.createElement("p");
    inputLabel.textContent = "Enter initials: ";

    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");

    var submit = document.createElement("button");
    submit.className = "button";
    submit.textContent = "Submit";

    var msg = document.createElement("p");
    var hr1E1 = document.createElement("hr");
    hr1E1.setAttribute('style', 'display:none;');

    if (condition != undefined) {
        hr1E1.setAttribute('style', 'display:flex; color:grey;');
        msg.setAttribute('style', 'font-style:italic; color:lightgrey;');

        if (condition === 'correct') {
            msg.textContent = "Correct!";
        } else {
            msg.textContent = "Wrong!";
        }
    }

    submit.addEventListener('click', function() {
        username = input.value;
        var array = [];
        var obj = { name: username, score: score };

        array = localStorage.getItem("scoreboard");

        if (array === null) array = [];
        else {
            array = JSON.parse(array);
        }

        var find = array.findIndex(function(x) {
            if (x.name === username) return true;
            else return false;
        });

        if (find != -1) {
            if (array[find].score < score) array[find].score = score;
        } else array.push(obj);

        array.sort(function(y, z) {
            if (y.score > z.score) return -1;
            else if (z.score > y.score) return 1;
            else return 0;
        })


        localStorage.setItem("scoreboard", JSON.stringify(array));

        window.location.href = "highscore.html";
    });

    quiz.appendChild(head);
    quiz.appendChild(final);
    quiz.appendChild(inputLabel);
    inputLabel.appendChild(input);
    inputLabel.appendChild(submit);
    quiz.appendChild(hr1E1);
    quiz.appendChild(msg);

    clearInterval(timeInterval);
}