const loadImage = (url) => {
  return new Promise((resolve) => {
    const image = new Image() // созд экземпляр изображения

    image.onload = () => resolve(image) // передаем изображение в колбек при успешной загрузке
    image.onerror = () => {
      throw new Error('Failed to load image') // создаем ошибку, когда изображение не загрузилось
    }

    image.src = url // устанавливаем путь для изображения
  })
}

const imageUrl =
  'https://www.fotolandscape.com/wp-content/uploads/2014/12/DSC_0225.jpg'

loadImage(imageUrl)
  .then((image) => {
    console.log(image) // выводим в консоль браузера url при успешном выполнения кода
  })
  .catch((error) => {
    console.error(error) // выводим ошибку, если что-то пошло не так
  })
