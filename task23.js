// находим поле ввода и div, куда мы будем вставлять текст со сложностью пароля и индикатор
const passwordField = document.querySelector('#password')
const passwordIndicator = document.querySelector('#password-indicator')
const passwordComplexity = document.querySelector('#password-complexity')

const evaluatePasswordStrength = password => {
  // Оценка сложности пароля по условиям
  let difficultyRating = 0

  // Проверка на длину пароля
  if (password.length >= 14) {
    difficultyRating++
  }

  // Проверка наличия цифр
  if (/\d/.test(password)) {
    difficultyRating++
  }

  // Проверка наличия букв в разных регистрах
  if (/[a-z]/.test(password)) {
    difficultyRating++
  }

  if (/[A-Z]/.test(password)) {
    difficultyRating++
  }

  // Проверка наличия специальных символов
  if (/[^\d\sa-zA-Z]/.test(password)) {
    difficultyRating++
  }

  // Оценка сложности пароля
  let strength

  switch (difficultyRating) {
    case 1:
      strength = 'Очень слабый'

      passwordIndicator.style.width = '50px'
      passwordIndicator.style.backgroundColor = 'red'
      passwordComplexity.style.color = 'red'
      break
    case 2:
      strength = 'Cлабый'

      passwordIndicator.style.width = '100px'
      passwordIndicator.style.backgroundColor = 'red'
      passwordComplexity.style.color = 'red'
      break
    case 3:
      strength = 'Средний'

      passwordIndicator.style.width = '150px'
      passwordIndicator.style.backgroundColor = 'orange'
      passwordComplexity.style.color = 'orange'
      break
    case 4:
      strength = 'Сильный'

      passwordIndicator.style.width = '200px'
      passwordIndicator.style.backgroundColor = 'orange'
      passwordComplexity.style.color = 'orange'
      break
    case 5:
      strength = 'Очень сильный'

      passwordIndicator.style.width = '300px'
      passwordIndicator.style.backgroundColor = 'green'
      passwordComplexity.style.color = 'green'
      break
    default:
      break
  }

  return strength
}

// вешаем событие на поле ввода
passwordField.addEventListener('input', e => {
  // проверяем длину пароля и выводим валидационное сообщение
  if (e.target.value.length < 8) {
    passwordIndicator.textContent && passwordIndicator.firstChild.remove()
    passwordComplexity.textContent && passwordComplexity.firstChild.remove()
    passwordIndicator.append('Минимальная длина пароля 8 символов')

    passwordIndicator.style.width = '300px'
    passwordIndicator.style.backgroundColor = 'transparent'
    passwordIndicator.style.color = 'red'

    return
  }
  // выводим сложность пароля
  passwordIndicator.textContent && passwordIndicator.firstChild.remove()
  passwordComplexity.innerHTML = evaluatePasswordStrength(e.target.value)
})
