export const formatDate = {
  currentDate(date) {
    // возвращаем дату по местному времени
    return moment(date).format('YYYY-MM-DD H:mm:ss') // формат 2023-11-04 11:52:01
  },
  timezone(timezone) {
    // возвращаем дату по времени UTC,
    // как сумма миллисекунд, прошедших с 1 января 1970 года
    // и часового пояса в миллисекундах
    return moment
      .utc(Date.now() + timezone * 3600 * 1000) // 3600 перевод в секунды, 1000 в миллисекунды
      .format('YYYY-MM-DD H:mm:ss') // формат 2023-11-04 11:52:01
  }
}
