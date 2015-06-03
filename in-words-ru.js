/*
* Алгоритм и реализация на PHP - http://habrahabr.ru/post/53210/
* Спасибо runcore за идею!
*/

toInRuWords = function(number) {
  var gender, tens_digit, unit_digit, leading_zero_count, outputs, level,
    triple, _ref;
  var zero = 'ноль';
  var ten = [
    ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь',
      'девять'],
    ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь',
      'девять']
  ];
  var a20 = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать',
    'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать',
    'девятнадцать'];
  var tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
    'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  var hundred = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
    'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
  var unit = [
  //1 штука, 2 штуки, 5 штук, род (мужской - 0, женский - 1)
    //класс десятичных
    ['копейка', 'копейки', 'копеек', 1],
    //класс единиц
    ['рубль', 'рубля', 'рублей', 0],
    //класс тысяч
    ['тысяча', 'тысячи', 'тысяч', 1],
    //класс миллионов
    ['миллион', 'миллиона', 'миллионов', 0],
    //класс миллиардов
    ['миллиард', 'миллиарда', 'миллиардов', 0]];

    //каждый класс состоит из регистра сотен, регистра десятков и
    //регистра единиц

  //преобразование строки в число
  if (typeof(number) === 'string') {
    number = number.replace(' ', '').replace(',', '.');
    if (/^\d*(\.\d*)?$/.test(number)) {
      number = parseFloat(number);
    } else {
      return false;
    }
  };
  //проверка типа и значения меньше 0
  if (!number || typeof(number) !== 'number' || isNaN(number) || number < 0) {
      return false;
  };

  //разбираем на целое и дробное
  _ref = number.toFixed(2).split('.'), number = _ref[0], decimals = _ref[1];

  //проверка на слишком большое число
  if ((leading_zero_count = (unit.length - 1) * 3 - number.length) < 0) {
    return false;
  };

  //дополняем к числу лидирующие нули, количество цифр делаем кратно 3
  leading_zero_count = leading_zero_count % 3;
  number = Array(leading_zero_count + 1).join('0') + number;

  outputs = [];
  number_length = number.length;
  if (number > 0) {
    //идем вдоль строки блоками по 3 символа
    for (var i = 0; i <= number_length; i = i + 3) {
      //
      triple = number.substr(i, 3);
      if (!(triple > 0)) {
        continue;
      }
      level = (number_length - i) / 3;
      gender = unit[level][3];
      //десятки в блоке
      tens_digit = number[i+1];
      //единицы в блоке
      unit_digit = number[i+2];
      //сотни в блоке
      outputs.push(hundred[number[i]]);
      if (tens_digit > 1) {
        outputs.push(tens[tens_digit] + ' ' + ten[gender][unit_digit]);
      } else {
        outputs.push(tens_digit > 0 ? a20[unit_digit]
          : ten[gender][unit_digit]);
      }
      //не включая класс единиц измерения
      if (level > 1) {
        outputs.push(morph(triple,
          unit[level][0], unit[level][1], unit[level][2]));
      }
    }
  } else {
    outputs.push(zero);
  }
  outputs.push(morph(number, unit[1][0], unit[1][1], unit[1][2]));
  //дробная часть
  outputs.push(decimals + ' '
    + morph(decimals, unit[0][0], unit[0][1], unit[0][2]));
  //объединяем массив в строку, убираем лишние пробелы
  return outputs.join(' ').replace(/ {2,}/g, ' ').trimLeft();
};

/*
 * Склонение словоформы
 * @ author runcore
*/
morph = function(n, f1, f2, f5) {
  n = n % 100;
  if (n > 10 && n < 20) {
    return f5;
  }
  n = n % 10;
  if (n > 1 && n < 5) {
    return f2;
  }
  if (n === 1) {
    return f1;
  }
  return f5;
};
