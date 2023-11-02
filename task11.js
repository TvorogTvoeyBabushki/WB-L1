const outerFn = () => {
  const outerValue = 'message' // переменная которая хранится во внешней функции

  return function () {
    return outerValue // возвращаем внешнюю переменную
  }
}
const inner = outerFn() // вызываем внешнюю функцию
console.log(inner())
