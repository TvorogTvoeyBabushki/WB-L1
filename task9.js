function jsonToString(obj) {
  if (typeof obj === 'function') {
    return 'null'
    // возвращаем null если входные данные явл функцией
  }

  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? `"${obj}"` : String(obj)
    // возвращаем строку если входные данные не явл объектом
  }

  const isArray = obj.length ? true : false // проверка на массив
  let result = '' // переменная, где будем хранить результат

  if (isArray) {
    result += '[' // если массив
  } else {
    result += '{' // если обЪект
  }

  let isFirstProp = true // переменная, которая проверяет, явл ли свойство первым
  for (let key in obj) {
    if (typeof obj[key] !== 'function' || isArray) {
      if (!isFirstProp) {
        result += ',' // добавляем запятую, если свойство явл не первым
      }
      if (!isArray) {
        result += `"${key}":` // добавляем ключ, если это не массив
      }

      result += jsonToString(obj[key]) // добавляем значение, которое получаем рекурсивно
      isFirstProp = false
    }
  }

  if (isArray) {
    result += ']' // если массив
  } else {
    result += '}' // если обЪект
  }

  return result // возвращаем результат
}
const data = [
  {
    name: 'Egor',
    age: 25,
    fn: [
      function () {
        return 2
      },
    ],
    fn2() {
      return 2
    },
  },
  {
    name: 'Vany',
    age: [34, 30],
  },
  {
    name: 'Any',
    age: null,
    address: {
      street: 'Pushkino',
      house: 33,
    },
  },
]
console.log(jsonToString(data))
console.log(JSON.stringify(data))
