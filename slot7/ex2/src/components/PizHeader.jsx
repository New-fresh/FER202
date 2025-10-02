export default function PizHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#top">Pizza House</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-4">
            <li className="nav-item"><a className="nav-link" href="#top">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#menu">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="#booking">Contact</a></li>
          </ul>

          
          <form className="ms-auto d-flex" role="search" onSubmit={(e)=>e.preventDefault()}>
            <input className="form-control" type="search" placeholder="Search" />
            <button className="btn btn-danger ms-2" type="submit">🔍</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
