const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('message-container')

const wordle = "wordle"
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
    'ENTER',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
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

const handleClick = (key) => {
    console.log('clicked', key)
    if(key === '<<') {
        deleteLetter()
        console.log('guessRows', guessRows)
    }
    if(key === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
    }
    addLetter(key)
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
    currentTile--
    const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = ''
    guessRows[currentRow][currentTile] = ''
    tile.setAttribute('data', letter)
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if (currentTile > 4) {
        if(wordle == guess) {
            showMessage('great!')
            isGameOver = true
            return
        } else {
            if(currentRow >= 5) {
                isGameOver = false
                return
                showMessage('game over')
            }
            if(currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
        
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}