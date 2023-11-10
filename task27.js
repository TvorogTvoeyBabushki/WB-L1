// находим элемент в доме и вешаем стили, которые потом будем менять
const element = document.querySelector('#task-27')
element.style.width = '300px'
element.style.height = '200px'
// функция, которая изменяет размер элемента
const animateElementSize = (element, { width, height }, duration, timingFn) => {
  // добавляем плавности через транзишен и вендорные префиксы для поддержки браузерам
  element.style.transition = `all ${duration}s ${timingFn}`
  element.style['-webkit-transition'] = `all ${duration}s ${timingFn}`
  element.style['-o-transition'] = `all ${duration}s ${timingFn}`
  element.style.width = width
  element.style.height = height
}
// вызываем функцию
animateElementSize(
  element,
  { width: '200px', height: '300px' },
  1,
  'ease-in-out'
)
