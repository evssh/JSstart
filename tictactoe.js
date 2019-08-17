let field = false,
    countTurn = 0,
    numToWin = 3, // определяет число эл-в для победы (хххх)
    sizeField = 3,//определяет размер поля
    arrField = [],
    iter = 0;
//масштабируемость для агоритма выбора хода минмакс не имеет смысла, но оставлена для возможности расширения
//кнопка
button.onclick = (event) => {
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
let startGame = () => {
  makeField();
  //заполним массив arrField пустыми значениями для дальнейших манипуляций 
  for (let x = 0; x < sizeField; x++) {
    arrField[x] = [];
    for (let j = 0; j <sizeField; j++) {
      arrField[x][j] = x + '-' + j;
    }
  }
  console.log(`arrField: ${arrField}`);
container.onclick = cellClick;
}
//проверяет комбинацию по горизонтали и вертикали в заданном секторе
let ckeckLines = (arr, key, x, y) => {
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
let ckeckDiagonal = (arr, key, x, y) => {
  let toright = true,
      toleft = true;
      for (let i = 0; i < numToWin; i++) {
        toright &= (arr[i + x][i + y] == key);
        toleft &= (arr[numToWin - i - 1 + x][i + y] == key);
      }
      if (toright || toleft) return true;
      return false;
};
//проверяет наличие победителя перебором секторов поля
let isWinner = (arr, key) => {
  for (let i = 0; i < (sizeField - numToWin + 1); i++) {
    for (let j = 0; j < (sizeField - numToWin + 1); j++) {
      if (ckeckLines(arr, key, i, j) || ckeckDiagonal(arr, key, i, j)) return true;
    }
  }
  return false;
};
//строит поле
let makeField = () => {
  let divcont = document.createElement('div'),
      divcell = [];
  divcont.className = 'container';
  divcont.id = 'container';
  divcont.style.width = sizeField * 52 + 'px'; //формируем контейнер (52 - размер одной ячейки)
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
};
//обрабатыает клик по полю
let cellClick = () => {
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
      algorithmTurn('hard');//для игры с полем 3*3 интересно играть только в hard, но выйграть нельзя
      //после хода алгоритма вновь проверяем на победу
      if (isWinner(arrField, 'o')) {
        setTimeout(() => alert("Ha-ha! You are loser!"), 350);
      }
      }
      else alert('Ну надо же! Все поле заполнено, начните заного!');
    }
    else setTimeout(() => alert("Oppa-oppa-pa! You are winner!"), 350);
    //здесь нужно добавить stop игры
  }
  //при нажатии на занятое поле сигнализируем красным
  else {
    let oldStyle = target.style.backgroundColor; 
    target.style.backgroundColor = 'red';
    setTimeout( () => target.style.backgroundColor = oldStyle, 100);
  }
};
//ход алгоритма
//level утстанавливает уровень сложности алгоритма
//пока реализован только рандом и минмакс
let algorithmTurn = (level) => {
  switch (level) {
  case 'easy': {
    turnRandom();
  }
    break;
  case 'normal':
    alert( 'В разработке...' );
    break;
  case 'hard': {
    let cells = document.getElementsByClassName('cell'),
        toDoCell = minMax(arrField, 'o').index;
        busyCell = 'rgba(216, 223, 224, 0.842)';
    console.log(`куда ставить О: ${toDoCell}`);
    console.log(`итераций: ${iter}`);
    cells[toDoCell].innerHTML = 'O';
    cells[toDoCell].style.backgroundColor = busyCell;
    let i = +cells[toDoCell].id.replace(/-.*/,''),
        j = +cells[toDoCell].id.replace(/.*-/,'');
    arrField[i][j] = 'o';
    countTurn++;
  }
    break;
  }
};
//формирует случайное целое число
let randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
  };
//легккий уровень алгоритма
let turnRandom = () => {
  let randomcell = `${randomInteger (0, sizeField - 1)}-${randomInteger (0, sizeField - 1)}`,
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
//минмакс на основе просчета графов всех возможных ходов
let minMax = (tempField, key) => {
  iter++;
  //работаем с пустым массивом
  let array = freeField(tempField);
  //если текущая итерация приводит к результату, то присваиваем очки
  if (isWinner(tempField, 'x')) {
    return {
      score: -10
    };
  } else if (isWinner(tempField, 'o')) {
    return {
      score: 10
    };
  } else if (arrIsEmpty(array)) {
    return {
      score: 0
    };
  }
  //обработчик массива, для присвоения 0 очков при ничье
  function arrIsEmpty(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length === 0) {
        count++;
      }
    }
    if (count === arr.length) return true;
  }
  //формируем массив с объектами вида "координата" - "очки"
  var moves = [];
  for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].length; j++) {
      var move = {},
         x = +(array[i][j].split('-'))[0],
         y = +(array[i][j].split('-'))[1];
      //сохраняем позицию 
      move.index = tempField[x][y];
      //запоминаем ключ  
      tempField[x][y] = key;
      //для о вызываем рекрсию по х и наооборт
      if (key == 'o') {
        var f = minMax(tempField, 'x');
        move.score = f.score;
      } else {
        var f = minMax(tempField, 'o');
        move.score = f.score;
      }
    //возвращаем значение  
    tempField[x][y] = move.index;
    //записываем объект
    moves.push(move);
    }
  }
  //выбираем лучший ход
  var bestMove;
  if (key === 'o') {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
//возвращаем объект с лучшим ходом
  return moves[bestMove];
}
//поиск пустых клеток в массиве (для минмакс ф-ии)
let freeField = (field) => {
  let buffer = [];
  for (let i = 0; i < field.length; i++) {
    buffer[i] = [];
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] !== 'o' && field[i][j] !== 'x') {
        buffer[i].push(field[i][j]);
      }
    }
  }
  return buffer;
}