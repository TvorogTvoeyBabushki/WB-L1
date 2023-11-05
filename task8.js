const functions = [
  function (x, y) {
    return x * y
  },
  function (x, y) {
    return x + y
  },
  function (x, y) {
    return x - y
  },
  function (x, y) {
    return x / y
  }
]

const applyFunctionsVar1 = (arr, ...rest) => {
  const [x, y] = rest // кортежем забираем значения из остатка

  return function () {
    return arr.map((fn) => fn(x, y)) // возвращаем массив результатов выполнения каждой функции
  }
}

const applyFunctionsVar2 = (arr) => {
  return function (...args) {
    return arr.map((fn) => fn(...args)) // или fn.apply(null, args))
  }
}

console.log(applyFunctionsVar1(functions, 366, 14)())
console.log(applyFunctionsVar2(functions)(366, 14))
