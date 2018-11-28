var trivia = [
    q1 = {
        q: "What is the race of the creature from the Predator films?",
        opt1: "Sangheili",
        opt2: "Huragok",
        opt3: "Yautja",
        opt4: "Kig-Yar",
        correct: 3,
        correctans: "Yautja",
        img: "predator.jpg"
    },
    q2 = {
        q: "The alien from the 1982 classic 'The Thing' takes the shape of what animal in the beginning of the film?",
        opt1: "Dog",
        opt2: "Cat",
        opt3: "Bear",
        opt4: "Spider",
        correct: 1,
        correctans: "Dog",
        img: "thing.jpg"
    },
    q3 = {
        q: "What novel by Philip K. Dick is the movie 'Blade Runner' based on?",
        opt1: "The Nine Billion Names of God",
        opt2: "The Razor's Edge",
        opt3: "Metropolis",
        opt4: "Do Androids Dream of Electric Sheep",
        correct: 4,
        correctans: "Do Androids Dream of Electric Sheep",
        img: "bladerunner.jpg"
    },
    q4 = {
        q: "What's the name of the ship in the 1979 film 'Alien?'",
        opt1: "Sulaco",
        opt2: "Ganymede",
        opt3: "Spacefleet",
        opt4: "Nostromos",
        correct: 4,
        correctans: "Nostromos",
        img: "alien.jpg"
    },
    q5 = {
        q: "Kurt Russell plays what iconic character in the 1981 classic 'Escape from New York'?",
        opt1: "Snake Plissken",
        opt2: "John Matrix",
        opt3: "Ash",
        opt4: "Solid Snake",
        correct: 1,
        correctans: "Snake Plissken",
        img: "escape.jpg"
    },
    q6 = {
        q: "In 'The Terminator,' which character does the T-800 travel back in time to terminate?",
        opt1: "Kyle Reese",
        opt2: "John Connor",
        opt3: "Sarah Connor",
        opt4: "Ellen Ripley",
        correct: 3,
        correctans: "Sarah Connor",
        img: "terminator.jpg"
    },
    q7 = {
        q: "What year does Marty McFly travel back to in the film 'Back to the Future'?",
        opt1: "1959",
        opt2: "1955",
        opt3: "1951",
        opt4: "1961",
        correct: 2,
        correctans: "1955",
        img: "bttf.jpg"
    },
    q8 = {
        q: "What is the name of the leader on Mars in 'Total Recall' from 1990?",
        opt1: "Cohen",
        opt2: "Conrad",
        opt3: "Cohaagen",
        opt4: "Copenhaagen",
        correct: 3,
        correctans: "Cohaagen",
        img: "total.jpg"
    },
    q9 = {
        q: "What city is the film 'RoboCop' set it?",
        opt1: "Los Angeles",
        opt2: "Detroit",
        opt3: "Baltimore",
        opt4: "Chicago",
        correct: 2,
        correctans: "Detroit",
        img: "robocop.jpg"
    },
    q10 = {
        q: "In 'Star Wars: The Empire Strikes Back,' what planet does Luke visit to find Jedi Master Yoda?",
        opt1: "Endor",
        opt2: "Yavin 4",
        opt3: "Hoth",
        opt4: "Dagobah",
        correct: 4,
        correctans: "Dagobah",
        img: "starwars.jpg"
    }
];

var correctanswer;
var timeup;

var q = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

var timer = {
    time: 30,
    start: function() {
        $("#timeremaining").html("Time Remaining: " + timer.time);
        myInterval = setInterval(timer.count, 1000);
    },
    stop: function() {
        clearInterval(myInterval);
    },
    count: function() {
        timer.time--;
        $("#timeremaining").html("Time Remaining: " + timer.time);
        console.log(timer.time);
    }
}

function clear() {
    $("#question").empty();
    $("#option1").empty();
    $("#option2").empty();
    $("#option3").empty();
    $("#option4").empty();
    $("#answerimg").empty();
}

function endPage() {
    clear();
    var startover = $('<button id="startover">START OVER?</button>');
    $("#question").text("All done. Here's how you did!");
    $("#buttons").append("Correct Answers: " + correct + "<br>");
    $("#buttons").append("Incorrect Answers: :" + incorrect + "<br>");
    $("#buttons").append("Unanswered: " + unanswered + "<br>");
    $("#option4").empty();
    $("#buttons").append(startover);
    $("#startover").on("click", function() {
        q = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        $("#buttons").empty();
        makePage(trivia[q]);
    });
}

function startPage() {
    var start = $('<button id="start">START</button>');
    $("#buttons").append(start);
    $("#start").on("click", function() {
        $("#start").detach();
        makePage(trivia[q])
    });
}

function makePage(object) {
    $("#message").empty();
    clear();
    if (q == trivia.length) {
        endPage();
    } else {
        timer.time = 30;
        timer.start();
        timeOut();
        $("#question").text(object.q);
        $("#option1").text(object.opt1);
        $("#option2").text(object.opt2);
        $("#option3").text(object.opt3);
        $("#option4").text(object.opt4);
        correctanswer = object.correct;
    }
}

function loseScreen(object) {
    clear();
    timer.stop();
    newimg = $("<img width='750px'>");
    newimg.attr("src", "assets/images/" + object.img);
    $("#question").text("The Correct Answer was: " + object.correctans);
    $("#answerimg").html(newimg);
    q++;
    setTimeout(function() {makePage(trivia[q]);}, 5000);
}

function winScreen(object) {
    clear();
    timer.stop();
    newimg = $("<img width='750px'>");
    newimg.attr("src", "assets/images/" + object.img);
    $("#answerimg").html(newimg);
    q++;
    setTimeout(function() {makePage(trivia[q]);}, 5000);
}

function timeOut() {
    timeup = setTimeout(function() {
        $("#message").text("Time's Up!");
        unanswered++;
        loseScreen(trivia[q]);
    }, 30000);
}

// starts the game
startPage();

$(".choice").on("click", function() {
    if ($(this).attr("opt") == correctanswer) {
        // go to correct answer page
        clearTimeout(timeup);
        $("#message").text("Correct!");
        correct++;
        winScreen(trivia[q]);        
    } else {
        // go to incorrect answer
        clearTimeout(timeup);
        $("#message").text("Nope!");
        incorrect++;
        loseScreen(trivia[q]);
    }
});
