const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    // console.log('clicked');
    // *this* represents the element that fired the event via event listener 
    // console.log(this);
    this.classList.add('flip');
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        // console.log({hasFlippedCard, firstCard});
    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this;

        // console.log({firstCard, secondCard});

        // do cards match?
        // console.log(firstCard.dataset.framework);
        // console.log(secondCard.dataset.framework);
        if (firstCard.dataset.framework === 
            secondCard.dataset.framework) {
                // its a match
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
            } else {
                // not a match
                setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                }, 1500);
            } 
    }
}

// loop through list into each one of the cards and listen for click event and execute function flipCard
cards.forEach(card => card.addEventListener('click', flipCard))