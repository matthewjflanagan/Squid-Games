const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const startBtn = document.querySelector('.startBtn');
const timeLeft = document.querySelector('#time-left');
let countDownTimeId = setInterval(1000)
let timerId = null
const score = document.querySelector('#score');
var mode = "go";

let result = 0
let hitPosition
let currentTime = 60

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
});

function moveMole() {
    timeId = setInterval(randomSquare, 500)
}

function countDown () {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {

    }
    var timerInterval = setInterval(function () {
        currentTime--;
        timeLeft.textContent = currentTime;
    
        if(currentTime-- <= 0) {
            // Stops execution of action at set interval 0
            clearInterval(timerId);
            clearInterval(countDownTimeId);

        } else if (result > 60) {
            // Stops execution of action at set interval 0
            clearInterval(timerId);
            // Calls function to show score and option to enter intials into Highscores 
        }
        }, 1000);
}

startBtn.addEventListener('click', function () {
  // If start button is pressed hide it
  if (mode === "go") {
    mode = "hide";
    startBtn.setAttribute("class", "hide");
  } 
  // If start button has not been pressed show it
  else {
    mode = "go"
  }
  moveMole();
  countDown();
});



