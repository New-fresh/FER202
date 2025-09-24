export  function Exercise1() {
    const double = (x) => x * 2;
    const issPositive = x => x >= 0;
    return (
      <>
        <p>Hi <strong>Exercise1</strong></p>
        <h2>Chi tiết Exercise 1</h2>
        <p>Ham double(5): {double(5)}</p>
        <p>issPositive 5: {issPositive(5)? "So Duong": "So am"}</p>
      </>
    );
  }
  