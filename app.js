//HTML макет
const div = document.createElement('div');
div.classList.add('wrapper');

const body = document.body;
body.appendChild(div);

const buttonsDiv = document.createElement('div');
buttonsDiv.className = 'btns';

const desk = document.createElement('div');
desk.classList.add('desk');

div.append(buttonsDiv)
div.appendChild(desk);

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

buttonsDiv.appendChild(startBtn);
buttonsDiv.appendChild(stopBtn);
buttonsDiv.appendChild(saveBtn);
buttonsDiv.appendChild(resultBtn);

const moves = document.createElement('p');
moves.classList.add('moves__wrapper');
moves.textContent = `Moves: ${'0'}`;

const time = document.createElement('span');
time.classList.add('time__wrapper');
time.textContent = `Time: ${'00:00'}`;

desk.insertAdjacentElement('beforebegin', moves);
desk.insertAdjacentElement('beforebegin', time);

const sizeChoise = document.createElement('a');
sizeChoise.className = 'size__choise';
sizeChoise.textContent = '4x4';

div.append(sizeChoise)
// 

const puzzleSize = 100;

const empty = {
    value: 0,
    top: 0,
    left: 0,
};

const puzzles = [];
puzzles.push(empty);

function move(index) {
    const puzzle = puzzles[index];
    
    const leftDiff = Math.abs(empty.left - puzzle.left);
    const topDiff = Math.abs(empty.top - puzzle.top);

    if (leftDiff + topDiff > 1) {
        return;
    }

    puzzle.element.style.left = `${empty.left * puzzleSize}px`;
    puzzle.element.style.top = `${empty.top * puzzleSize}px`;

    //координаты клеток, который меняются местами
    const emptyLeft = empty.left; 
    const emptyTop = empty.top;
    empty.left = puzzle.left;
    empty.top = puzzle.top;
    puzzle.left = emptyLeft;
    puzzle.top = emptyTop;

    const isFinished = puzzles.every(puzzle => {
        return puzzle.value === puzzle.top * 4 + puzzle.left;
    });

    if (isFinished) {
        alert('You win');}
}

const numbers = [...Array(15).keys()]
    .map(x => x + 1)
 

for (let i=1; i<=15; i++) {
    const puzzle = document.createElement('div');
    const value = numbers[i - 1];
    puzzle.className = 'puzzle';
    puzzle.innerHTML = value;

    const left = i % 4; //позиция ячейки по горизонтали
    const top = (i - left) / 4; //позиция ячейки по вертикали

    puzzles.push({
        value,
        left,
        top,
        element: puzzle,
    });

    puzzle.style.left = `${left * puzzleSize}px`;
    puzzle.style.top = `${top * puzzleSize}px`;

    desk.append(puzzle);

    puzzle.addEventListener('click', () => {
        move(i);
    });
}