var trivia = [
    q1 = {
        q: "What is the race of the creature from the Predator films?",
        opt1: "Blah",
        opt2: "Bleh",
        opt3: "Yautja",
        opt4: "Not this",
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
        q: "What short story is the movie 'Blade Runner' based on?",
        opt1: "The Nine Billion Names of God",
        opt2: "The Razor's Edge",
        opt3: "Metropolis",
        opt4: "Do Androids Dream of Electric Sheep",
        correct: 4,
        correctans: "Do Androids Dream of Electric Sheep",
        img: "bladerunner.jpg"
    }

];

var correctanswer;
var timeup;

var q = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

var timer = {
    time: 5,
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
    $("#question").text("All done. Here is how you did!");
    $("#option1").text("Correct Answers: " + correct);
    $("#option2").text("Incorrect Answers: :" + incorrect);
    $("#option3").text("Unanswered: " + unanswered);
    $("#option4").empty();
    $("#buttons").append(startover);
    $("#startover").on("click", function() {
        q = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        $("#startover").detach();
        makePage(trivia[q]);
    });
}

function startPage() {
    var start = $('<button id="start">START</button>');
    // $("#question").empty();
    $("#buttons").append(start);
    // $("#option2").empty();
    // $("#option3").empty();
    // $("#option4").empty();
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
        timer.time = 5;
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
    // $("#question").text("You Lose!");
    timer.stop();
    newimg = $("<img>");
    newimg.attr("src", "assets/images/" + object.img);
    $("#question").text("The Correct Answer was: " + object.correctans);
    $("#option1").empty();
    $("#option2").empty();
    $("#option3").empty();
    $("#option4").empty();
    $("#answerimg").html(newimg);
    q++;
    setTimeout(function() {makePage(trivia[q]);}, 5000);
}

function winScreen(object) {
    clear();
    timer.stop();
    newimg = $("<img width='500'>");
    newimg.attr("src", "assets/images/" + object.img);
    $("#option1").empty();
    $("#option2").empty();
    $("#option3").empty();
    $("#option4").empty();
    $("#answerimg").html(newimg);
    q++;
    setTimeout(function() {makePage(trivia[q]);}, 5000);
}

function timeOut() {
    timeup = setTimeout(function() {
        $("#message").text("Time's Up!");
        unanswered++;
        loseScreen(trivia[q]);
    }, 5000);
}

// makePage(trivia[q]);
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

// setTimeout(function() {
//     $("#question").text("You Lose!");
//     loseScreen(trivia[q]);
// }, 5000);

console.log(timer.time);

