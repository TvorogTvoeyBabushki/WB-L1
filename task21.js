const sizeOfVar = 8 // кол-во байт у числа
const amountOfVarFn1 = 0 // кол-во переменных у 1 функции
const amountOfVarFn2 = 5 // кол-во переменных у 2 функции
let amountOfFnCallFn1 = 0 // переменная, которая будет хранить количество вызовов 1 функции
let amountOfFnCallFn2 = 0 // переменная, которая будет хранить количество вызовов 2 функции

const fn1 = () => {
  amountOfFnCallFn1++
  fn1()
}

const fn2 = () => {
  let a = amountOfFnCallFn2 + 1
  let b = a + 1
  let c = b + 1
  let d = c + 1
  let e = d + 1
  amountOfFnCallFn2++
  fn2()
}

try {
  fn1()
} catch (error) {
  // console.error(error)
}

try {
  fn2()
} catch (error) {
  // console.error(error)
}

// формула для расчёта размера функции:
// X = (размер execution content + кол-во переменных * кол-во байт(у числа = 8)) * кол-во вызовов
// для случая без переменных:    для случая с 5 переменнами:
// X = (N + 0 * 8) * 13954       X = (N + 5 * 8) * 8970
// приравняем уровнения и найдем N = 71.99 - у хрома; 279.99 - у сафари; 133.33 - firefox
// находим размер execution content
const executionContentSize = Math.abs(
  (sizeOfVar *
    (amountOfVarFn2 * amountOfFnCallFn2 - amountOfVarFn1 * amountOfFnCallFn1)) /
    (amountOfFnCallFn1 - amountOfFnCallFn2)
)
// находим размер стэка
const getStackSize = (amountOfVarFn, amountOfFnCall) =>
  Math.ceil((executionContentSize + amountOfVarFn * sizeOfVar) * amountOfFnCall)
console.log(`${getStackSize(amountOfVarFn1, amountOfFnCallFn1)} байт`)
