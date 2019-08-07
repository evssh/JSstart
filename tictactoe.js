let field = false,
    countTours = 1,
    arrayOfX = [],
    arrayOf0 = [];

button.onclick = function(event) {
  countTours++;
  let   info = document.getElementById('info'),
        button = document.getElementById('button');
        divcont = document.getElementById('container');
  if (!field) {
    startGame();
    field = true;
   // info.innerHTML = 'Сделано ходов: ' + countTours;
    button.innerHTML = 'Начать заного';
  }
  if (field) {
    divcont.remove();
    arrayOfX = [];
    arrayOf0 = [];
    startGame();
   // countTours = 1;
   // info.innerHTML = 'Сделано ходов: ' + countTours;
  }
};

//запускает игру
function startGame() {

  makeField();
  container.onclick = cellClick;
  
  function makeField() {
    let divcont = document.createElement('div');
    divcont.className = 'container';
    divcont.id = 'container';
    document.body.appendChild(divcont);

    for (let i = 0; i < 49; i++) {
      let divcell = {};
      divcell[i] = document.createElement('div');
      divcell[i].id=i;
      divcell[i].className = 'cell';
      divcont.appendChild(divcell[i]);
    }
  }
}

function cellClick(){
  let target = event.target,
      busyCell = 'rgba(216, 223, 224, 0.842)',
      cellFree = target.id != 'container' && !arrayOfX.includes(+target.id) && !arrayOf0.includes(+target.id);
  console.log('Клетка, выбранная пользователем свободна?: ' + cellFree);
  if (cellFree) {
    target.innerHTML = 'X';
    target.style.backgroundColor = busyCell;
    //info.innerHTML = 'Сделано ходов: ' + countTours;
    //  countTours++;
    arrayOfX.push(+target.id);

    algorithmTurn('easy');
  }
  else {
    let oldStyle = target.style.backgroundColor; 
    target.style.backgroundColor = 'red';
    setTimeout(function() { target.style.backgroundColor = oldStyle; }, 100);
  }

  console.log('arX:' + arrayOfX);
  console.log('ar0:' + arrayOf0);
  console.log ('****************');
}

//ход алгоритма
//level утстанавливает уровень сложности алгоритма
function algorithmTurn(level) {
  switch (level) {
  case 'easy': {
    turn();
  }
    break;
  case 'normal':
    alert( '' );
    break;
  case 'hard':
    alert( '' );
    break;
  }
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
  }

function turn(){
  let randomcell = randomInteger (0,48),
  cells = document.getElementsByClassName('cell'),
  busyCell = 'rgba(216, 223, 224, 0.842)',
  freeArX = !arrayOfX.includes(randomcell),
  freeAr0 = !arrayOf0.includes(randomcell),
  freeCell = freeArX && freeAr0;
  
  console.log('*arX:' + arrayOfX);
  console.log('*ar0:' + arrayOf0);
  console.log('рандом в массивеХ? ' + arrayOfX.includes(randomcell));
  console.log('рандом в массиве0? ' + arrayOf0.includes(randomcell));
  console.log('рандомное значение ' + randomcell + ' не в массивах?: ' + freeCell);

  if (freeCell) {
    cells[randomcell].innerHTML = 'O';
    cells[randomcell].style.backgroundColor = busyCell;
    //arrayAdd('0', cells[randomcell].id);
    arrayOf0.push(+cells[randomcell].id);
    }
    else turn();
  }