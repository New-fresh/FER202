import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddFavourite = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favourites.some(fav => fav.id === movie.id)) {
      favourites.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    setShowToast(true);
  };

  return (
    <>
      <Card className="h-100 shadow-sm movie-card">
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="text-truncate-3">{movie.description}</Card.Text>

          <div className="mb-2 small text-muted">
            <span>{movie.year} • {movie.country}</span><br />
            <span>⏱ {movie.duration} mins</span>
          </div>

          <Badge bg="info" text="dark" className="mb-2">{movie.genre}</Badge>

          <div className="mt-auto d-flex justify-content-between">
            <Button variant="dark" onClick={() => setShowModal(true)}>View Details</Button>
            <Button variant="outline-warning" onClick={handleAddFavourite}>
              Add to Favourites
            </Button>
          </div>
        </Card.Body>
      </Card>

      
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body className="bg-success text-white">
          ✅ Added to favourites!
        </Toast.Body>
      </Toast>

      
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={movie.poster} alt={movie.title} className="img-fluid rounded mb-3" />
          <p>{movie.description}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Country:</strong> {movie.country}</p>
          <p><strong>Duration:</strong> {movie.duration} mins</p>
        </Modal.Body>
      </Modal>
    </>
  );
}
