const checkIsPalindrome = (phrase) => {
  if (typeof phrase !== 'number' && typeof phrase !== 'string') {
    return 'Введите строку или число' // выходим из функции, если входные данные не строка или число
  }

  if (typeof phrase === 'number') {
    phrase = phrase.toString() // переводим число в строку
  }

  const phraseWithoutSpaces = phrase.replace(/\s/g, '') // убираем пробелы
  const phraseReverse = [...phrase].reverse().join('').replace(/\s/g, '') // переворачиваем фразу

  if (phraseWithoutSpaces === phraseReverse) {
    return true // возвращаем истину если входная фраза равна перевернутой
  }
  return false // возвращаем лож если они не равны
}
console.log(checkIsPalindrome('аргентина манит негра'))
console.log(checkIsPalindrome(11))
console.log(checkIsPalindrome('обычное выражение'))
