const checkIsStrangeNumber = (number) => {
  let sumDivisors = 0 // переменная, которая хранит сумму делителей

  for (let i = 0; i < number; i++) {
    if (sumDivisors > number) {
      return false // возвращаем лож, если эта сумма больше входного числа
    }

    if (number % i === 0) {
      sumDivisors += i // суммируем предыдущее значение с текущим делителем, у которого остаток 0
    }
  }

  if (sumDivisors === number) {
    return true // возвращаем истину, если сумма делителей равна входному числу
  }
  return false
}
console.log(checkIsStrangeNumber(28))
console.log(checkIsStrangeNumber(8128))
console.log(checkIsStrangeNumber(444_444_440))
