// normal variables
let userScore = 0;
let computerScore = 0;
// DOM variables
const userScore_span = document.querySelector('.user-score');
const computerScore_span = document.querySelector('.computer-score');
//
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.querySelector('.result');
const rock_div = document.querySelector('.r');
const paper_div = document.querySelector('.p');
const scissors_div = document.querySelector('.s');

// generate random choice of r p or s
function getComputerChoice() {
    const choices = ['r', 's', 'p'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// converting variables to readable words on DOM
function convertToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissors";
}

// function for if user wins
function win (userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    result_div.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. You Win!`;
    document.querySelector('.result').classList.add('green-glow');
    setTimeout(function() { 
        document.querySelector('.result').classList.remove('green-glow');
        result_div.innerHTML = "Make your move...loser will be eliminated";
    }, 3000)
}

// function for if user loses
function lose (userChoice, computerChoice) {
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_div.innerHTML = `${convertToWord(computerChoice)} beats ${convertToWord(userChoice)}. You Lose...`;
    document.querySelector('.result').classList.add('red-glow');
    setTimeout(function() { 
        document.querySelector('.result').classList.remove('red-glow');
        result_div.innerHTML = "Make your move...loser will be eliminated";
    }, 3000)
}

// function for if user ties
function tie (userChoice, computerChoice) {
    result_div.innerHTML = `${convertToWord(userChoice)} ties ${convertToWord(computerChoice)}. Tie.`;
    document.querySelector('.result').classList.add('grey-glow');
    setTimeout(function() { 
        document.querySelector('.result').classList.remove('grey-glow');
        result_div.innerHTML = "Make your move...loser will be eliminated";
    }, 3000)
}

// define wins losses and ties 
function game(userChoice) {
    const computerChoice = getComputerChoice();
    // console.log('computerChoice: ' + computerChoice);
    // console.log('userChoice: ' + userChoice);
    switch(userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            tie(userChoice, computerChoice);
            break;
    }
}

game();

// add functionality to options with addeventlisteners
function main () {
    rock_div.addEventListener('click', () => game("r"));

    paper_div.addEventListener('click', () => game("p"));

    scissors_div.addEventListener('click', () => game("s"));
}

main();