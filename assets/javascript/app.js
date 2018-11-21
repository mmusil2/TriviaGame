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
    q2 = {}

];

var correctanswer;

var timer = {
    time: 5,
    start: function() {
        $("#timeremaining").html(timer.time);
        myInterval = setInterval(timer.count, 1000);
    },
    stop: function() {
        clearInterval(myInterval);
    },
    count: function() {
        timer.time--;
        $("#timeremaining").html(timer.time);
        console.log(timer.time);
    }
}

function makePage(object) {
    timer.start();
    $("#question").text(object.q);
    $("#option1").text(object.opt1);
    $("#option2").text(object.opt2);
    $("#option3").text(object.opt3);
    $("#option4").text(object.opt4);
    correctanswer = object.correct;
}

function loseScreen(object) {
    $("#question").text("You Lose!");
    newimg = $("<img>");
    newimg.attr("src", "assets/images/" + object.img);
    $("#option1").text("The Correct Answer was: " + object.correctans);
    $("#option2").html(newimg);
    $("#option3").empty();
    $("#option4").empty();
}

makePage(trivia[0]);

$(".choice").on("click", function() {
    if ($(this).attr("opt") == correctanswer) {
        // go to correct answer page
        $("#question").text("YES!");
    } else {
        // go to incorrect answer
    }
});

setTimeout(function() {
    timer.stop();
    loseScreen(trivia[0]);
}, 5000);

console.log(timer.time);

