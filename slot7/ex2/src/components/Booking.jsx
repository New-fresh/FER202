export default function Booking() {
    return (
      <section id="booking" className="my-5">
        <h2 className="text-white-50 display-6 mb-4 text-center">Book Your Table</h2>
  
        <form className="row g-3">
          <div className="col-md-4">
            <input className="form-control" placeholder="Your Name *" />
          </div>
          <div className="col-md-4">
            <input type="email" className="form-control" placeholder="Your Email *" />
          </div>
          <div className="col-md-4">
            <select className="form-select">
              <option defaultValue="">Select a Service</option>
              <option>Dine In</option>
              <option>Take Away</option>
              <option>Birthday Party</option>
            </select>
          </div>
  
          <div className="col-12">
            <textarea className="form-control" rows="5" placeholder="Please write your comment"></textarea>
          </div>
  
          <div className="col-12">
            <button className="btn btn-warning px-4">Send Message</button>
          </div>
        </form>
      </section>
    );
  }
  