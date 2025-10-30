import React from 'react';
import { Alert, Button, Image, Modal, Spinner, Table } from 'react-bootstrap';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, genres, loading, movieToDelete, showDeleteModal } = state;

  const genreMap = genres.reduce((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  const handleEditClick = (m) => dispatch({ type: 'OPEN_EDIT_MODAL', payload: m });
  const handleDeleteClick = (m) => dispatch({ type: 'OPEN_DELETE_MODAL', payload: m });

  if (loading && movies.length === 0) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" className="me-2" />
        <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Poster</th>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Year</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>
                <Image
                  src={m.poster}
                  alt={m.title}
                  style={{ width: 48, height: 48, objectFit: 'cover' }}
                  rounded
                />
              </td>
              <td>#{m.id}</td>
              <td>{m.title}</td>
              <td>{genreMap[m.genreId] || 'Unknown'}</td>
              <td>{m.duration}</td>
              <td>{m.year}</td>
              <td>{m.country}</td>
              <td>
                <Button size="sm" className="me-2" onClick={() => handleEditClick(m)}>Sửa</Button>
                <Button size="sm" variant="danger" onClick={() => handleDeleteClick(m)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton><Modal.Title>Xác nhận Xóa Phim</Modal.Title></Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa phim "<strong>{movieToDelete?.title}</strong>" (ID: {movieToDelete?.id})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>Hủy</Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
