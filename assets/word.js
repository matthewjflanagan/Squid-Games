const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const word = "PRANK"
const keys = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'ENTER',
    '<<',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const titleElement = document.createElement('div')
        titleElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        titleElement.classList.add('tile')
        rowElement.append(titleElement)
    })
    tileDisplay.append(rowElement)
})

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    console.log('clicked', letter)
    if(letter === '<<') {
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    if(letter === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
        return
    }
    addLetter(letter)
}

const addLetter = (letter) => {
    if(currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = letter
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter)
    currentTile++
    }
}

const deleteLetter = () => {
        if (currentTile > 0){
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {

    const guess = guessRows[currentRow].join('')

    if (currentTile > 4) {
        flipTile()
        if(word == guess) {
            isGameOver = true
            $('.game-container').addClass("hide");
            $(".wordWinDiv").removeClass("hide");
        } else {
            if(currentRow >= 5) {
                isGameOver = true
                $('.game-container').addClass("hide");
                $(".wordLoseDiv").removeClass("hide");
            }
            if(currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
        
    }
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)

    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWord = word
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == word[index]) {
            guess.color = 'green-overlay'
            checkWord = checkWord.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWord.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWord = checkWord.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}