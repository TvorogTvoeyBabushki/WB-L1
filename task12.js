const book = {
  title: 'Название книги',
  author: 'Автор',
  year: 2023,

  getTitle() {
    return this.title // метод, который возвращает название книги
  },

  setTitle(newTitle) {
    this.title = newTitle // метод, который изменяет название книги
  },

  getAuthor() {
    return this.author // метод, который возвращает имя автора
  },

  setAuthor(newAuthor) {
    this.author = newAuthor // метод, который изменяет имя автора
  },

  getYear() {
    return this.year // метод, который возвращает год издания
  },

  setYear(newYear) {
    this.year = newYear // метод, который изменяет год издания
  },
}
