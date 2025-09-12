// Tạo mảng int
const numbers = [1, 2, 3, 4, 5, 6];

// Dùng map để x2 giá trị
const doubles = numbers.map(n => n * 2);
console.log("Double:", doubles);

// Lọc các ptử chẵn
const evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers:", evens);

// Tạo mảng object people
const people = [
  { name: "Alice", age: 20 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 }
];

// Dùng reduce để tính tổng tuổi
const totalAge = people.reduce((sum, person) => sum + person.age, 0);
console.log("Total age:", totalAge);

  