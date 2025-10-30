import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

const MovieFields = ({
  currentMovie,
  handleInputChange,
  handleFileChange,
  imagePreview,
  genres,
  errors = {},
  validated = false
}) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formPoster">
          <Form.Label>Poster</Form.Label>
          <Form.Control type="file" name="posterFile" accept="image/*" onChange={handleFileChange} className="mb-2" />
          <Form.Control
            type="text"
            name="poster"
            value={currentMovie.poster || ''}
            onChange={handleInputChange}
            placeholder="Hoặc nhập URL hình ảnh"
            isInvalid={validated && errors.poster}
          />
          <Form.Control.Feedback type="invalid">{errors.poster}</Form.Control.Feedback>
          {imagePreview && (
            <div className="mt-2">
              <Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: 200, maxHeight: 150 }} />
            </div>
          )}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-2" controlId="formTitle">
          <Form.Label>Title *</Form.Label>
          <Form.Control
            name="title"
            value={currentMovie.title || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={12}>
        <Form.Group controlId="formDescription">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={currentMovie.description || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formGenre">
          <Form.Label>Genre *</Form.Label>
          <Form.Select
            name="genreId"
            value={currentMovie.genreId || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.genreId}
          >
            <option value="">Chọn thể loại</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.genreId}</Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>Duration (min) *</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={currentMovie.duration || ''}
            onChange={handleInputChange}
            required
            min="1"
            max="600"
            isInvalid={validated && errors.duration}
          />
          <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col md={2}>
        <Form.Group controlId="formYear">
          <Form.Label>Year *</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={currentMovie.year || ''}
            onChange={handleInputChange}
            required
            min="1900"
            max="2030"
            isInvalid={validated && errors.year}
          />
          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col md={2}>
        <Form.Group controlId="formCountry">
          <Form.Label>Country *</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={currentMovie.country || ''}
            onChange={handleInputChange}
            placeholder="Quốc gia"
            required
            isInvalid={validated && errors.country}
          />
          <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal, genres } = state;

  const [imagePreview, setImagePreview] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        dispatch({ type: 'UPDATE_FIELD', payload: { name: 'poster', value: imageUrl } });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentMovie.title?.trim()) newErrors.title = 'Title is required';
    if (!currentMovie.description?.trim()) newErrors.description = 'Description is required';
    if (!currentMovie.genreId) newErrors.genreId = 'Genre is required';
    if (!currentMovie.duration) newErrors.duration = 'Duration is required';
    if (!currentMovie.year) newErrors.year = 'Year is required';
    if (!currentMovie.country?.trim()) newErrors.country = 'Country is required';
    if (!currentMovie.poster?.trim()) newErrors.poster = 'Poster is required (file or URL)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);
    if (!validateForm()) return;

    const dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration || 0, 10),
      year: parseInt(currentMovie.year || 0, 10),
      genreId: parseInt(currentMovie.genreId || 0, 10)
    };

    const success = await handleCreateOrUpdate(dataToSend, isEditing !== null, isEditing);

    if (success) {
      if (isEditing === null) {
        setImagePreview('');
        setValidated(false);
        setErrors({});
      } else {
        handleCloseEditModal();
      }
    }
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
    setImagePreview('');
    setValidated(false);
    setErrors({});
  };

  const isCreating = isEditing === null;
  const createFormProps = {
    currentMovie: isCreating ? currentMovie : initialMovieState.currentMovie,
    handleInputChange: isCreating ? handleInputChange : () => {},
    handleFileChange: isCreating ? handleFileChange : () => {},
    imagePreview: isCreating ? imagePreview : currentMovie.poster,
    genres,
    errors: isCreating ? errors : {},
    validated: isCreating ? validated : false
  };

  return (
    <>
      <Container className="p-3 mb-4 border rounded-3">
        <h3 className="mb-3">📽️ Thêm Phim Mới</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <MovieFields {...createFormProps} />
          <div className="d-flex gap-2 mt-3">
            <Button variant="success" type="submit">➕ Thêm Phim</Button>
          </div>
        </Form>
      </Container>

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <MovieFields
              currentMovie={currentMovie}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              imagePreview={currentMovie.poster}
              genres={genres}
              errors={errors}
              validated={validated}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>Hủy</Button>
            <Button variant="warning" type="submit">Lưu Thay Đổi</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
