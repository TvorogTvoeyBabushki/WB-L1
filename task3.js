const MathX = {
  getNumberFibonacciSeries(number = 0) {
    if (typeof number !== 'number') {
      return 'Введите число' // проверка на входные данные, только числа
    }

    if (number < 1) {
      return 'Введите число больше 0' // проверка, что число должно быть больше 0
    }

    let a = 1 // первые 2 числа в ряду Фибоначчи равны 0 и 1, начинаем отсчёт с 1
    let b = 1 // сумма первых двух чисел(0 + 1)

    for (let i = 2; i < number; i++) {
      let c = a + b // находим следующее значение, как сумма двух предыдущих
      a = b // изменяем на следующее значение
      b = c // изменяем на следующее значение
    }

    return b // возвращаем значение под соответствующим номером
  },
  getAllNumberFibonacciSeries(number) {
    if (typeof number !== 'number') {
      return 'Введите число' // проверка на входные данные, только числа
    }

    if (number < 1) {
      return 'Введите число больше 0' // проверка, что число должно быть больше 0
    }

    const a = [1, 1] // первые 2 значения в ряду Фибоначчи

    if (number === 1) {
      return a[0] // возвращаем первое значение, если диапазон равен 1
    }

    for (let i = 2; i < number; i++) {
      let b = a[i - 2] + a[i - 1] // получаем следующее значение, как сумму 2 предыдущих
      a.push(b) // добавляем в массив
    }

    return a // возвращаем массив значений
  },
  isPrime(number) {
    if (typeof number !== 'number') {
      return false // проверка на входные данные, только числа
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        return false // возвращаем лож, если у числа есть делитель(остаток равен 0)
      }
    }

    return number > 1 // возвращаем истину, если число больше 1 и у него нет делителей
  },
  getAllPrimes(limit) {
    // limit <= 10^e8
    if (typeof limit !== 'number') {
      return 'Введите число' // проверка на входные данные, только числа
    }

    const seive = [] // массив составных чисел
    const primes = [] // массив простых чисел

    for (let i = 2; i <= limit; i++) {
      if (!seive[i]) {
        primes.push(i) // добавляем в массив простых чисел, если его нет в массиве составных чисел, проверяем по индексу

        for (let j = i * i; j <= limit; j += i) {
          seive[j] = true // добавляем в массив все значения, которые делятся на простые числа
        }
      }
    }

    return primes // возвращаем массив простых чисел по алгоритму "Решето Эратосфена"
  },
}
console.log(MathX.getNumberFibonacciSeries('Строка'))
console.log(MathX.getNumberFibonacciSeries('100'))
console.log(MathX.getNumberFibonacciSeries(100))
console.log(MathX.getAllNumberFibonacciSeries(10))
console.log(MathX.isPrime(113_123_123_123_123))
console.log(MathX.getAllPrimes(100_000_000))
