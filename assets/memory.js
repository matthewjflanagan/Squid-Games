const cards = document.querySelectorAll('.memory-card');
const lives_span = document.querySelector('.lives');
let lives = 5;
let point = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    // console.log('clicked');
    // *this* represents the element that fired the event via event listener 
    // console.log(this);
    this.classList.add('flip');
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
        // console.log({hasFlippedCard, firstCard});
    } 
        // second click
        hasFlippedCard = false;
        secondCard = this;
        // console.log({firstCard, secondCard});

    checkForMatch();
}

function checkForMatch () {
        // do cards match?
        // console.log(firstCard.dataset.framework);
        // console.log(secondCard.dataset.framework);
        if (isMatch = firstCard.dataset.framework === 
            secondCard.dataset.framework) {
                disableCards();
                gainPoint();
            } else {
                unflipCards();
                loseLife();
            }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function loseLife() {
    lives--;
    lives_span.innerHTML = lives;
    if (lives <= 0) {
        // prompt that user lost and ask if they would like to restart the game
        $('.memory-game').addClass("hide");
        $('.rules').addClass("hide");
        $(".memoryLoseDiv").removeClass("hide");
    }
}

function gainPoint() {
    point++;
    if(point >= 6) {
        $('.memory-game').addClass("hide");
        $('.rules').addClass("hide");
        $(".memoryWinDiv").removeClass("hide");
    }
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// loop through list into each one of the cards and listen for click event and execute function flipCard
cards.forEach(card => card.addEventListener('click', flipCard))

winGame();
loseGame();