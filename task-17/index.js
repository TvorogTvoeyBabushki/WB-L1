// находим в DOM список
const addressList = document.querySelector('#addressList')
// переменная, которая будет хранить нашу карту
let map

const initMap = async coords => {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready

  // через деструктуризацию достаём переменные дря работы с API
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapControls
  } = ymaps3
  // импортируем маркер для карты
  const { YMapDefaultMarker } = await ymaps3.import(
    '@yandex/ymaps3-markers@0.0.1'
  )
  // импортируем зум для уменьшения и увеличения масштаба
  const { YMapZoomControl } = await ymaps3.import(
    '@yandex/ymaps3-controls@0.0.1'
  )

  // очищаем карту, если она уже существует
  if (map) {
    map.destroy()
    map = null
  }

  // Иницилиазируем карту
  map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    document.getElementById('map'),

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: coords,

        // Уровень масштабирования
        zoom: 10
      }
    }
  )

  // Добавляем слой для отображения схематической карты
  const layer = new YMapDefaultSchemeLayer()
  map.addChild(layer)
  // В этом слое будут маркеры.
  map.addChild(new YMapDefaultFeaturesLayer())
  // Добавляем на карту в правую часть панель с зумом
  map.addChild(
    new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({}))
  )
  // добавляем маркер на карту
  const marker = new YMapDefaultMarker({ coordinates: coords })
  map.addChild(marker)
  // находим в DOM элемент с маркером
  const markerEl = document.querySelector('.ymaps3x0--default-marker__icon-box')

  // добавляем событие клика на маркер, который будет менять масштаб
  markerEl.addEventListener('click', () =>
    map.update({
      location: {
        center: coords,
        zoom: 10,
        duration: 400
      }
    })
  )

  // находим в DOM поле для поиска
  const searchField = document.querySelector('#addressInput')
  searchField.value = ''

  // функция для поиска объектов, которая работает с задержкой 0.5 сек
  const handleSearch = debounce(async e => {
    // получаем данные в количестве 10 штук
    const response = await ymaps3.search({
      text: e.target.value,
      limit: 10
    })

    response.forEach(address => {
      // создаем элемент списка и ссылку
      const liEl = document.createElement('li')
      const linkEl = document.createElement('a')

      // добавляем атрибут и стили к ссылке
      linkEl.href = '#'
      linkEl.style.color = '#000'
      linkEl.style.textDecoration = 'none'
      // добавляем элемент списка в список
      linkEl.append(address.properties.name)
      liEl.append(linkEl)
      addressList.append(liEl)

      // вешаем событие клика на ссылку
      linkEl.addEventListener('click', e => {
        // убираем дефолтное поведение
        e.preventDefault()
        handleDeleteListItem()

        // отписываемся от события, чтобы не было их дублирование
        searchField.removeEventListener('input', handleSearch)
        // перерисовываем карту через рекурсию
        initMap(address.geometry.coordinates)
      })
    })
  }, 500)

  // добавляем событие ввода в поле поиска
  searchField.addEventListener('input', handleSearch)
}

// функция, которая удаляет все элементы списка
const handleDeleteListItem = () => {
  const liEl = addressList.querySelectorAll('li')
  liEl.forEach(li => {
    addressList.removeChild(li)
  })
}

// функция декоратор, которая вызывает другую функцию с определенной задержкой
const debounce = (func, delay) => {
  let timerId // переменая, которая будет хранить таймаут

  return (...args) => {
    handleDeleteListItem()

    // очищаем таймаут, чтоб предыдущая функция не сработала
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      // вызываем функцию, которую передаем как аргумент, через какое-то время
      func(...args)
    }, delay)
  }
}

// вызываем основную функцию в первый раз
initMap([37.617698, 55.755864])
// https://doka.guide/js/throttle/
