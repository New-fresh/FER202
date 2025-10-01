export default function StudentCard({ id, name, img }) {
    return (
      <div className="card text-center">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <p><strong>{id}</strong></p>
          <p>{name}</p>
          <div className="mb-2">
            <input type="radio" name={id} /> Absent{" "}
            <input type="radio" name={id} /> Present
          </div>
          <button className="btn btn-warning">Submit</button>
        </div>
      </div>
    );
  }
  