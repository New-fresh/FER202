export function Exercise2() {
  // Dữ liệu gốc
  const numbers = [1, -20, 13, 4, -5, 6, 9, -10, 8, 7, -15];
  const names   = ["An","Binh","Cuong","Duc","Hung","Khanh","Long","Minh","Nam","Phuc"];
  const people  = [
    { id:1 , name:"An",   age:16 },
    { id:2 , name:"Binh", age:18 },
    { id:3 , name:"Cuong",age:20 },
    { id:4 , name:"Duc",  age:14 },
    { id:5 , name:"Hung", age:15 },
    { id:6 , name:"Khanh",age:19 },
    { id:7 , name:"Long", age:22 },
    { id:8 , name:"Minh", age:17 },
    { id:9 , name:"Nam",  age:21 },
    { id:10, name:"Phuc", age:13 },
  ];

  /* (1) Rest parameter: sum(...nums), avg(...nums)
    
  */
  const sum = (...nums) =>
    nums.filter(x => typeof x === "number" && Number.isFinite(x))
        .reduce((acc, x) => acc + x, 0);

  const avg = (...nums) => {
    const valid = nums.filter(x => typeof x === "number" && Number.isFinite(x));
    if (valid.length === 0) return 0;
    return Number((valid.reduce((a,b)=>a+b,0) / valid.length).toFixed(2));
  };

  /* (2) Destructuring object lồng nhau*/
  const person = { name: "Ann", address: { street: "123 Main St" /* city có thể thiếu */ } };
  const { address: { street, city = "Unknown City" } } = person;

  /* (3) Destructuring array*/
  const ages = [33, 12, 20, 16];
  const [first, , third = 0, ...restAges] = ages;

  /* (4) Map + filter: teen (13–19) dạng "Name (Age)" */
  const teensList = people
    .filter(p => p.age >= 13 && p.age <= 19)
    .map(p => `${p.name} (${p.age})`);

  
  const sumNumbersArray = numbers.reduce((acc, cur) => acc + cur, 0);

  return (
    <>
      <h2>Chi tiết Exercise 2</h2>

      
      <p>Các phần tử của mảng numbers:</p>
      <ul>
        {numbers.map((num, i) => <li key={i}>{num}</li>)}
      </ul>
      <p>Tổng (reduce trên mảng numbers): <strong>{sumNumbersArray}</strong></p>
      <p>Số lượng phần tử: {numbers.length}</p>

      
      <p>Hiển thị danh sách tên tăng dần</p>
      <ul>
        {[...names].sort().map((name, i) => <li key={i}>{name}</li>)}
      </ul>

      <hr />

      
      <h3>Rest parameter</h3>
      <p>sum(1,2,3) = {sum(1, 2, 3)}</p>
      <p>sum(1,'x',4) = {sum(1, "x", 4)}</p>
      <p>avg(1,2,3,4) = {avg(1, 2, 3, 4)}</p>
      <p>avg() = {avg()}</p>

      
      <h3>Destructuring object</h3>
      <p>street: {street}</p>
      <p>city: {city}</p>

      
      <h3>Destructuring array</h3>
      <p>first: {first}</p>
      <p>third: {third}</p>
      <p>restAges: {JSON.stringify(restAges)}</p>

      
      <h3>Teen list (filter + map)</h3>
      <ul>
        {teensList.map((line, i) => <li key={i}>{line}</li>)}
      </ul>
    </>
  );
}
