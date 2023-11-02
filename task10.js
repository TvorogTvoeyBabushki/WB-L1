const convertStringToJson = (json) => {
  // если входные данные не строка, то выходим из функции и возвращаем json
  if (typeof json !== 'string') {
    return json
  }

  const isArray = json[0] === '[' ? true : false // проверка на массив

  const iterationPairs = (pair, obj, object = null) => {
    const parts = pair.split(':') // разбиваем на свойства
    const key = parts[0].slice(1, -1).trim() // забираем ключ
    const value = parts[1] //  забираем значение

    if (
      value[0] === '{' &&
      object &&
      object.replace(/^\{/, '').includes('{') &&
      object.includes(key)
    ) {
      obj[key] = convertStringToJson(object.split('{')[1].replaceAll('}', ''))

      return
    }

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
      obj[key] = [value.split(1, -1)]
    } else {
      throw new Error('Некорректный тип значения: ' + value)
    }
  }

  if (isArray) {
    // удаление скобок в начеле и конце и деление строки на отдельные объекты
    const objects = json.slice(1, -1).split('},{')
    const newArray = [] // создание нового массива объектов

    // обработка каждого объекта и добавление его в новый массив
    objects.forEach((object) => {
      // убираем фигурные скобки в начале и в конце строки и разбиваем на пары
      const pairs = object.replace(/^\{|}$/, '').split(',')
      const obj = {}

      pairs.forEach((pair) => {
        iterationPairs(pair, obj, object)
      })

      newArray.push(obj) // добавляем объект в массив
    })

    return newArray
  } else {
    if (json[0] === '{') {
      json = json.slice(1, -1) // убираем фигурные скобки если приходит объект
    }

    const pairs = json.split(',') // разбиваем на пары
    const obj = {}

    pairs.forEach((pair) => {
      iterationPairs(pair, obj)
    })

    return obj
  }
}

const data = {
  name: 'Egor',
  age: 25,
}
const data2 = [
  {
    name: 'Egor',
    age: [25],
  },
  {
    name: 'Vany',
    age: 34,
    address: {
      city: 'Moscow',
      house: 60,
      country: 'Russia',
    },
  },
  {
    name: 'Any',
    age: null,
  },
]

try {
  console.log(convertStringToJson(JSON.stringify(data)))
  console.log(convertStringToJson(JSON.stringify(data2)))
} catch (error) {
  console.error(error.message)
}
