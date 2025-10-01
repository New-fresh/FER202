export default function GridDemo() {
    return (
      <div className="container my-4" style={{ maxWidth: '92%' }}>
        
        <div className="row g-0 mb-3">
          <div className="col-md-6"><div className="tile">First col</div></div>
          <div className="col-md-6"><div className="tile">Second col</div></div>
        </div>
  
        
        <div className="row g-0 mb-3">
          <div className="col-md-4"><div className="tile">col</div></div>
          <div className="col-md-4"><div className="tile">col</div></div>
          <div className="col-md-4"><div className="tile">col</div></div>
        </div>
  
        
        <div className="row g-0">
          <div className="col-md-3"><div className="tile">col</div></div>
          <div className="col-md-3"><div className="tile">col</div></div>
          <div className="col-md-3"><div className="tile">col</div></div>
          <div className="col-md-3"><div className="tile">col</div></div>
        </div>
      </div>
    );
  }
  