export default function StudentCard({ id, name, adress, img }) {
  return (
    <div className="card text-center">
      {/* Ảnh sinh viên */}
      <img src={img} className="card-img-top" alt={name} />

      <div className="card-body">
        {/* ID */}
        <p><strong>{id}</strong></p>

        
        <div className="row mb-2">
          <div className="col-6 text-start">{name}</div>
          <div className="col-6 text-end">{adress}</div>
        </div>

        
        <div className="row mb-3">
          <div className="col-6 text-start">
            <input type="radio" name={id} /> Absent
          </div>
          <div className="col-6 text-end">
            <input type="radio" name={id} /> Present
          </div>
        </div>

        
        <button className="btn btn-warning">Submit</button>
      </div>
    </div>
  );
}
