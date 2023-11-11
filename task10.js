const data = {
  name: 'Egor',
  age: [25, 30, 'text'],
  city: 'Moscow'
}
const data2 = [
  {
    name: 'Egor',
    age: [25]
  },
  {
    name: 'Vany',
    age: 34,
    address: {
      city: 'Moscow',
      house: 60,
      country: 'Russia'
    }
  },
  {
    name: 'Any',
    age: null
  }
]
// функция конвертации строки в объект без вложенности
const parseJson = json => {
  // если входные данные не строка, то выходим из функции и возвращаем json
  if (typeof json !== 'string') {
    return json
  }

  // проверка на пустую строку
  if (json.length === 0) {
    throw new Error('Пустая строка')
  }

  // проверка на корректность начала и конца объекта
  if (json[0] !== '{' || json[json.length - 1] !== '}') {
    throw new Error(
      'Строка должна начинаться и заканчиваться фигурными скобками'
    )
  }
  // убираем фигурные скобки и запятые в [] скобках
  json = json.replace(/,(?=[^\[]*\])/g, ' ').slice(1, -1)

  const pairs = json.split(',') // разбиваем на пары
  const obj = {}

  pairs.forEach(pair => {
    const parts = pair.split(':') // разбиваем на свойства
    let key = parts[0].trim() // забираем ключ
    const value = parts[1].trim() //  забираем значение

    // проверка на корректность количества элементов в паре
    if (parts.length !== 2) {
      throw new Error(`Некорректная пара ключ-значение: ${pair}`)
    }

    // проверка на пустые ключи и значения
    if (key === '' || value === '') {
      throw new Error(`Пустой ключ или значение в паре: ${pair}`)
    }

    // Проверка на кавычки в ключе
    if (key[0] !== '"' || key[key.length - 1] !== '"') {
      throw new Error(`Неправильные кавычки в ключе: ${key}`)
    }

    key = key.slice(1, -1)

    // проверка на тип данных
    if (value === 'null') {
      obj[key] = null
    } else if (value === 'true') {
      obj[key] = true
    } else if (value === 'false') {
      obj[key] = false
    } else if (value[0] === '"' && value[value.length - 1] === '"') {
      obj[key] = value.slice(1, -1)
    } else if (!isNaN(value)) {
      obj[key] = +value
    } else if (value[0] === '[') {
      obj[key] = value
        .slice(1, -1)
        .split(' ')
        .map(item => (isNaN(item) ? item.slice(1, -1) : +item))
    } else {
      throw new Error(`Некорректный тип значения: ${value}`)
    }
  })

  return obj
}
// функция конвертации строки в объект с вложенностью
const parseJsonDeepNesting = json => {
  // если входные данные не строка, то выходим из функции и возвращаем json
  if (typeof json !== 'string') {
    return json
  }
  // передаем строку в анонимную функцию, которая будет возвращать нам объект
  const fn = new Function(`return ${json}`)
  return fn()
}
// отлавливаем ошибки, если некоректные данные
try {
  console.log(parseJson(JSON.stringify(data)))
  console.log(parseJsonDeepNesting(JSON.stringify(data2)))
} catch (error) {
  console.error(error.message)
}
