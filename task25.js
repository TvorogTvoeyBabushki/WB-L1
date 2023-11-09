const createAndStyleElement = (
  HTMLElement,
  styles = [{ prop: '', value: '' }]
) => {
  // создаем элемент
  const element = document.createElement(HTMLElement)

  // устанавливаем стили для элемента с помощью CSS
  styles.forEach(({ prop, value }) => {
    element.style[prop] = value
  })

  // добавляем созданный элемент в DOM
  document.querySelector('#task-25').append(element)
}

createAndStyleElement('div', [
  { prop: 'height', value: '200px' },
  { prop: 'width', value: '300px' },
  { prop: 'backgroundColor', value: 'pink' }
])
