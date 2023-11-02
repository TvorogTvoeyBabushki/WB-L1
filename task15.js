const asyncOperation1 = () => {
  return new Promise((resolve) => {
    // асинхронная функция, которая возвращает число через 1 сек
    setTimeout(() => resolve(100), 1000)
  })
}

const asyncOperation2 = () => {
  return new Promise((resolve) => {
    // асинхронная функция, которая возвращает число через 2 сек
    setTimeout(() => resolve(200), 2000)
  })
}

const myAsyncFunction = async (callback) => {
  try {
    // ожидаем выполнение промисов
    const result1 = await asyncOperation1()
    const result2 = await asyncOperation2()

    // возвращаем их сумму через функцию обратного вызова
    callback(result1 + result2)
  } catch (error) {
    // выводим ошибку, если что-то пошло не так
    console.error(error)
  }
}
myAsyncFunction((result) => console.log(result))
