export function Exercise3() {
    // Doanh nghiệp
    const companies = [
      { name: "Alpha", category: "Finance", start: 1990, end: 2005 },
      { name: "Beta", category: "Retail",  start: 2005, end: 2018 },
      { name: "Gamma", category: "Tech",   start: 2011, end: 2020 },
      { name: "Delta", category: "Auto",   start: 1999, end: 2002 },
      { name: "Epsilon", category: "Tech", start: 2015, end: 2022 },
    ];
  
    const ages = [33, 12, 20, 16, 19, 27, 13];
  
    // ===== 6. Sort + slice theo năm kết thúc =====
    const sortedByEndAsc = [...companies].sort((a, b) => a.end - b.end);
    const top3 = sortedByEndAsc.slice(0, 3);
  
    // ===== 7. Spread vs Rest =====
    // Bất biến: sao chép company[0] nhưng tăng start
    const company0New = { ...companies[0], start: companies[0].start + 1 };
  
    // Hàm concatAll sử dụng rest parameter
    const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);
  
    const concatResult = concatAll([1, 2], [3], [4, 5]);
  
    // ===== 8. Reduce nâng cao =====
    const total = ages.reduce((acc, n) => acc + n, 0);
    const min = ages.reduce((acc, n) => (n < acc ? n : acc), Infinity);
    const max = ages.reduce((acc, n) => (n > acc ? n : acc), -Infinity);
  
    const buckets = ages.reduce(
      (acc, n) => {
        if (n >= 13 && n <= 19) acc.teen += 1;
        else if (n >= 20) acc.adult += 1;
        return acc;
      },
      { teen: 0, adult: 0 }
    );
  
    return (
      <>
        <h2>Chi tiết Exercise 3</h2>
  
        <p>Top 3 công ty theo năm kết thúc (end ASC):</p>
        <ul>
          {top3.map((c, i) => (
            <li key={i}>
              {c.name} - {c.end}
            </li>
          ))}
        </ul>
  
        
        <h3>Spread vs Rest</h3>
        <p>companies[0]: {companies[0].name} - start: {companies[0].start}</p>
        <p>company0New: {company0New.name} - start: {company0New.start}</p>
        <p>concatAll([1,2],[3],[4,5]) = {JSON.stringify(concatResult)}</p>
  
        
        <h3>Reduce nâng cao</h3>
        <p>Total: {total}, Min: {min}, Max: {max}</p>
        <p>Buckets: teen = {buckets.teen}, adult = {buckets.adult}</p>
      </>
    );
  }
  