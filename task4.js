export const declensionOfWords = (n, forms) => {
  n = Math.abs(n) % 100 // получаем остаток для сравнения
  const n1 = n % 10 // получаем остаток для сравнения

  if (n > 10 && n < 20) {
    return forms[2] // возвращаем Родительный падеж, мн.ч.
  }

  if (n1 === 1) {
    return forms[0] // возвращаем Именительный падеж, ед. ч.
  }

  if (n1 > 1 && n1 < 5) {
    return forms[1] // возвращаем Родительный падеж, ед.ч.
  }

  return forms[2] // возвращаем Родительный падеж, мн.ч.
}
console.log(declensionOfWords(21, ['книга', 'книги', 'книг']))
console.log(declensionOfWords(54, ['книга', 'книги', 'книг']))
console.log(declensionOfWords(205, ['книга', 'книги', 'книг']))
