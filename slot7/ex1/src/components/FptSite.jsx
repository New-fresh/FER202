export default function FptSite() {
    const brandOrange = '#e09a3c'; // màu cam giống hình
  
    return (
      <div className="bg-light">
        {/* ===== Header cam với logo + menu ===== */}
        <header style={{ backgroundColor: brandOrange }}>
          <div className="container py-4 text-center">
            {/* ảnh nằm trong public/images/FPT.png */}
            <img
              src="/images/FPT.png"
              alt="FPT University"
              className="img-fluid"
              style={{ maxWidth: 520 }}
            />
          </div>
  
          {/* Menu: Home | About | Contact (chữ trắng nhạt) */}
          <nav>
            <ul className="nav justify-content-center pb-2">
              <li className="nav-item">
                <a className="nav-link text-white" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </header>
  
        {/* ===== Main trắng: About + Contact ===== */}
        <main id="home" className="bg-white">
          <div className="container text-center py-5">
            <section id="about" className="py-4">
              <h5 className="fw-bold mb-2">About</h5>
              <p className="text-muted m-0">
                This is the about section of the website.
              </p>
            </section>
  
            <section id="contact" className="py-4">
              <h5 className="fw-bold mb-2">Contact</h5>
              <p className="text-muted m-0">
                For any inquiries, please contact us at example@example.com.
              </p>
            </section>
          </div>
        </main>
  
        {/* ===== Footer cam ===== */}
        <footer style={{ backgroundColor: brandOrange }}>
          <div className="container text-center py-3">
            <small className="text-white-50">
              © 2023 Website. All rights reserved.
            </small>
          </div>
        </footer>
      </div>
    );
  }
  