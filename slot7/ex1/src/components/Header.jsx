export default function Header() {
  return (
    <header>
      
      <div style={{ backgroundColor: "#f5deb3" }} className="py-2">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          
          <div className="d-flex align-items-center">
            <img
              src="/images/FPT.png"
              alt="FPT Logo"
              style={{ height: "40px" }}
              className="me-3"
            />

            
            <nav>
              <ul className="nav">
                <li className="nav-item">
                  <a href="#!" className="nav-link text-dark">
                    🏠 Trang chủ
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#!" className="nav-link text-dark">
                    📘 Ngành học
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#!" className="nav-link text-dark">
                    📝 Tuyển sinh
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#!" className="nav-link text-dark">
                    👥 Sinh viên
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          
          <div>
            <label className="me-2">Search:</label>
            <input
              type="text"
              className="form-control d-inline-block"
              style={{ width: "200px" }}
            />
          </div>
        </div>
      </div>

      
      <div>
        <img src="/images/img1.png" alt="Banner" className="img-fluid w-100" />
      </div>

      
      <div className="container my-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#!" className="text-danger fw-semibold">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Students
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
}
