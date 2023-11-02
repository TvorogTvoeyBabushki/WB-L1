const data = [
  {
    name: 'Egor',
    age: 25,
  },
  {
    name: 'Vany',
    age: 34,
  },
  {
    name: 'Lena',
    age: 18,
  },
  {
    name: 'Any',
    age: 25,
  },
]

const sortObjects = (arr) => {
  return arr.sort((a, b) => {
    if (a.age === b.age) {
      return a.name.localeCompare(b.name) // если возраст отдинаковый, то сортируем по имени
    } else {
      return a.age - b.age // сортируем по возрасту, и возвращаем отсортированный массив
    }
  })
}

console.log(sortObjects(data))
