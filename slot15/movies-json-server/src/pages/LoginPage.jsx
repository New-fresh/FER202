import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useAuthDispatch();
  const { user, loading, error } = useAuthState();
  const nav = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  if (user) return <Navigate to="/movies" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.username.trim(), form.password);
    if (res.ok) nav('/movies', { replace: true });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="p-3 shadow-sm">
            <h3 className="text-center mb-3">Đăng nhập</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" value={form.username} onChange={onChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={form.password} onChange={onChange} required />
              </Form.Group>
              <Button type="submit" className="w-100" disabled={loading}>
                {loading ? 'Đang đăng nhập…' : 'Login'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
