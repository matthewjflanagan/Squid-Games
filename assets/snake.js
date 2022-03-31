const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

let score = 0;

function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
  
//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
    swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
        alert('You just swiped left!')
})
*/

// const gulpSound = new Audio("gulp.mp3")

// game loop
function drawGame() {
    clearScreen();
    changeSnakePosition();
    let result = isGameOver();
    if(result) {
        return;
    }
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if (score > 2){
        speed = 11;
    }
    if (score > 5){
        speed = 15;
    }

    setTimeout(drawGame, 1000/ speed);
}

function isGameOver() {
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    // walls
    if (headX < 0){
        gameOver = true;
        $('#game').addClass("hide");
        $(".snakeLoseDiv").removeClass("hide");
    } else if (headX === tileCount){
        gameOver = true;
        $('#game').addClass("hide");
        $(".snakeLoseDiv").removeClass("hide");
    } else if (headY < 0){
        gameOver = true;
        $('#game').addClass("hide");
        $(".snakeLoseDiv").removeClass("hide");
    } else if (headY === tileCount){
        gameOver = true;
        $('#game').addClass("hide");
        $(".snakeLoseDiv").removeClass("hide");
    } 

    // hit self

    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        if(part.x === headX && part.y === headY){
            gameOver = true;
            $('#game').addClass("hide");
            $(".snakeLoseDiv").removeClass("hide");
            break;
        }

        // win
        if(score === 12){
            $('#game').addClass("hide");
            $(".snakeWinDiv").removeClass("hide");
        }
    }

    if(gameOver) {
        ctx.fillStyle = "#FF006F";
        ctx.font = "50px Orbitron"

        ctx.fillText("Game Over!", canvas.width / 9.0, canvas.height / 2)
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "#FF006F";
    ctx.font = "15px Orbitron"
    ctx.fillText("Score " + score, canvas.width-75, 15);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

    ctx.fillStyle = '';
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY)); // put an item at the end of the list next to the head
    if(snakeParts.length > tailLength) {
        snakeParts.shift(); // remove furthest item from the snake parts if we have more than the tail size 
    }
    ctx.fillStyle = '#217568';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = "#FF006F"
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        // gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

//SWIPE USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
    swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
        alert('You just swiped left!')
})
*/

function keyDown(event) {
    //up
    if(event.keyCode == 38 || swipedir == 'up') {
        if (yVelocity == 1)
            return 
        yVelocity = -1;
        xVelocity = 0;
    }
    // down
    if(event.keyCode == 40 || swipedir == 'down') {
        if (yVelocity == -1)
            return 
        yVelocity = 1;
        xVelocity = 0;
    }

    // left
    if(event.keyCode == 37 || swipedir == 'left') {
        if (xVelocity == 1)
        return 
        yVelocity = 0;
        xVelocity = -1;
    }

    // right
    if(event.keyCode == 39 || swipedir == 'right') {
        if (xVelocity == -1)
        return 
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();

