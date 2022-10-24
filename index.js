//HTML макет
const div = document.createElement('div');
div.classList.add('wrapper');

const body = document.body;
body.appendChild(div);

const buttonsDiv = document.createElement('div');
buttonsDiv.className = 'btns';

const desk = document.createElement('div');
desk.classList.add('desk');

const startBtn = document.createElement('button');
startBtn.textContent = 'Shuffle & Start';
startBtn.type = 'button';
startBtn.classList.add('btn');

const stopBtn = document.createElement('button');
stopBtn.textContent = 'Stop';
stopBtn.type = 'button';
stopBtn.classList.add('btn');

const saveBtn = document.createElement('button');
saveBtn.textContent = 'Save';
saveBtn.type = 'button';
saveBtn.classList.add('btn');

const resultBtn = document.createElement('button');
resultBtn.textContent = 'Result';
resultBtn.type = 'button';
resultBtn.classList.add('btn');

buttonsDiv.append(startBtn, stopBtn, saveBtn, resultBtn);

let counterMoves = 0;
const moves = document.createElement('p');
moves.classList.add('moves__wrapper');
moves.textContent = `Moves: ${counterMoves}`;


const time = document.createElement('span');
time.classList.add('time__wrapper');
time.textContent = `Time: 0:00`;

const popStart = document.createElement('div');
popStart.className = 'pop__start';
popStart.textContent = `Press "Shuffle & Start" to start`

const popWon = document.createElement('div');
popWon.className = 'pop__won';
div.append(buttonsDiv, moves, time, desk, popStart, popWon)

// desk.insertAdjacentElement('beforebegin', moves);
// desk.insertAdjacentElement('beforebegin', time);

const three = document.createElement('div');
three.className = 'three';
three.textContent = '3x3';

const four = document.createElement('div');
four.className = 'four';
four.classList.add('active')
four.textContent = '4x4';

const five = document.createElement('div');
five.className = 'five';
five.textContent = '5x5';

const six = document.createElement('div');
six.className = 'six';
six.textContent = '6x6';

const seven = document.createElement('div');
seven.className = 'seven';
seven.textContent = '7x7';

const eight = document.createElement('div');
eight.className = 'eight';
eight.textContent = '8x8';

const frameSize = document.createElement('p');
frameSize.className = 'frame__size';
frameSize.textContent = `Frame size: ${four.textContent}`;

div.append(frameSize)

const ulDiv = document.createElement('div');
ulDiv.className = 'ul__div';
ulDiv.textContent = ''
div.append(ulDiv);

ulDiv.append(three, four, five, six, seven, eight)


const soundBtn = document.createElement('button');
soundBtn.type = 'button';
soundBtn.classList.add('sound__btn');

ulDiv.appendChild(soundBtn)

//
let numbers = [...Array(16).keys()].map(x => x + 1);

for (let i=1; i<=16; i++) {
    const puzzle = document.createElement('button');
    const value = numbers[i - 1];
    puzzle.className = 'puzzle';
    puzzle.innerHTML = value;
    desk.append(puzzle);
}

const puzzles = Array.from(document.querySelectorAll('.puzzle'));
const countPuzzles = 16;

//Счётчик ходов

function countMoves() {
    counterMoves++;
    moves.innerHTML = `Moves: ${counterMoves}`;
}


//Секундомер
let secundomer;
let zero = '0';

function secTimer() {
    let sec = 0;
    let min = 0;

    secundomer = setInterval(()=> {
        if (sec<10) {
            time.textContent = `Time: ${min}:${zero}${sec}`;
        } else if (sec>=10 && sec <60) {
            time.textContent = `Time: ${min}:${sec}`;
        } else if (sec>59 && min<10) {
            min++;
            sec=0;
            time.textContent = `Time: ${min}:${zero}${sec}`;
        } 
        sec++;
    }, 1000)
}

/*1.POSITION*/
popWon.style.display = 'none';
puzzles[countPuzzles - 1].style.display = 'none';
let matrix = getMatrix(
    puzzles.map((puzzle) => Number(puzzle.textContent))
);
setPositionsPuzzles(matrix);

/*2.Shuffle*/
const maxShuffleCount = 0;
let timer;

