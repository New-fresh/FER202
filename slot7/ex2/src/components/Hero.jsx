export default function Hero() {
    return (
      <header
        className="text-white d-flex align-items-center"
        style={{
          minHeight: 360,
          background: `url(/images/pizza1.jpg) center/cover no-repeat`,
        }}
      >
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Neapolitan Pizza</h1>
          <p className="lead mb-0">
            If you are looking for a traditional Italian pizza, the Neapolitan is the best option!
          </p>
        </div>
      </header>
    );
  }
  