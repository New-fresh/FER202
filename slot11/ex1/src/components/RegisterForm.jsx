import { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Toast } from "react-bootstrap";


const reUsername = /^(?=.{3,}$)[A-Za-z0-9._]+$/; 
const reEmail = /^\S+@\S+\.\S+$/;
const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/; 
function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  
  const validate = useMemo(() => {
    const e = {};

    const u = form.username.trim();
    if (!u) e.username = "Username is required";
    else if (!reUsername.test(u)) {
      e.username = "Username ≥ 3, chỉ chữ/số/._";
    }

    const em = form.email.trim();
    if (!em) e.email = "Email is required";
    else if (!reEmail.test(em)) e.email = "Invalid email format";

    if (!form.password) e.password = "Password is required";
    else if (!rePassword.test(form.password)) {
      e.password = "≥8, có hoa, thường, số, ký tự đặc biệt";
    }

    if (!form.confirm) e.confirm = "Confirm password is required";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";

    return e;
  }, [form]);

  
  const isValid = useMemo(() => Object.keys(validate).length === 0, [validate]);

  
  const onChange = (field) => (e) => {
    const v = e.target.value;
    setForm((p) => ({ ...p, [field]: v }));
  };
  const onBlur = (field) => () => setTouched((p) => ({ ...p, [field]: true }));

  
  useEffect(() => {
    
    const next = {};
    for (const k in validate) {
      if (touched[k]) next[k] = validate[k];
    }
    setErrors(next);
  }, [validate, touched]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    setTouched({ username: true, email: true, password: true, confirm: true });

    if (!isValid) return;

    
    setShowToast(true);
    setShowModal(true);
  };

  const onCancel = () => {
    setForm({ username: "", email: "", password: "", confirm: "" });
    setErrors({});
    setTouched({});
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h4 className="mb-0">Đăng ký tài khoản</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit} noValidate>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={form.username}
                    onChange={onChange("username")}
                    onBlur={onBlur("username")}
                    isInvalid={!!errors.username}
                    placeholder="vd: qnc.dev"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                    onBlur={onBlur("email")}
                    isInvalid={!!errors.email}
                    placeholder="you@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={form.password}
                        onChange={onChange("password")}
                        onBlur={onBlur("password")}
                        isInvalid={!!errors.password}
                        placeholder="••••••••"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="confirm">
                      <Form.Label>Confirm password</Form.Label>
                      <Form.Control
                        type="password"
                        value={form.confirm}
                        onChange={onChange("confirm")}
                        onBlur={onBlur("confirm")}
                        isInvalid={!!errors.confirm}
                        placeholder="••••••••"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirm}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="outline-secondary" type="button" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button variant="success" type="submit" disabled={!isValid}>
                    Submit
                  </Button>
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
        <Toast.Body className="bg-success text-white">
          ✅ Submitted successfully!
        </Toast.Body>
      </Toast>

      
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Thông tin đã submit</h5>
              <p className="mb-1"><strong>Username:</strong> {form.username.trim()}</p>
              <p className="mb-1"><strong>Email:</strong> {form.email.trim()}</p>
              
              <p className="text-muted mb-0">Mật khẩu đã được lưu trữ an toàn .</p>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
