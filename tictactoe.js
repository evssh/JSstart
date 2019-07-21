//создает поле
function MakeField() {
    //общий контейнер
    let divcont = document.createElement('div');
    divcont.className = 'container';
    document.body.appendChild(divcont);
    //ячейки
    for (let i = 0; i < 49; i++) {
      let divcell = {};
      divcell[i] = document.createElement('div');
      divcell[i].id=i;
      divcell[i].className = 'cell';
      divcont.appendChild(divcell[i]);
    }
}
    
MakeField();