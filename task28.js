// находим корневой элемент
const rootEl = document.querySelector('#task-28')
// cоздаем шаблонный элемент
const template = `
  <template>
    <h2>Заголовок</h2>
    <p>Содержимое</p>
  </template>
`

// функция для создания элемента через template
const createElementUsingTemplate = (template, newEl, rootEl) => {
  // создаем элемент и вытаскиваем содержимое template
  const element = document.createElement(newEl)
  const templateContent = template.replace(/<template>|<\/template>/, '')
  // добавляем содержимое к созданному элементу и потом добавляем в корневой элемент
  element.innerHTML = templateContent
  rootEl.append(element)
}

createElementUsingTemplate(template, 'div', rootEl)
