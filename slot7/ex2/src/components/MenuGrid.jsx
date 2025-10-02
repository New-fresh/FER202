const ITEMS = [
    { name: 'Margherita Pizza', img: '/images/pizza2.jpg', old: '$40.00', price: '$24.00', tag: 'SALE' },
    { name: 'Mushroom Pizza',   img: '/images/pizza3.jpg', old: null,     price: '$25.00', tag: null   },
    { name: 'Hawaiian Pizza',   img: '/images/pizza4.jpg', old: null,     price: '$30.00', tag: 'NEW'  },
    { name: 'Pesto Pizza',      img: '/images/pizza5.jpg', old: '$50.00', price: '$30.00', tag: 'SALE' },
  ];
  
  export default function MenuGrid() {
    return (
      <section id="menu" className="mb-5">
        <h2 className="text-white-50 display-6 mb-4">Our Menu</h2>
  
        <div className="row g-4">
          {ITEMS.map((p) => (
            <div key={p.name} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="position-relative">
                  {p.tag && (
                    <span className={`badge position-absolute top-0 start-0 m-2 ${p.tag==='NEW' 
                    ? 'bg-warning text-dark' : 'bg-warning text-dark'}`}>
                      {p.tag}
                    </span>
                  )}
                  <img src={p.img} alt={p.name} className="card-img-top"/>
                </div>
  
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="mb-3">
                    {p.old && <span className="text-muted text-decoration-line-through me-2">{p.old}</span>}
                    <span className="text-warning">{p.price}</span>
                  </p>
                  <button className="btn btn-dark mt-auto">Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  