var scoreboard = document.getElementById("scoreboard");
var array = [];

array = localStorage.getItem("scoreboard");

if (array === undefined) array = [];
else {
    array = JSON.parse(array);
}

var h1 = document.createElement("h1");
var ul = document.createElement("ul");

ul.className = "noBullets";

h1.textContent = "High scores";
scoreboard.appendChild(h1);
scoreboard.appendChild(ul);

if (array != null) {
    for (var i = 0; i < array.length; ++i) {
        var li = document.createElement("li");
        li.textContent = `${i+1}. ${array[i].name} - ${array[i].score}`;
        ul.appendChild(li);
    }
}

var button1 = document.createElement("button");
button1.className = "button";
button1.textContent = "Go back";
scoreboard.appendChild(button1);

var button2 = document.createElement("button");
button2.className = "button";
button2.textContent = "Clear high scores";
scoreboard.appendChild(button2);

button1.addEventListener('click', function() {
    window.location.href = "index.html";
});

button2.addEventListener('click', function() {
    localStorage.removeItem('scoreboard');

    window.location.href = "highscore.html";
});