//контейнер

function MakeField() {
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
  
  let field = 0;
  
  button.onclick = function(event) {
    let   info = document.getElementById('info'),
          button = document.getElementById('button');
          divcont = document.getElementById('container');
    if (field == 0) {
      MakeField();
      field++;
      info.innerHTML = 'Ваш ход';
      button.innerHTML = 'Начать заного';
    }
    if (field != 0) {
      divcont.remove();
      MakeField();
    }
  }  