const calculateLocalStorageSize = () => {
  try {
    let totalSize = 0 // переменная, которая будет хранить объём хранилища

    // цикл до бесконечности
    for (let i = 0; i < Infinity; i++) {
      const key = `test${i}`

      try {
        localStorage.setItem(key, '1') // записываем данные в LS по ключу
        totalSize += key.length // прибавляем на каждом цикле количество байтов = длине строки
      } catch (e) {
        // Если запись данных превышает максимальный объем localStorage
        // выводим в консоль лимит, очищаем хранилище и выходим из функции
        console.log(`localStorage лимит: ${totalSize} байтов`)
        localStorage.clear()
        return
      }
    }

    return totalSize
  } catch (e) {
    return 0
  }
}

calculateLocalStorageSize()