startBtn.addEventListener('click', () => {
    popWon.style.display = 'none';
    moves.innerHTML = `Moves: ${counterMoves=0}`;
    randomSwap(matrix);
    setPositionsPuzzles(matrix);

    if (time.textContent === 'Time: 0:00') {
    setTimeout(() => {
        secTimer()
    }, 1000);} else {
        clearInterval(secundomer);
        setTimeout(() => {
            secTimer()
        }, 1000);
    }

    popStart.style.display = 'none';

    let shuffleCount = 0;
    clearInterval(timer);

        timer = setInterval(() => {
            randomSwap(matrix);
            setPositionsPuzzles(matrix);

            shuffleCount +=1;

            if (shuffleCount >= maxShuffleCount) {
                clearInterval(timer);
            }
        }, 20)

})

stopBtn.addEventListener('click', () => {
    clearInterval(secundomer);
    popStart.style.display = 'inherit';
})
/*3.Change position*/
const blankNumber = 16;
desk.addEventListener('click', (event) => {
    const buttonPuzzle = event.target.closest('button');
    if (!buttonPuzzle) {return}

    const buttonNumber = Number(buttonPuzzle.textContent);
    const buttonCoords = findCoorinatesByNumber(buttonNumber, matrix);
    const blankCoords = findCoorinatesByNumber(blankNumber, matrix);

    const isValid = isValidForSwap(buttonCoords, blankCoords);

    if(isValid) {
        swap(blankCoords, buttonCoords, matrix);
        setPositionsPuzzles(matrix);
        countMoves();
        soundPuzzle.play()
    }
})
/*
    Helpers
*/
let blockCoords = null;

function getMatrix(arr) {
    const matrix = [[],[],[],[]];
    let y = 0;
    let x = 0;

    for (let i=0; i<arr.length; i++) {
        if (x >= 4) {
            y++;
            x=0;
        }
        
        matrix[y][x] = arr[i];
        x++;
    }
    return matrix;
}

function setPositionsPuzzles(matrix) {
    for (let y=0; y<matrix.length; y++) {
        for (let x=0; x<matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = puzzles[value - 1];
            setNodeStyles(node, x, y)
        }
    }
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

function findCoorinatesByNumber(number, matrix) {
    for (let y=0; y<matrix.length; y++) {
        for (let x=0; x<matrix[y].length; x++) {
            if(matrix[y][x] === number) {
                return {x,y};
            }
        }
    }
    return null;
}

function randomSwap(matrix) {
    const blankCoords = findCoorinatesByNumber(blankNumber, matrix);
    const validCoords = findValidCoords({
        blankCoords,
        matrix,
        blockCoords,
    });

    const swapCoords = validCoords [
        Math.floor(Math.random() * validCoords.length)
    ];
    swap(blankCoords, swapCoords, matrix);
    blockCoords = blankCoords;
}

function findValidCoords({blankCoords, matrix, blockCoords}) {
    const validCoords = [];

    for (let y=0; y<matrix.length; y++) {
        for (let x=0; x<matrix[y].length; x++) {
            if (isValidForSwap({x,y}, blankCoords)) {
                if (!blockCoords || !(
                    blockCoords.x === x && blockCoords.y === y)) {
                    validCoords.push({x,y})
                }
            }
        }
    }

    return validCoords;
}

function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x);
    const diffY = Math.abs(coords1.y - coords2.y);
    
    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y);
}

function swap(coords1, coords2, matrix) {
    const coords1Number = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Number;

    if (isWon(matrix)) {
        addWonClass();
        clearInterval(secundomer);
    }
}

const winFlatArr = [...Array(16).keys()].map(x => x + 1);

function isWon(matrix) {
    const flatMatrix = matrix.flat();
    for (let i=0; i<winFlatArr.length; i++) {
        if (flatMatrix[i] !== winFlatArr[i]) {
            return false;
        }
    }
    return true;
}

function addWonClass() {
    popWon.style.display = 'inherit';
    popWon.textContent = `Hooray! You solved the puzzle in ${time.textContent} and ${counterMoves+1} moves!`
}

//звук перемещения плитки
soundBtn.addEventListener('click', () => {
    soundBtn.classList.toggle('active');
    if (soundBtn.classList.contains('active')) {
        soundPuzzle.volume = 0;
    } else {
        soundPuzzle.volume = 0.2;
    }
    
})
const soundPuzzle = new Audio('./sound/pop.mp3');
soundPuzzle.volume = 0.2;
console.log(soundPuzzle.volume===0.2);