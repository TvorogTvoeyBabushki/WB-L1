// функция подсчёта количества вызова метода write внутри метода write
const numberOfCallWrite = () => {
  // переменная, которая будет хранить количество вызовов
  let quantity = 0
  // другая функция, которая вызывает метод write и увел количество
  const writeMethod = () => {
    document.write('task22')
    quantity++
    writeMethod()
  }

  try {
    // вызываем метод write и передаем в него другой вызов write,
    // который будет вызываться каждый раз рекурсивно
    document.write(writeMethod())
  } catch (error) {
    console.log(`Максимальное количество вызовов - ${quantity} раз`)
  }
}

numberOfCallWrite()
