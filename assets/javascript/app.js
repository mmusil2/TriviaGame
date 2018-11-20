var trivia = [
    q1 = {
        q: "What is the race of the creature from the Predator films?",
        opt1: "Blah",
        opt2: "Bleh",
        opt3: "Yautja",
        opt4: "Not this",
        correct: 3
    },
    q2 = {}

];

var correctanswer;

function makePage(object) {
    // timer stuff
    $("#question").text(object.q);
    $("#option1").text(object.opt1);
    $("#option2").text(object.opt2);
    $("#option3").text(object.opt3);
    $("#option4").text(object.opt4);
    correctanswer = object.correct;
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