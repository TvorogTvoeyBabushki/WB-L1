// функция для получения данных из формы
const handleSubmit = e => {
  e.preventDefault()
  // созд элемент формы, коллекцию данных, поля
  // и через деструктуризацию достаем нужные нам свойства
  const formEl = e.target
  const formData = new FormData(formEl)
  const fields = formEl.querySelectorAll('input')
  const { fname, lname } = Object.fromEntries(formData)
  // вызывае алерт с нашими данными
  alert(`Имя ${fname}, Фамилия ${lname}`)
  // очищаем поля
  fields.forEach(field => {
    field.value = ''
  })
}
// находим форму и вашаем событие
const formEl = document.querySelector('#task-29')
formEl.addEventListener('submit', handleSubmit)
