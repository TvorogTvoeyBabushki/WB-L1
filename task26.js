const traverseDOM = node => {
  // проверка на то, что node явл элементом
  if (node.nodeType === Node.ELEMENT_NODE) {
    // выводим в консоль тип узла
    console.log(`Название элемента: ${node.nodeName}`)

    // вызываем для каждого потомка рекурсивно функцию
    node.childNodes.forEach(child => {
      traverseDOM(child)
    })
  }
}
// находим див для примера
const rootElement = document.getElementById('task-26')
traverseDOM(rootElement)
