const functions = [
  function (index) {
    console.log(index)
  },
  function (index) {
    console.log(index)
  },
  function (index) {
    console.log(index)
  },
  function (index) {
    console.log(index)
  },
]

const callFunctionsSequentiallyVar1 = (functions) => {
  functions.forEach((fn, index) => {
    fn(index)
  })
} // вызов последовательно функций через цикл

const callFunctionsSequentiallyVar2 = (functions) => {
  let index = 0 // объявляем индекс текущей позиции функции в массиве

  const callNextFunction = () => {
    if (index < functions.length) {
      functions[index](index) // вызываем функцию по индексу
      index++ // увеличиваем индекс
      callNextFunction() // вызываем снова через рекурсию
    }
  }

  callNextFunction() // вызов функции
} // вызов последовательно функций через рекурсию

console.log(callFunctionsSequentiallyVar1(functions))
console.log(callFunctionsSequentiallyVar2(functions))
