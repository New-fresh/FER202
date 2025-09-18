// ===== 1) Arrow function cơ bản – double & isEven =====
// Yêu cầu: viết bằng arrow function, in ra double(7), isEven(10), isEven(7)
// (Theo đề bài) 
const double = (n) => n * 2;               // return ngầm định
const isEven = (n) => n % 2 === 0;         // true nếu n chẵn

console.log("== Arrow Function ==");
console.log("double(7) =", double(7));
console.log("isEven(10) =", isEven(10));
console.log("isEven(7)  =", isEven(7));
console.log("");

// ===== 2) Rest parameter – sum & avg =====
// Yêu cầu: sum(...nums) bỏ NaN/chuỗi không số; avg(...nums) 2 chữ số; rỗng trả 0
// Dùng rest + reduce (Theo đề bài)
const sum = (...nums) => {
  // lọc giá trị hợp lệ: kiểu number và là số hữu hạn (tránh NaN/Infinity)
  const valid = nums.filter((x) => typeof x === "number" && Number.isFinite(x));
  return valid.reduce((acc, x) => acc + x, 0);
};

const avg = (...nums) => {
  const valid = nums.filter((x) => typeof x === "number" && Number.isFinite(x));
  if (valid.length === 0) return 0;
  const s = valid.reduce((acc, x) => acc + x, 0);
  return Number((s / valid.length).toFixed(2));
};

console.log("== Rest Parameter ==");
console.log("sum(1,2,3) =", sum(1, 2, 3));
console.log("sum(1,'x',4) =", sum(1, "x", 4)); // 'x' bị bỏ qua
console.log("avg(1,2,3,4) =", avg(1, 2, 3, 4));
console.log("avg() =", avg());
console.log("");

// ===== 3) Destructuring object lồng nhau – lấy địa chỉ =====
// Yêu cầu: lấy street, city (mặc định "Unknown City"); KHÔNG truy cập person.address.street trực tiếp
// (Theo đề bài)
const person = {
  name: "Ann",
  address: {
    street: "123 Main St",
    // city có thể thiếu để test default
  },
};

// Lấy street, city thông qua destructuring + default; KHÔNG làm person.address.street
const {
  address: {
    street,
    city = "Unknown City", // giá trị mặc định
  } = {},                 // phòng khi address không tồn tại
} = person;

console.log("== Destructuring Object ==");
console.log("street:", street);
console.log("city:", city);
console.log("");

// ===== 4) Destructuring array + skip + default =====
// Yêu cầu: với ages = [33,12,20,16]; lấy first, bỏ phần tử thứ 2, lấy third (mặc định 0), restAges
const ages = [33, 12, 20, 16];
const [first, , third = 0, ...restAges] = ages;

console.log("== Destructuring Array ==");
console.log("first:", first);
console.log("third:", third);
console.log("restAges:", restAges);
console.log("");

// ===== 5) Map + filter – danh sách teen (13–19, inclusive) =====
// Yêu cầu: lọc tuổi 13–19, map sang "Name (Age)", in từng dòng
const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "Cara", age: 15 },
  { name: "Dan", age: 21 },
];

const teens = people
  .filter((p) => p.age >= 13 && p.age <= 19)       // lọc teen
  .map((p) => `${p.name} (${p.age})`);             // map sang "Name (Age)"

console.log("== Teen List (Map + Filter) ==");
teens.forEach((line) => console.log(line));
console.log("");

// ===== 6) Sort + slice – doanh nghiệp theo năm kết thúc (end) =====
// Yêu cầu: tạo bản sao đã sắp xếp theo end tăng dần; in 3 công ty đầu "Company - EndYear"
const companies = [
  { name: "Alpha", category: "Finance", start: 1990, end: 2005 },
  { name: "Beta", category: "Retail",  start: 2005, end: 2018 },
  { name: "Gamma", category: "Tech",   start: 2011, end: 2020 },
  { name: "Delta", category: "Auto",   start: 1999, end: 2002 },
  { name: "Epsilon", category: "Tech", start: 2015, end: 2022 },
];

// bất biến: tạo bản sao bằng spread, rồi sort trên bản sao
const sortedByEndAsc = [...companies].sort((a, b) => a.end - b.end);
const top3 = sortedByEndAsc.slice(0, 3);

console.log("== Companies (Sort + Slice) ==");
top3.forEach((c) => console.log(`${c.name} - ${c.end}`));
console.log("");

// ===== 7) Spread vs Rest – bất biến & gộp mảng =====
// Yêu cầu 1: từ companies[0], tạo company0New với start += 1 mà KHÔNG làm đổi companies[0]
const company0New = { ...companies[0], start: companies[0].start + 1 };

// Yêu cầu 2: Viết concatAll(...arrays) trả về mảng gộp
const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);

console.log("== Spread vs Rest ==");
console.log("companies[0] =", companies[0]);  // giữ nguyên
console.log("company0New  =", company0New);   // start tăng 1
console.log("concatAll([1,2],[3],[4,5]) =", concatAll([1, 2], [3], [4, 5]));
console.log("");

// ===== 8) Reduce nâng cao – thống kê tuổi =====
// Yêu cầu với ages: total, min, max, buckets { teen: 13–19, adult: >=20 }
const ages2 = [33, 12, 20, 16, 19, 27, 13];

// total, min, max
const total = ages2.reduce((acc, n) => acc + n, 0);
const min = ages2.reduce((acc, n) => (n < acc ? n : acc), Infinity);
const max = ages2.reduce((acc, n) => (n > acc ? n : acc), -Infinity);

// buckets
const buckets = ages2.reduce(
  (acc, n) => {
    if (n >= 13 && n <= 19) acc.teen += 1;
    else if (n >= 20) acc.adult += 1;
    return acc;
  },
  { teen: 0, adult: 0 }
);

console.log("== Reduce Advanced ==");
console.log(`Total: ${total}, Min: ${min}, Max: ${max}`);
console.log("Buckets:", buckets);
console.log("");