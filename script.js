//определение переменных
let value1, value2=stop, result, operand;

//принимаем первое значение
value1=EnterValue();

//проверяем, введено ли первое значение
if (value1===stop) {
    alert ('Обновите страницу, чтобы начать заного.');
}

//иначе продолжаем исполнение
else
{value2=EnterValue();

//проверяем, введено ли 2е значение
if (value2===stop) {
    alert ('Обновите страницу, чтобы начать заного.');
}

//иначе продолжаем исполнение
else
{
    //принимаем операнд
   operand = prompt('Какую операцию (+,-,*,/) совершить? \n' + value1 +' X ' + value2, '');

   //проверяем на правильность ввода символов
   if (operand !== '+' && operand !== '-' && operand !== '*' && operand !== '/') {
    alert('Математика еще не знает таких операций =), либо вы отменили ввод!\n Допускается только +,-,*,/ \n Пробуйте заного');
  }
 
  //сумма
  else  if (operand==='+') {
    result = value1 + value2;
    alert ( value1 + '+' + value2 + '=' + result);
  }

  //вычитание
  else if (operand==='-') {
    result = value1 - value2;
    alert ( value1 + '-' + value2 + '=' + result);
  }

  //умножение
  else if (operand==='*') {
    result = value1 * value2;
    alert ( value1 + '*' + value2 + '=' + result);
  }

  //деление
  else if (operand==='/') {
      if (value2===0) {
          alert('На нуль делить нельзя, уВася!');
      }
      else {
    result = value1 / value2;
    alert ( value1 + '/' + value2 + '=' + result);}
  }
}


}
//console.log(value1);

//функция ввода значений проверяет дополнительно на тип данных
function EnterValue(){
    let value;
    value=prompt ('Введите число в формате ХХ.ХХ \n десятичным разделителем служит точка - . ','0');
    if (value===null || value===''){
        alert('Вы прервали операцию, либо ничего не ввели.');
        return stop;
    }
    else {
        value=+value;
        if (isNaN(value)) {
            alert('Допускается ввод только чисел');
            return stop;
        }
        else {
            alert ('Вы ввели: ' + value);
            return value;
        }
    }
}
