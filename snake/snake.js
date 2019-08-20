//вводные данные
let divcont = document.createElement('div'),
    direction = 'ArrowLeft',
    appleCell,
    speed = 250,
    score = 0,
    divScore = document.createElement('div'),
    //координаты стартовой позиции змейки
    snakeArr = ['9-15','9-16','9-17'];
divScore.className = 'info';
divScore.id = 'info';
divScore.innerHTML = `Score: ${score}`;
document.body.appendChild(divScore);
divcont.className = 'container';
document.body.appendChild(divcont);
//создает поле
let makeField = () => {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 30; j++) {
      let divcell = document.createElement('div');
      divcell.id = `${i}-${j}` ;
      divcell.className = 'cell';
      divcont.appendChild(divcell);
    }
  }
};
//создает яблоко
let makeApple = () => {
  let row = Math.round(Math.random() * 24),
      col = Math.round(Math.random() * 29);
  appleCell = `${row}-${col}`;
  if (snakeArr.includes(appleCell)) makeApple();
    else {
      let apple = document.getElementById(`${row}-${col}`);
      apple.className = 'apple';
    }
};
//рисует змейку в нужном массиве координат
let drawSnake = (snakeArr) => {
  let snake = {
    head: document.getElementById(`${snakeArr[0]}`),
    body: [],
  };
  console.log(snakeArr);
  let snakeBody = (snakeArr) => {
    for (let i = 1; i < snakeArr.length; i++) {
      let elem = document.getElementById(`${snakeArr[i]}`);
      elem.className = 'snake';
      snake.body.push(elem);
    }
  };
  console.log(snake);
  snakeBody(snakeArr);
  snake.head.className = 'snake head';
};
//движение змейки
let move = (snakeArr, direction) => {
  //строки 0 - 24
  //строки 0 - 29
  //закрасим хвост - последний элемент
  let track = snakeArr.splice(-1,1),
      trackElem = document.getElementById(`${track}`),
      head = snakeArr[0],
      headRow =  +head.replace(/-.*/,''),
      headCol = +head.replace(/.*-/,'');
  console.log(`row:${headRow}`);
  console.log(`col:${headCol}`);
  trackElem.className = 'cell';
  //куда крутить головой 
  switch (direction) {
    case 'ArrowLeft': {
      if (headCol == 0) {headCol = 30;}
      snakeArr.unshift(`${headRow}-${headCol - 1}`);
      }
    break;
    case 'ArrowUp': {
      if (headRow == 0) {headRow = 25;}
      snakeArr.unshift(`${headRow - 1}-${headCol}`);
      }
    break;
    case 'ArrowDown': {
      if (headRow == 24) {
        snakeArr.unshift(`${0}-${headCol}`);
        }
      else {
      snakeArr.unshift(`${headRow + 1}-${headCol}`);
      }
      }
    break;    
    case 'ArrowRight': {
      if (headCol == 29) {
        snakeArr.unshift(`${headRow}-${0}`); 
        }
      else {
        snakeArr.unshift(`${headRow}-${headCol + 1}`);
      }
      }
    break;
  }
};
//жрааааааааать яблоко!
let eat = (snakeArr, appleCell) => {
  if (snakeArr[0] == appleCell) {
    snakeArr.unshift(appleCell);
    score++;
    let infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `Score: ${score}`;
    makeApple();
  }
};
//игра окончена?
let gameOver = (snakeArr) => {
  if (snakeArr.includes(snakeArr[0], 1)) {
    divScore.innerHTML = `Game over! Your score: ${score}`;
    return true;
  }
};
//перезапуск
let removeAll = () => {
  divcont.innerHTML = '';
  divScore.innerHTML = 'Score: 0';
  snakeArr.splice(3);
  score = 0;
};
//обрабатываем только одно нажатие и запрещаем разворот на 180 градусов
let keyDown = (event) => {
  if (event.key == 'ArrowLeft' && direction != 'ArrowRight') {
    direction = 'ArrowLeft';
    document.removeEventListener("keyup" , keyDown);
  }
  else if (event.key == 'ArrowRight' && direction != 'ArrowLeft') {
    direction = 'ArrowRight';
    document.removeEventListener("keyup" , keyDown);
  }
  else if (event.key == 'ArrowUp' && direction != 'ArrowDown') {
    direction = 'ArrowUp';
    document.removeEventListener("keyup" , keyDown);
  }
  else if (event.key == 'ArrowDown' && direction != 'ArrowUp') {
  direction = 'ArrowDown';
  document.removeEventListener("keyup" , keyDown);
  }
};
//выполнение игры
let pusk = () => {
makeField();
makeApple();

  let game = () => {
  document.addEventListener( "keyup" , keyDown);
  move(snakeArr, direction);
  if (gameOver(snakeArr)) {
    clearInterval(start);
    let restartButton = document.createElement('button');
    restartButton.className = 'restart';
    restartButton.innerHTML = 'Restart';
    divcont.appendChild(restartButton);
    restartButton.onclick = () => {
      removeAll();
      pusk();
  }
}
else {
  eat(snakeArr, appleCell);
  drawSnake(snakeArr);
}
};

let start = setInterval( () => {game()} , speed);
};

pusk();