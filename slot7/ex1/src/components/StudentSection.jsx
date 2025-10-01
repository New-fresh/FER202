import StudentCard from './StudentCard';

export default function StudentSection() {
  const students = [
    { id: "DE160182", name: "Nguyễn Hữu Quốc Khánh", img: "/images/img2.png" },
    { id: "DE160377", name: "Choy Vĩnh Thiện",        img: "/images/img3.png" },
    { id: "DE160547", name: "Đỗ Nguyên Phúc",        img: "/images/img4.png" },
    { id: "DE170049", name: "Lê Hoàng Minh",         img: "/images/img5.png" },
  ];

  return (
    <main className="container my-5">
      <h2 className="text-center mb-4">Students Detail</h2>
      <div className="row g-4">
        {students.map((s) => (
          <div className="col-md-6" key={s.id}>
            <StudentCard {...s} />
          </div>
        ))}
      </div>
    </main>
  );
}
