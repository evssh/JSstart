const films = [
    {
      title: 'The Green Mile',
      creationYear: 1999,
      country: ['USA'],
      budget: '$60 000 000',
      actors: [
        {
          name: 'Tom Hanks',
          age: 63,
          role: 'Paul Edgecomb',
        },
        {
          name: 'David Morse',
          age: 65,
          role: 'Brutus Howell',
        },
        {
          name: 'Michael Clarke Duncan',
          age: 54,
          role: 'John Coffey',
        },
      ],
      director: {
        name: 'Frank Darabont',
        age: 60,
        oscarsCount: 0,
      }
    },
    {
      title: 'Inception',
      creationYear: 2010,
      country: ['USA'],
      budget: '$160 000 000',
      actors: [
        {
          name: 'Leonardo DiCaprio',
          age: 44,
          role: 'Cobb',
        },
        {
          name: 'Joseph Gordon-Levitt',
          age: 38,
          role: 'Arthur',
        },
        {
          name: 'Ellen Page',
          age: 32,
          role: 'Ariadne',
        },
        {
          name: 'Tom Hardy',
          age: 41,
          role: 'Eames',
        },
      ],
      director: {
        name: 'Christopher Nolan',
        age: 48,
        oscarsCount: 0,
      }
    },
    {
      title: 'Forrest Gump',
      creationYear: 1994,
      country: ['USA'],
      budget: '$55 000 000',
      actors: [
        {
          name: 'Tom Hanks',
          age: 63,
          role: 'Forrest Gump',
        },
        {
          name: 'Robin Wright',
          age: 53,
          role: 'Jenny Curran',
        },
        {
          name: 'Sally Field',
          age: 72,
          role: 'Mrs. Gump',
        },
      ],
      director: {
        name: 'Robert Zemeckis',
        age: 68,
        oscarsCount: 1,
      }
    },
    {
      title: 'Interstellar',
      creationYear: 2014,
      budget: '$165 000 000',
      country: ['USA','Great Britain', 'Canada'],
      actors: [
        {
          name: 'Matthew McConaughey',
          age: 49,
          role: 'Cooper',
        },
        {
          name: 'Anne Hathaway',
          age: 36,
          role: 'Brand',
        },
        {
          name: 'Jessica Chastain',
          age: 42,
          role: 'Murph',
        },
        {
          name: 'Michael Caine',
          age: 86,
          role: 'Professor Brand',
        },
        {
          name: 'Matt Damon',
          age: 48,
          role: 'Mann',
        },
      ],
      director: {
        name: 'Christopher Nolan',
        age: 48,
        oscarsCount: 0,
      }
    },
    {
      title: 'Catch Me If You Can',
      creationYear: 2002,
      budget: '$52 000 000',
      country: ['USA', 'Canada'],
      actors: [
        {
          name: 'Tom Hanks',
          age: 63,
          role: 'Carl Hanratty',
        },
        {
          name: 'Leonardo DiCaprio',
          age: 36,
          role: 'Frank Abagnale Jr.',
        },
        {
          name: 'Christopher Walken',
          age: 76,
          role: 'Frank Abagnale',
        },
        {
          name: 'Amy Adams',
          age: 44,
          role: 'Brenda Strong',
        },
      ],
      director: {
        name: 'Steven Spielberg',
        age: 72,
        oscarsCount: 4,
      }
    },
  ];

//определим массивы для числа актеров и суммы возрастов в каждом фильме
let sum_actors_of_films = [],
    sum_ageS_of_actors = [],
    //для актеров, игравших с Том Хэнксом
    actors_with_Tom = [],
    //общий бюджет
    sum = 0;

//проверка на наличие Том Хэнкса в списке актеров
function IsTom(Arr){
  for ( let i = 0; i < Arr.length; i++) {
  if (Arr[i].name == 'Tom Hanks') {return true;}
  else return false;
  }
}

//пройдемся по всему массиву films
for (let i = 0 ; i < films.length ; i++) {

  //посчитаем число актеров
  let sum_actors = films[i].actors.length;

  /*  задание 1
    Вывести средний возраст (age) актеров, которые снимались в
    фильмах режиссера (director), которые не получили оскар (oscarCount)
  */
  //если нет оскара
  if (films[i].director.oscarsCount === 0) {
    //найдем сколько всего актеров
    let sum_age_of_actors = 0;
    //запись в массив числа актеров фильма 
    sum_actors_of_films[i] = sum_actors;
    //посчитаем общий возраст актеров
    for (let k = 0; k < sum_actors; k++) {
      sum_age_of_actors += films[i].actors[k].age;
      }
    //запись в массив суммы возраста всех актеров
    sum_ageS_of_actors[i] = sum_age_of_actors; 
  }

  /*  задание 2
    Имена всех актеров, которые играли с Томом Хэнксом, в фильмах после 1995 года
  */
  //фильм после 1995?
  if (films[i].creationYear > 1995) {
    //если Том в списке актеров
    if (IsTom(films[i].actors)) {
      //для каждова актера
      for ( let k=0; k < films[i].actors.length; k++) {
        //внесем всех в массив, кроме самого Тома Хэнкса
        if (films[i].actors[k].name != 'Tom Hanks') {
          actors_with_Tom.push(films[i].actors[k].name);
        }   
      }
    }  
  }

  /*  задание 3
    Общий бюджет (сумма) фильмов, с режиссерами младше 70 лет и в которых не играл Том Хэнкс
  */
  //если Том Хэнкс не играл и возраст режиссера меньше 70
  if ( (IsTom(films[i].actors) == false) && films[i].director.age < 70) {
    //определим буфферные строки и массив
    let buf_str ='';
    const buf_arr = films[i].budget.split('');
    //ф-я: если элемент массива не $ и ' ', то запишем в буфферную строку
    function IsInt(arr) {
      for (let i=0; i < arr.length; i++) {
        if ( arr[i] != '$' && arr[i] != ' ') {
        buf_str += arr[i];
        }
      }
    }
    //запишем массив в строку, отсеив $ и ' '
    IsInt(buf_arr);
    //сразу на каждом шаге прибавим сумму
    sum += +buf_str;
  }
}

//считает сумму элементов массива
function SumArr(Arr) {
  let sum = Arr.reduce(function(sum,i) {
    return sum + i;
  });
  return sum;
}
//считаем суммы в массивах возраста и кол-ва актеров и средний возраст итоговый
let sum_all_actors = + SumArr(sum_actors_of_films),
    sum_all_age = + SumArr(sum_ageS_of_actors),
    average = sum_all_age / sum_all_actors;
//разделитель для удобства чтения при выводе    
const str = actors_with_Tom.join(', ');
//вывод
alert ('1. Средний возраст актеров, что снялись в фильмах, не получивших оскара: ' + ~~average + 
'\n\n2. Актеры, игравшие с Томом Хэнксом в фильмах после 1995 года: ' + str +
'\n\n3. Общий бюджет фильмов, с режиссерами младше 70 лет и в которых не играл Том Хэнкс: ' + sum + ' $');