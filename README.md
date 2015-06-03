# Write in russian words the amount in rubles|Сумма прописью

## Установка
```bash
$ meteor add ag2s:in-words-ru
```
## Использование
```meteor
var text = toInRuWords(12.10);
console.log(text); // двенадцать рублей 10 копеек

var text = toInRuWords("52151,31");
console.log(text); // пятьдесят две тысячи сто пятьдесят один рубль 31 копейка

var text = toInRuWords(123412.19);
console.log(text); // сто двадцать три тысячи четыреста двенадцать рублей 19 копеек

var text = toInRuWords("71 021.57");
console.log(text); // семьдесят одна тысяча двадцать один рубль 57 копеек
```
## Тестирование
```bash
$ meteor test-packages ag2s:in-words-ru
```
