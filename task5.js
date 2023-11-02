const data = [
  {
    data: 1,
  },
  {
    data: 2,
  },
  {
    data: 3,
  },
]

const jsonToLinkedList = (json = null) => {
  if (
    !JSON.parse(json).length ||
    !JSON.parse(json)[0].data ||
    typeof JSON.parse(json) !== 'object' ||
    JSON.parse(json) === null
  ) {
    return null // возвращаем ничего, если входные данные не являются обьектом или пустые
  }

  const parseData = JSON.parse(json) // парсим данные из строки в массив
  const head = {
    data: parseData[0].data,
    next: null,
  } // объявляем голову списка от которого будет всё идти дальше
  let currentNode = head // объявляем указатель на текущий узел

  parseData.forEach((data, index) => {
    if (index !== parseData.length - 1) {
      const newNode = {
        data: data.data,
        next: null,
      } // объявляем следующий узел

      currentNode.next = newNode // указываем в текущим узле свойство, которое является следующим узлом
      currentNode = newNode // изменяем указатель на следующий узел
    }
  })

  return head // возвращаем голову
}

console.log(jsonToLinkedList(JSON.stringify(data)))
