// Указываем параметры для запроса wall.get
const ownerId = '-56169357' // id паблика
let count = 10 // количество постов
let offset = localStorage.getItem('posts')
  ? JSON.parse(localStorage.getItem('posts')).length
  : 0 // смещение количества постов
const access_token =
  'a3444deca3444deca3444dec83a052795caa344a3444decc60ca8551082ea7c81a0c97c'

// Функция для создания элементов списка постов
const createPostElement = post => {
  const postEl = document.createElement('div')
  const textWrapper = document.createElement('div')
  const imgsWrapper = document.createElement('div')
  const footerWrapper = document.createElement('div')

  textWrapper.append(post.text)

  post.attachments.forEach(attachment => {
    if (attachment.photo) {
      const imgEl = document.createElement('img')
      const imgWrapper = document.createElement('div')

      imgEl.setAttribute('src', `${attachment.photo.sizes[2].url}`)
      imgEl.setAttribute('alt', 'фото')

      if (post.attachments.length > 5) {
        imgEl.style.width = '168px'
        imgEl.style.height = '168px'
      } else if (post.attachments.length === 1) {
        imgEl.style.width = '100%'
      } else {
        imgEl.style.width = '253px'
        imgEl.style.height = '253px'
      }

      imgWrapper.append(imgEl)
      imgsWrapper.append(imgWrapper)
    }
  })

  footerWrapper.innerHTML = `
    <div>
      <div>
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 2.05857C2.26589 2.75224 1.76684 3.83284 1.99493 5.42928C2.22332 7.02783 3.26494 8.68522 4.80436 10.3478C6.25865 11.9184 8.10962 13.4437 9.99996 14.874C11.8903 13.4437 13.7413 11.9184 15.1956 10.3478C16.735 8.68521 17.7766 7.02783 18.005 5.4293C18.233 3.83285 17.734 2.75224 16.9659 2.05856C16.1766 1.34572 15.055 1 14 1C12.1319 1 11.0923 2.08479 10.5177 2.68443C10.4581 2.7466 10.4035 2.80356 10.3535 2.85355C10.1582 3.04882 9.84166 3.04882 9.6464 2.85355C9.59641 2.80356 9.54182 2.7466 9.48224 2.68443C8.90757 2.08479 7.86797 1 5.99995 1C4.94495 1 3.82325 1.34573 3.03396 2.05857ZM2.36371 1.31643C3.37369 0.404274 4.75202 0 5.99995 0C8.07123 0 9.34539 1.11257 9.99996 1.77862C10.6545 1.11257 11.9287 0 14 0C15.2479 0 16.6262 0.404275 17.6362 1.31644C18.6674 2.24776 19.2668 3.66715 18.9949 5.5707C18.7233 7.47217 17.5149 9.31479 15.9294 11.0272C14.3355 12.7486 12.3064 14.3952 10.3 15.9C10.1222 16.0333 9.87773 16.0333 9.69995 15.9C7.69353 14.3952 5.66443 12.7485 4.0706 11.0272C2.48503 9.31478 1.27665 7.47217 1.00498 5.57072C0.733012 3.66716 1.33249 2.24776 2.36371 1.31643Z" fill="black"/>
        </svg>
        ${post.likes.count}
      </div>
      <div>
        <img 
          width="48" 
          height="48" 
          src="https://img.icons8.com/fluency-systems-regular/48/topic.png" 
          alt="topic"
        />
        ${post.comments.count}
      </div>
    </div>
    <div>
      ${moment(new Date(post.date * 1000)).format('D MMM YYYY')}
    </div>
  `

  postEl.append(
    textWrapper,
    post.attachments.length ? imgsWrapper : '',
    footerWrapper
  )

  return postEl
}

// Функция для отображения списка постов
const renderPosts = posts => {
  const widgetElement = document.querySelector('#vk-widget')
  posts.forEach(post => {
    widgetElement.append(createPostElement(post))
  })
}

const jsonpRequest = (url, callback) => {
  const postData = JSON.parse(localStorage.getItem('posts')) || []
  const script = document.createElement('script')
  script.src = url

  window[callback] = data => {
    // Обрабатываем полученные данные
    postData.push(...data.response.items)
    localStorage.setItem('posts', JSON.stringify(postData))

    renderPosts(data.response.items)
    delete window[callback]
    document.body.removeChild(script)
  }
  document.body.append(script)
}

const throttle = (func, delay) => {
  let timer = null

  return (...args) => {
    if (timer) return

    timer = setTimeout(() => {
      func(...args)

      clearTimeout(timer)
      timer = null
    }, delay)
  }
}

const checkPosition = throttle(() => {
  // Нам потребуется знать высоту документа и высоту экрана:
  const heightBody = document.body.clientHeight
  const screenHeight = document.documentElement.clientHeight

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = window.scrollY

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — четверть экрана до конца страницы:
  const threshold = heightBody - screenHeight / 4

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled + screenHeight

  if (position >= threshold) {
    // Если мы пересекли полосу-порог, вызываем нужное действие.
    offset += 10
    jsonpRequest(
      `https://api.vk.com/method/wall.get?owner_id=${ownerId}&count=${count}&offset=${offset}&access_token=${access_token}&v=5.154&callback=getPosts`,
      'getPosts'
    )
  }
}, 250)

window.addEventListener('scroll', checkPosition)
window.addEventListener('resize', checkPosition)

// Вызываем функцию для получения и отображения списка постов
if (localStorage.getItem('posts')) {
  renderPosts(JSON.parse(localStorage.getItem('posts')))
} else {
  jsonpRequest(
    `https://api.vk.com/method/wall.get?owner_id=${ownerId}&count=${count}&access_token=${access_token}&v=5.154&callback=getPosts`,
    'getPosts'
  )
}
