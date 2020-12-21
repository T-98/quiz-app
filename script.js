//global variables
var quiz = document.getElementById("quiz");
var clock = document.getElementById("clock");
var timeLeft = 75;

var quizQuestions = [{
    question: "Commonly used data types DO NOT include:",
    answers: ["Strings", "Booleans", "Alerts", "Numbers"],
}]







//before the start quiz button is clicked, set the default page view
if (timeLeft === 75) {
    var h1E1 = document.createElement("h1");
    var p1E1 = document.createElement("p");
    var startbtn = document.createElement("button");

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

});