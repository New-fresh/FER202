export default function Navbar() {
    return (
      <div className="container mt-3">
        <ul className="nav">
          <li className="nav-item"><a className="nav-link text-primary fw-semibold" href="#!">Active</a></li>
          <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
          <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
          <li className="nav-item"><span className="nav-link text-muted">Disabled</span></li>
        </ul>
      </div>
    );
  }
  