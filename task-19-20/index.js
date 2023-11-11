// указываем параметры для запроса wall.get
const ownerId = '-22751485' // id паблика  -56169357 -22751485
const count = 10 // количество постов
const accessToken =
  'a3444deca3444deca3444dec83a052795caa344a3444decc60ca8551082ea7c81a0c97c'
// для проверки первых постов
let isNewPosts = true
// парсим данные с хранилища
const parsePostsDataLS = () => {
  if (localStorage.getItem('posts')) {
    return JSON.parse(localStorage.getItem('posts'))
  } else {
    return []
  }
}
// смещение количества постов, которое потом передаем в запрос
let offset = localStorage.getItem('posts')
  ? parsePostsDataLS()[parsePostsDataLS().length - 1].offset
  : 0

// функция для создания элементов списка постов
const createPostElement = post => {
  // создаем элементы
  const postEl = document.createElement('div')
  const textWrapper = document.createElement('div')
  const imgsWrapper = document.createElement('div')
  const videoWrapper = document.createElement('div')
  const footerWrapper = document.createElement('div')

  textWrapper.append(post.text)
  //создаем изображение/видео и задаем стили
  post.attachments.forEach(({ photo, video }) => {
    if (photo) {
      const imgEl = document.createElement('img')
      const imgWrapper = document.createElement('div')

      imgEl.setAttribute('src', `${photo.sizes[2].url}`)
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

    if (video) {
      const linkEl = document.createElement('a')
      const videoEl = document.createElement('video')

      linkEl.setAttribute(
        'href',
        `https://vk.com/video${video.owner_id}_${video.id}`
      )
      videoEl.setAttribute('controls', '')
      videoEl.setAttribute('muted', 'muted')
      videoEl.setAttribute('width', '508')
      videoEl.setAttribute('poster', `${video.image[3].url}`)
      linkEl.append(videoEl)
      videoWrapper.append(linkEl)
    }
  })
  // наполняем содержимым нижнюю часть поста
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
  // добавляем всё в наш главный элемент
  postEl.append(
    textWrapper,
    post.attachments.length ? imgsWrapper : '',
    post.attachments.length ? videoWrapper : '',
    footerWrapper
  )

  return postEl
}
// находим корневой див
const widgetElement = document.querySelector('#vk-widget')
// функция для отображения списка постов
const renderPosts = posts => {
  posts.forEach(post => {
    widgetElement.append(createPostElement(post))
  })
}
// функция для отображения новых постов
const updatePosts = (posts, isPinned) => {
  // находим закрепленный пост и от него соседа
  if (isPinned) {
    const firstEl = widgetElement.firstChild
    const siblingFirstEl = firstEl.nextSibling

    posts.forEach(post => {
      // добавляем перед последним постом новый пост
      siblingFirstEl.before(createPostElement(post))
    })
    return
  }

  posts.forEach(post => {
    // добавляем перед последним постом новый пост
    widgetElement.insertAdjacentElement('afterbegin', createPostElement(post))
  })
}
// функция, которая делает запрос на другой домен и возвращает данные
const jsonpRequest = (url, callback) => {
  const postData = parsePostsDataLS()
  const script = document.createElement('script')
  script.src = url

  window[callback] = data => {
    // обрабатываем полученные данные
    const posts = data.response.items
    const newPosts = []
    const maxSizeStore = 5 * 1024 * 1024

    if (isNewPosts && localStorage.getItem('posts')) {
      // проверка на новые посты при перезагрузке страницы
      // без закрепленного поста и с закрепленным постом
      if (
        (posts[0].id !== postData[0]?.id && !posts[0].is_pinned) ||
        (posts[1].id !== postData[1]?.id && posts[0].is_pinned)
      ) {
        for (let i = 0; i < posts.length; i++) {
          // пропускаем первый пост, тк он закреплён
          if (i === 0 && posts[0].is_pinned) continue
          // если пост есть в стор, то останавливаем цикл
          if (
            (posts[i].id === postData[0]?.id && !posts[0].is_pinned) ||
            (posts[i].id === postData[1]?.id && posts[0].is_pinned)
          ) {
            break
          }
          // добавляем в массив новый пост
          newPosts.push(posts[i])
        }
        // отрисовываем новые посты
        // добавляем новые данные в массив с данными из стора
        updatePosts(newPosts, posts[0].is_pinned)
        postData.unshift(...newPosts)
        // проверка на переполнение стора
        for (let i = 0; i < newPosts.length; i++) {
          const currentStoreSize =
            (JSON.stringify(postData).length + 'posts'.length) * 2
          //удаляем пост, если стор переполнен
          if (currentStoreSize > maxSizeStore) {
            const lastPost = widgetElement.lastChild

            widgetElement.removeChild(lastPost)
            postData.pop()
          } else {
            break
          }
        }
      }

      // обновляем лайки и комментарии у постов
      postData.forEach(postLS => {
        posts.forEach(post => {
          if (postLS.id === post.id) {
            postLS.likes.count = post.likes.count
            postLS.comments.count = post.comments.count
          }
        })
      })
      // кэшируем данные
      localStorage.setItem('posts', JSON.stringify(postData))
    }
    // проверка на первую загрузку данных и загрузку новых данных
    if ((isNewPosts && !localStorage.getItem('posts')) || !isNewPosts) {
      if (!isFullTotalSizeStore) {
        // проверка на заполненный стор
        // добавляем новые данные в массив с данными из стора
        posts.forEach(post => {
          post.offset = offset
        })
        postData.push(...posts)
        // кэшируем данные
        localStorage.setItem('posts', JSON.stringify(postData))
      }
      // отрисовываем данные
      renderPosts(posts)
    }
    isNewPosts = false
    // удаляем колбэк и скрипт
    delete window[callback]
    document.body.removeChild(script)
  }
  document.body.append(script)
}
// функция, которая вызывает другую функцию с определенной переодичностью
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
  // нам потребуется знать высоту элемента(где будет расположен виджет)
  // и высоту видимой части экрана:
  const heightWidget = widgetElement.scrollHeight
  const screenHeight = document.documentElement.clientHeight

  // записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = widgetElement.scrollTop

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — четверть экрана до конца страницы:
  // устанавливаем границу, при достижении которой будем отправлять новый запрос
  const threshold = heightWidget - screenHeight / 4

  // нижняя граница экрана
  const position = scrolled + screenHeight

  if (position >= threshold) {
    // увеличиваем смещение на 10
    offset += 10
    // выводим в консоль данные по стору и делаем запрос на новые данные
    calculateLocalStorageSize()
    jsonpRequest(
      `https://api.vk.com/method/wall.get?owner_id=${ownerId}&count=${count}&offset=${offset}&access_token=${accessToken}&v=5.154&callback=getPosts`,
      'getPosts'
    )
  }
}, 250)
// события скрола и изменения размеров
widgetElement.addEventListener('scroll', checkPosition)
window.addEventListener('resize', checkPosition)

// вызываем функцию для получения и отображения новых постов
jsonpRequest(
  `https://api.vk.com/method/wall.get?owner_id=${ownerId}&count=${
    offset ? offset + 10 : count
  }&access_token=${accessToken}&v=5.154&callback=getPosts`,
  'getPosts'
)
// отображаем закэшированные посты
if (localStorage.getItem('posts')) {
  renderPosts(parsePostsDataLS())
}
