export function Exercise2() {

const numbers = [1, -20, 13, 4, -5, 6, 9, -10, 8, 7, -15];
const names = ["An", "Binh", "Cuong", "Duc", "Hung", "Khanh", "Long", "Minh", "Nam", "Phuc"];
const people = [
    { id:1 ,name: "An", age: 16 },
    { id:2 ,name: "Binh", age: 18 },
    { id:3 ,name: "Cuong", age: 20 },
    { id:4 ,name: "Duc", age: 14 },
    { id:5 ,name: "Hung", age: 15 },
    { id:6 ,name: "Khanh", age: 19 },
    { id:7 ,name: "Long", age: 22 },
    { id:8 ,name: "Minh", age: 17 },
    { id:9 ,name: "Nam", age: 21 },
    { id:10 ,name: "Phuc", age: 13 }
]; 
const sum = numbers.reduce((acc, cur) => acc + cur, 0);

//loc nhung  nguoi do tuoi teen
// const isTeen = (person) => person.age >= 13 && person.age <= 19;
const teensList = people.filter(p =>p.age >= 13 && p.age <= 19);



    return (
      <>
        <h2>Chi tiết Exercise 2</h2>
        <p>Cac phan tu cua mang la: </p>
        <ul>
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
        <p>Tong cac phan tu cua mang la: <strong>{sum}</strong></p>
        <p>Số lượng phần tử là: {numbers.length} </p>
        <p>Hien thi danh sach tren tang dan</p>
        <ul>
            {names.sort().map((name, i) => (
            <li key={i}>{name}</li>    
            ))}
        </ul>
        <p>Hien thi danh sach nguoi tuoi teen</p>
        <ul>
            {teensList.map(
                (person) => (<li key={person.id}>{person.name} - {person.age} </li>    
            ))}
        </ul>

        
      </>
    );
}