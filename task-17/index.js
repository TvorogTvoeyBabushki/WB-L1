const initMap = async (coords) => {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready

  const { YMap, YMapDefaultSchemeLayer } = ymaps3

  // Иницилиазируем карту
  const map = new YMap(
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
  map.addChild(new YMapDefaultSchemeLayer())

  const searchField = document.querySelector('#addressInput')
  searchField.value = ''

  searchField.addEventListener(
    'input',
    debounce(async (e) => {
      const response = await ymaps3.search({
        text: e.target.value
      })

      const addressList = document.querySelector('#addressList')
      response.forEach((address) => {
        const liEl = document.createElement('li')
        const linkEl = document.createElement('a')

        linkEl.href = '#'
        linkEl.append(address.properties.name)
        liEl.append(linkEl)
        addressList.append(liEl)
      })
    }, 500)
  )
}

const debounce = (func, delay) => {
  let timerId

  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      const addressList = document.querySelector('#addressList')
      const liEl = addressList.querySelectorAll('li')
      liEl.forEach((li) => {
        addressList.removeChild(li)
      })
      func(...args)
    }, delay)
  }
}

initMap([37.617698, 55.755864])
