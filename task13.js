class Shape {
  perimeterCalc() {} // вычисление периметра

  squareCalc() {} // вычисление площади
} // класс от которого будут все расширяться

class Rect extends Shape {
  constructor(width, height) {
    super()

    this.width = width // задаем ширину
    this.height = height // задаем высоту
  }

  perimeterCalc() {
    return 2 * (this.width + this.height) // вычисляем периметр как сумма всех сторон
  }

  squareCalc() {
    return this.width * this.height // вычисляем площадь как произведение двух сторон
  }
}

class Triangle extends Shape {
  constructor(sideOne, sideTwo, sideThree) {
    super()

    this.sideOne = sideOne // задаем сторону треугольника
    this.sideTwo = sideTwo // задаем сторону треугольника
    this.sideThree = sideThree // задаем сторону треугольника
  }

  perimeterCalc() {
    return this.sideOne + this.sideTwo + this.sideThree // вычисляем периметр как сумма всех сторон
  }

  squareCalc() {
    // вычисляем площадь по трем сторонам
    const p = this.perimeterCalc() / 2 // находим полупериметр

    return Math.round(
      Math.sqrt(
        p * (p - this.sideOne) * (p - this.sideTwo) * (p - this.sideThree)
      )
    )
  }
}

class Circle extends Shape {
  constructor(radius) {
    super()

    this.radius = radius // задаем радиус круга
  }

  perimeterCalc() {
    // вычисляем периметр как 2 умноженое на произведение числа ПИ на радиус
    return Math.round(2 * Math.PI * this.radius)
  }

  squareCalc() {
    // вычисляем площадь как произведение числа ПИ на радиус в квадрате
    return Math.round(Math.PI * this.radius ** 2)
  }
}

const perimeterRect = new Rect(10, 5) // создаем экземпляр прямоугольника
const perimeterTriangle = new Triangle(5, 5, 7) // создаем экземпляр треугольника
const perimeterCircle = new Circle(50) // создаем экземпляр круга
console.log(perimeterRect.perimeterCalc(), perimeterRect.squareCalc())
console.log(perimeterTriangle.perimeterCalc(), perimeterTriangle.squareCalc())
console.log(perimeterCircle.perimeterCalc(), perimeterCircle.squareCalc())
