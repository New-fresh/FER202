import React, { useEffect } from 'react';


const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const person = {
  name: "Costas",
  address: { street: "Lalaland 12" }
};

/* ================== HÀM TIỆN ÍCH ================== */
const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);

const collect = (...args) =>
  args.reduce((acc, arg) => acc.concat(Array.isArray(arg) ? arg : [arg]), []);

const makeCounter = () => {
  let count = 0;
  return () => ++count; // lần đầu trả 1
};

function parseQuery(url) {
  const query = url.split("?")[1];
  if (!query) return {};
  return query.split("&").reduce((acc, pair) => {
    const [key, value] = pair.split("=");
    acc[decodeURIComponent(key)] = decodeURIComponent(value ?? "");
    return acc;
  }, {});
}

/* ================== COMPONENT ================== */
export default function Test2() {
  useEffect(() => {
    console.clear();
    // 1. Print name of each company
    console.log("== All Companies ==");
    companies.forEach(c => console.log(c.name));

    // 2. Companies started after 1987
    console.log("\n== Companies started after 1987 ==");
    companies.filter(c => c.start > 1987).forEach(c => console.log(c.name));

    // 3. Retail, start+1
    console.log("\n== Retail companies (start+1) ==");
    const retailCompanies = companies
      .filter(c => c.category === "Retail")
      .map(c => ({ ...c, start: c.start + 1 }));

    retailCompanies.forEach(c => {
      console.log(`${c.name} - ${c.category} - ${c.start} - ${c.end}`);
    });

    // 4. Sort by end ASC
    console.log("\n== Companies sort by end ASC ==");
    const sortedByEnd = [...companies].sort((a, b) => a.end - b.end);
    sortedByEnd.forEach(c => console.log(`${c.name} (${c.end})`));

    // 5. Sort ages DESC
    console.log("\n== Ages sort DESC ==");
    const sortedAges = [...ages].sort((a, b) => b - a);
    console.log(sortedAges);

    // 6. Sum ages with reduce
    console.log("\n== Sum of ages ==");
    const totalAges = ages.reduce((s, age) => s + age, 0);
    console.log(totalAges);

    // 7. New object from companies[0] + method print
    console.log("\n== New object from companies[0] with method ==");
    const { name, category } = companies[0];
    const newObj = {
      name,
      category,
      print() { console.log("Company:", this.name); }
    };
    newObj.print();

    // 8. sum(...nums)
    console.log("\nSum(1,2,3,4) =", sum(1, 2, 3, 4));

    // 9. collect(...args) – flatten nông
    console.log("collect(1, [2,3], 'x') =", collect(1, [2, 3], "x"));

    // 10. Destructure street
    const { address: { street } } = person;
    console.log("\nStreet:", street);

    // 11. counter()
    const counter = makeCounter();
    console.log("Counter calls:", counter(), counter(), counter());

    // 12. parseQuery
    console.log("\nParse query:", parseQuery("https://example.com?name=Ann&age=20"));

    // 13. Promise: random >5 hoặc Error
    const randomPromise = new Promise((resolve, reject) => {
      const n = Math.floor(Math.random() * 10);
      if (n > 5) resolve(n);
      else reject("Error: number <= 5");
    });

    randomPromise
      .then(res => console.log("Random >", res))
      .catch(err => console.log(err));
  }, []); 

  // JSX minh hoạ (Retail +1)
  const retailPlusOne = companies
    .filter(c => c.category === "Retail")
    .map(c => ({ ...c, start: c.start + 1 }));

  return (
    <div style={{ padding: 16, textAlign: 'left' }}>
      <h2>Exercise 4 – JSX + ES6 (Console Demo)</h2>
      <p>Mở DevTools Console để xem kết quả map/filter/reduce/sort...</p>

      <h3>Retail (+1 start) render DOM</h3>
      {retailPlusOne.map(c => (
        <div key={c.name} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 6 }}>
          <p><strong>{c.name}</strong></p>
          <p>Category: {c.category}</p>
          <p>Start(+1): {c.start} — End: {c.end}</p>
        </div>
      ))}
    </div>
  );
}
