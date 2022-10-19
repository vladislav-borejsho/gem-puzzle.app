const div = document.createElement('div');
div.classList.add('wrapper');

const body = document.body;
body.appendChild(div);

const desk = document.createElement('div');
desk.classList.add('desk');

div.appendChild(desk);

const startBtn = document.createElement('button');
startBtn.textContent = 'Shuffle & Start';
startBtn.type = 'button';
startBtn.classList.add('start__btn');

const stopBtn = document.createElement('button');
stopBtn.textContent = 'Stop';
stopBtn.type = 'button';
stopBtn.classList.add('stop__btn');

const saveBtn = document.createElement('button');
saveBtn.textContent = 'Save';
saveBtn.type = 'button';
saveBtn.classList.add('save__btn');

const resultBtn = document.createElement('button');
resultBtn.textContent = 'Result';
resultBtn.type = 'button';
resultBtn.classList.add('result__btn');

const moves = document.createElement('p');
moves.classList.add('moves__wrapper');
moves.textContent = `Moves: ${'0'}`;

const time = document.createElement('p');
time.classList.add('time__wrapper');
time.textContent = `Time: ${'00:00'}`;

desk.insertAdjacentElement('beforebegin', startBtn);
desk.insertAdjacentElement('beforebegin', stopBtn);
desk.insertAdjacentElement('beforebegin', saveBtn);
desk.insertAdjacentElement('beforebegin', resultBtn);
desk.insertAdjacentElement('beforebegin', moves);
desk.insertAdjacentElement('beforebegin', time);

const puzzle = document.createElement('div');
puzzle.classList.add('puzzle');
puzzle.textContent = '1';

desk.appendChild(puzzle)