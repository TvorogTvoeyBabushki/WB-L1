// переменные для хранения активной страницы, сортировки и загрузки данных
const activePage = [1]
const activeSort = []
let isLoading = false
// созд лоадера и добавления его в DOM при загрузке
const loader = () => {
  const loader = document.createElement('div')
  loader.setAttribute('id', 'loader')

  if (isLoading) {
    loader.append('Loading...')
    document.body.append(loader)
  } else {
    document.body.removeChild(document.querySelector('#loader'))
  }
}
// загрузка и рендер данных
const loadData = async () => {
  try {
    isLoading = true
    loader()
    const response = await fetch(
      'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true'
    )
    const data = await response.json()

    renderData(data)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading = false
    loader()
  }
}
// функция сортировки данных
const handleSort = (heading, data, variant) => {
  // проверяем на активную кнопку
  if (
    activeSort.length &&
    activeSort[0].heading === heading &&
    activeSort[0].variant === variant
  ) {
    return
  }
  // удаляем предыдущую сортировку и добавляем новую активную сортировку
  activeSort.pop()
  activeSort.push({ heading, variant })
  // проверки на возростание и убывание, и выбранные данные
  if (
    (heading === 'fname' ||
      heading === 'lname' ||
      heading === 'city' ||
      heading === 'state') &&
    variant === 'increase'
  ) {
    data.sort((a, b) => {
      if (heading === 'fname') {
        return a.fname.localeCompare(b.fname)
      }

      if (heading === 'lname') {
        return a.lname.localeCompare(b.lname)
      }

      if (heading === 'city') {
        return a.city.localeCompare(b.city)
      }

      if (heading === 'state') {
        return a.state.localeCompare(b.state)
      }
    })
  }

  if (
    (heading === 'fname' ||
      heading === 'lname' ||
      heading === 'city' ||
      heading === 'state') &&
    variant === 'descend'
  ) {
    data.sort((a, b) => {
      if (heading === 'fname') {
        return b.fname.localeCompare(a.fname)
      }

      if (heading === 'lname') {
        return b.lname.localeCompare(a.lname)
      }

      if (heading === 'city') {
        return b.city.localeCompare(a.city)
      }

      if (heading === 'state') {
        return b.state.localeCompare(a.state)
      }
    })
  }

  if (
    (heading === 'tel' || heading === 'address' || 'zip') &&
    variant === 'increase'
  ) {
    data.sort((a, b) => {
      if (heading === 'tel') {
        return `${a.tel}`.localeCompare(`${b.tel}`)
      }

      if (heading === 'address') {
        return `${a.address}`.localeCompare(`${b.address}`)
      }

      if (heading === 'zip') {
        return a.zip - b.zip
      }
    })
  }

  if (
    (heading === 'tel' || heading === 'address' || 'zip') &&
    variant === 'descend'
  ) {
    data.sort((a, b) => {
      if (heading === 'tel') {
        return `${b.tel}`.localeCompare(`${a.tel}`)
      }

      if (heading === 'address') {
        return `${b.address}`.localeCompare(`${a.address}`)
      }

      if (heading === 'zip') {
        return b.zip - a.zip
      }
    })
  }
  // удаляем и добавляем активную страницу и рендерим данные
  activePage.pop()
  activePage.push(1)
  renderData(data)
}
// рендер данных
const renderData = (data, startSlice = 0, endSlice = 1) => {
  // находим табл и созд пагинацию
  const table = document.querySelector('#table')
  const trTitleEl = document.createElement('tr')
  const pagination = document.createElement('nav')
  const paginationList = document.createElement('ul')
  pagination.setAttribute('id', 'pagination')
  // очищаем нашу таблицу при каждом рендере и удаляем пагинацию чтоб не было повторение элемента
  table.innerHTML = ''
  document.querySelector('#pagination') &&
    document.body.removeChild(document.querySelector('#pagination'))
  // итерируемся по нашим данным в диапазоне определенной страницы
  // создаем строки с ячейками и добавляем в таблицу
  data.slice(50 * startSlice, 50 * endSlice).forEach((item, index) => {
    const trEl = document.createElement('tr')

    for (const key in item) {
      // создаем шапку с названием ячеек и кнопки сортировок
      if (index === 0) {
        const thTitleEl = document.createElement('th')
        const btnWrapper = document.createElement('div')
        const btnSortDescending = document.createElement('button')
        const btnSortIncreasing = document.createElement('button')

        btnSortDescending.setAttribute('title', 'по убыв.')
        btnSortIncreasing.setAttribute('title', 'по возр.')
        btnSortIncreasing.innerHTML = `
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3417 8.91208C14.966 9.29821 14.3477 9.30437 13.9644 8.92579L8.14183 3.17475C8.06342 3.0973 7.93715 3.09788 7.85945 3.17603L2.15281 8.91591C1.76725 9.30371 1.14293 9.3137 0.745162 8.93845C0.335488 8.55196 0.321627 7.90488 0.714373 7.5012L7.28326 0.749487C7.67588 0.345934 8.32412 0.345934 8.71674 0.749487L15.3417 7.55884C15.7082 7.93549 15.7082 8.53542 15.3417 8.91208Z" fill="#9797AF"/>
          </svg>
        `
        btnSortDescending.innerHTML = `
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3417 8.91208C14.966 9.29821 14.3477 9.30437 13.9644 8.92579L8.14183 3.17475C8.06342 3.0973 7.93715 3.09788 7.85945 3.17603L2.15281 8.91591C1.76725 9.30371 1.14293 9.3137 0.745162 8.93845C0.335488 8.55196 0.321627 7.90488 0.714373 7.5012L7.28326 0.749487C7.67588 0.345934 8.32412 0.345934 8.71674 0.749487L15.3417 7.55884C15.7082 7.93549 15.7082 8.53542 15.3417 8.91208Z" fill="#9797AF"/>
          </svg>
        `

        btnWrapper.append(btnSortDescending, btnSortIncreasing)
        thTitleEl.append(key.toUpperCase(), btnWrapper)
        trTitleEl.append(thTitleEl)

        // сортировка по возростанию
        btnSortIncreasing.addEventListener('click', () =>
          handleSort(key, data, 'increase')
        )
        // сортировка по убыванию
        btnSortDescending.addEventListener('click', () =>
          handleSort(key, data, 'descend')
        )
      }
      const tdEl = document.createElement('td')

      tdEl.append(item[key])
      trEl.append(tdEl)
    }
    // добавляем ячейку с №
    trEl.insertAdjacentHTML(
      'afterbegin',
      `<td>${index + 1 + 50 * startSlice}</td>`
    )

    index === 0 &&
      (trTitleEl.insertAdjacentHTML('afterbegin', '<th>№</th>'),
      table.append(trTitleEl))
    table.append(trEl)
  })
  // добавляем список страниц в пагинацию
  for (let i = 1; i <= data.length / 50; i++) {
    const liEl = document.createElement('li')
    const linkEl = document.createElement('a')
    // выделяем активную страницу
    linkEl.href = '#'
    activePage[0] === i
      ? (linkEl.style.fontWeight = '700')
      : (linkEl.style.fontWeight = '400')

    linkEl.append(i)
    liEl.append(linkEl)
    paginationList.append(liEl)
    // вешаем событие клика перехода на следующую страницу
    linkEl.addEventListener('click', e => {
      e.preventDefault()
      // сброс дефолтного поведения и проверка на активную страницу
      if (activePage[0] === i) {
        return
      }
      // удаляем предыдущую страницу и добавляем новую
      activePage.pop()
      activePage.push(i)
      // делаем рендер и скрол к верху страницы
      renderData(data, i - 1, i)
      document.body.scrollIntoView({ behavior: 'smooth' })
    })
  }
  pagination.append(paginationList)
  document.body.append(pagination)
}
// загружаем данные при загрузке страницы
loadData()
