
var startButton = document.getElementById("startButton");
var timerEl = document.getElementById("timer");
var introMessage =document.getElementById("introMessage");
var questionCard = document.getElementById("questionCard");
var questionEl = document.getElementById("questionText");
var endGameEl = document.getElementById("endGame");
var answerEl1 = document.getElementById("answer1");
var answerEl2 = document.getElementById("answer2");
var answerEl3 = document.getElementById("answer3");
var answerEl4 = document.getElementById("answer4");

var displayQuestionArray =[];
var displayQuestionIndex = 0;
var goBack = document.getElementById("goBack");
var viewHighScores = document.getElementById("viewHighScores");
var resetScore = document.getElementById("resetScore");
var answerEl = document.getElementById("answers");
var resultEl = document.getElementById("result");
var initials = document.getElementById("initials");


var index = 0;

resultEl.textContent='';

questionCard.setAttribute("style", "visibility: hidden");
endGameEl.setAttribute("style", "visibility: hidden");


//Event listener for start game
startButton.addEventListener("click", startGame);


//Initializes the timer
function timer(timeLeft){
        var timerInterval = setInterval(function() {
          timeLeft--;
          timerEl.textContent = "Seconds remaining: " + timeLeft;
      
          if(timeLeft <= 0) {
            clearInterval(timerInterval);
            questionCard.setAttribute("style", "visibility: hidden");
            endGameEl.setAttribute("style", "visibility: visible");
            return timeLeft = 0;
          }
      
        }, 1000);
}

//Begin question game, shuffle questions, initiliaze questionAnswer game
function startGame(event){
    event.stopPropagation();
    startButton.setAttribute("style", "visibility: hidden");
    introMessage.setAttribute("style", "display: none");
    questionCard.setAttribute("style", "visibility: visible");
    
    questionAnswer(displayQuestionArray);
};

//Retrieves questions and answers to allow user to interact. Validates choices and initializes timer
function questionAnswer(array){
    let initialText = prompt('Please enter your initials');
    localStorage.setItem("initials", initialText);
    var timeLeft = 50;
    timer(timeLeft);
    var correctCount = 0;
    showQuestion(array, index, correctCount);
    
}

//Using shuffled questions, starts the game, and validates
function showQuestion(array, index, correctCount){
    if (index < array.length) {
    resultEl.textContent = "Current Score:" + correctCount;
    var currentQuestion = array[index][0];
    var correctAnswer = array[index][1][0];
    questionEl.textContent = currentQuestion;
    var randomizedAnswers= shuffleArray(array[index][1]);

    console.log(correctAnswer);

    //Show Answer Options
    answerEl1.textContent = randomizedAnswers[0];
    answerEl2.textContent = randomizedAnswers[1];
    answerEl3.textContent = randomizedAnswers[2];
    answerEl4.textContent = randomizedAnswers[3];

    answerEl.addEventListener("click", function(e) {
        if (e.target.textContent === correctAnswer ) {
            correctCount++;
            resultEl.textContent = "CORRECT! You have answered: " + correctCount + " questions correctly.";
            index += 1;
            showQuestion(array, index, correctCount);
        }
        else {
        resultEl.textContent = "Current Score: " + correctCount;
        index += 1;
        showQuestion(array, index, correctCount);
        }
    });
}
else {
        questionCard.setAttribute("style", "visibility: hidden");
        endGameEl.setAttribute("style", "visibility: visible");
    }
    localStorage.setItem("count", correctCount);

}


/* Randomize array to be used for shuffling the questions AND the questions' answer options */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function highScores(){
    localStorage.getItem("count");
}


goBack.addEventListener("click", function(){
    startButton.setAttribute("style", "visibility: visible");
    questionCard.setAttribute("style", "visibility: hidden");
    endGameEl.setAttribute("style", "visibility: hidden");
});

resetScore.addEventListener("click", function(){
    localStorage.setItem("count", 0);
});



//QUESTIONS, correct answer is always in the index[0] position in the answer options
displayQuestionArray= [['What does the === comparison operator do?',
['It tests for equality of value and type', 
'It sets one variable equal to another in both value and type', 
'It tests for equality of type only',
'It tests for equality of value only']],

['Which choice is NOT part of CSS box model?',
['paragraph', 'margin', 'border', 'padding']],

['Which CSS property will not trigger layout recalculation?', 
['opacity', 'top', 'width', 'height']],

['Which attribute must have a unique value each time it is used in an HTML document?',
['id', 'title', 'class', 'style']]];
