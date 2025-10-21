import { useReducer } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";

const initialState = {
  username: "",
  password: "",
  errors: {},
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "FIELD": {
      const { name, value } = action;
      const errors = { ...state.errors };
      if (value.trim() === "") errors[name] = `${name[0].toUpperCase()+name.slice(1)} is required`;
      else delete errors[name];
      return { ...state, [name]: value, errors };
    }
    case "SUBMIT": {
      const errors = {};
      if (!state.username.trim()) errors.username = "Username is required";
      if (!state.password.trim()) errors.password = "Password is required";
      return Object.keys(errors).length ? { ...state, errors } : { ...state, errors, showModal: true };
    }
    case "CLOSE_MODAL":
      return { ...initialState };
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, errors, showModal } = state;

  const handleChange = (e) =>
    dispatch({ type: "FIELD", name: e.target.name, value: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header><h3 className="text-center">Login</h3></Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    value={username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100">Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => dispatch({ type: "CLOSE_MODAL" })} centered>
        <Modal.Header closeButton><Modal.Title>Login Successful</Modal.Title></Modal.Header>
        <Modal.Body><p>Welcome, {username}!</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
