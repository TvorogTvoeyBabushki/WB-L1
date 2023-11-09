const calculateLocalStorageSize = () => {
  // переменная, которая будет хранить размер стора
  let totalSizeStore = 0

  for (const key in localStorage) {
    // проверка на состояния в сторе
    if (localStorage.hasOwnProperty(key)) {
      // высчитываем размер, строка = 2 байт и добавляем к переменной
      totalSizeStore += (localStorage.getItem(key).length + key.length) * 2
    }
  }
  // задаём максимальный размер стора (5MB)
  const maxSizeStore = 5 * 1024 * 1024
  // выводим в консоль занятую память и максимальный размер стора
  console.log(
    `Объем занятой памяти: ${totalSizeStore} байт / Максимальный размер хранилища: ${maxSizeStore} байт`
  )
  // проверка на заполнения стора
  let slicePosts = 10
  if (totalSizeStore > 100_000) {
    const postData = JSON.parse(localStorage.getItem('posts')) || []
    const updatePostData = postData.slice(slicePosts)

    localStorage.setItem('posts', JSON.stringify(updatePostData))
    slicePosts += 10
    // сделать переменную и передать в индекс и там уже взаимодействовать с данными
    // isFullTotalSizeStore = true
    // нужно в обратную сторону сделать, убирать с конца, если появились новые посты
  }
}
