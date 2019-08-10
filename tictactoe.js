let field = false,
    countTurn = 0,
    numToWin = 4, // определяет число эл-в для победы (хххх)
    sizeField = 7,//определяет размер поля
    arrField = [];
//кнопка
button.onclick = function(event) {
  let   info = document.getElementById('info'),
        button = document.getElementById('button'),
        divcont = document.getElementById('container');
  if (!field) {
    startGame();
    field = true;
    button.innerHTML = 'Начать заного';
  }
  if (field) {
    divcont.remove();
    countTurn = 0;
    startGame();
  }
};
//запускает игру
function startGame() {
  makeField();
  //заполним массив arrField пустыми значениями для дальнейших манипуляций 
  for (let x = 0; x < sizeField; x++) {
    arrField[x] = [];
    for (let j = 0; j <sizeField; j++) {
      arrField[x][j] = '';
    }
  }
container.onclick = cellClick;
}
//проверяет комбинацию по горизонтали и вертикали в заданном секторе
function ckeckLines(arr, key, x, y) {
  let cols, rows;
  for (let i = x; i < (numToWin + x); i++) {
    cols = true;
    rows = true;
    for (let j = y; j < (numToWin + y); j++) {
      cols &= (arr[i][j] == key);
      rows &= (arr[j][i] == key);
    }
    if (cols || rows) return true;
  }
  return false;
}
//проверяет комбинацию по диагоналям в заданом секторе
function ckeckDiagonal(arr, key, x, y) {
  let toright = true,
      toleft = true;
      for (let i = 0; i < numToWin; i++) {
        toright &= (arr[i + x][i + y] == key);
        toleft &= (arr[numToWin - i - 1 + x][i + y] == key);
      }
      if (toright || toleft) return true;
      return false;
}
//проверяет наличие победителя перебором секторов поля
function isWinner(arr, key) {
  for (let i = 0; i < (sizeField - numToWin + 1); i++) {
    for (let j = 0; j < (sizeField - numToWin + 1); j++) {
      if (ckeckLines(arr, key, i, j) || ckeckDiagonal(arr, key, i, j)) return true;
    }
  }
  return false;
}
//строит поле
function makeField() {
  let divcont = document.createElement('div'),
      divcell = [];
  divcont.className = 'container';
  divcont.id = 'container';
  document.body.appendChild(divcont); 
  for (let i = 0; i < sizeField; i++) {
    divcell[i] = [];
    for (let j = 0; j < sizeField; j++) {
      divcell[i][j] = document.createElement('div');
      divcell[i][j].id= i + '-' + j;
      divcell[i][j].className = 'cell';
      divcont.appendChild(divcell[i][j]);
    }
  }
}
//обрабатыает клик по полю
function cellClick(){
  let target = event.target,
      busyCell = 'rgba(216, 223, 224, 0.842)',
      cellFree = target.innerHTML == '' ? true : false;
  if (cellFree) {
    target.innerHTML = 'X';
    target.style.backgroundColor = busyCell;
    //читаем из id ячейки координаты
    let i = +target.id.replace(/-.*/,''),
        j = +target.id.replace(/.*-/,'');
    arrField[i][j] = 'x';
    countTurn++;
    //полсе хода игрока проверяем на победу(тут можно не проверять на победу первых <numToWin*2 ходов)
    if (!isWinner(arrField,'x')) {
      //пока поле не заполнено ходит алгоритм
      if (countTurn < sizeField*sizeField) {
      algorithmTurn('easy');
      //после хода алгоритма вновь проверяем на победу
      if (isWinner(arrField, 'o')) {
        alert ('Выйграли О!');
      }
      }
      else alert('Ну надо же! Все поле заполнено, начните заного!');
    }
    else alert ('winner X!');
    //здесь нужно добавить stop игры
  }
  //при нажатии на занятое поле сигнализируем красным
  else {
    let oldStyle = target.style.backgroundColor; 
    target.style.backgroundColor = 'red';
    setTimeout( function(){target.style.backgroundColor = oldStyle;}, 100);
  }
}
//ход алгоритма
//level утстанавливает уровень сложности алгоритма
//пока реализован только рандом
function algorithmTurn(level) {
  switch (level) {
  case 'easy': {
    turnRandom();
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
//формирует случайное целое число
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
  }
//легккий уровень алгоритма
function turnRandom(){
  let randomcell = randomInteger (0, sizeField - 1) + '-' + randomInteger (0, sizeField - 1),
  cells = document.getElementsByClassName('cell'),
  busyCell = 'rgba(216, 223, 224, 0.842)',
  freeCell = cells[randomcell].innerHTML =='' ? true: false;
  if (freeCell) {
    cells[randomcell].innerHTML = 'O';
    cells[randomcell].style.backgroundColor = busyCell;
    let i = +cells[randomcell].id.replace(/-.*/,''),
        j = +cells[randomcell].id.replace(/.*-/,'');
    arrField[i][j] = 'o';
    countTurn++;
    }
    else turnRandom();
}