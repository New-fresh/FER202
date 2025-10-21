import { useEffect, useMemo, useReducer, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Toast } from "react-bootstrap";

const reUsername = /^(?=.{3,}$)[A-Za-z0-9._]+$/;
const reEmail = /^\S+@\S+\.\S+$/;
const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm: "",
  touched: {},
  errors: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "FIELD": {
      const { name, value } = action;
      return { ...state, [name]: value };
    }
    case "TOUCHED":
      return { ...state, touched: { ...state.touched, [action.name]: true } };
    case "RESET":
      return { ...initialState };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const { username, email, password, confirm, touched, errors } = state;

  const validate = useMemo(() => {
    const e = {};
    const u = username.trim();
    if (!u) e.username = "Username is required";
    else if (!reUsername.test(u)) e.username = "Username ≥3, chỉ chữ/số/._";

    const em = email.trim();
    if (!em) e.email = "Email is required";
    else if (!reEmail.test(em)) e.email = "Invalid email format";

    if (!password) e.password = "Password is required";
    else if (!rePassword.test(password)) e.password = "≥8, có hoa, thường, số, ký tự đặc biệt";

    if (!confirm) e.confirm = "Confirm password is required";
    else if (confirm !== password) e.confirm = "Passwords do not match";
    return e;
  }, [username, email, password, confirm]);

  const isValid = useMemo(() => Object.keys(validate).length === 0, [validate]);

  
  useEffect(() => {
    const partial = {};
    for (const k in validate) if (touched[k]) partial[k] = validate[k];
    dispatch({ type: "SET_ERRORS", errors: partial });
  }, [validate, touched]);

  const onChange = (e) => dispatch({ type: "FIELD", name: e.target.name, value: e.target.value });
  const onBlur = (e) => dispatch({ type: "TOUCHED", name: e.target.name });

  const onCancel = () => {
    dispatch({ type: "RESET" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    dispatch({ type: "TOUCHED", name: "username" });
    dispatch({ type: "TOUCHED", name: "email" });
    dispatch({ type: "TOUCHED", name: "password" });
    dispatch({ type: "TOUCHED", name: "confirm" });

    if (!isValid) return;

    
    setSubmitted({ username: username.trim(), email: email.trim() });
    setShowToast(true);
    setShowModal(true);

    
    dispatch({ type: "RESET" });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white"><h4 className="mb-0">Đăng ký tài khoản</h4></Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit} noValidate>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    value={username}
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={!!errors.username}
                    placeholder="vd: qnc.dev"
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={!!errors.email}
                    placeholder="you@example.com"
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        onBlur={onBlur}
                        isInvalid={!!errors.password}
                        placeholder="••••••••"
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="confirm">
                      <Form.Label>Confirm password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirm"
                        value={confirm}
                        onChange={onChange}
                        onBlur={onBlur}
                        isInvalid={!!errors.confirm}
                        placeholder="••••••••"
                      />
                      <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="outline-secondary" type="button" onClick={onCancel}>Cancel</Button>
                  <Button variant="success" type="submit" disabled={!isValid}>Submit</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body className="bg-success text-white">✅ Submitted successfully!</Toast.Body>
      </Toast>

      
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Đăng ký thành công</Modal.Title></Modal.Header>
        <Modal.Body>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Thông tin đã submit</h5>
              <p className="mb-1"><strong>Username:</strong> {submitted?.username}</p>
              <p className="mb-1"><strong>Email:</strong> {submitted?.email}</p>
              <p className="text-muted mb-0">Mật khẩu đã được lưu .</p>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
