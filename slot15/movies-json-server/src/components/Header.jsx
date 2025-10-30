import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';

const Header = () => {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3 border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/movies">🎬 Movies</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="align-items-center">
            {user ? (
              <>
                <span className="me-3">👤 {user.fullName} ({user.role})</span>
                <Button size="sm" variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button size="sm" as={Link} to="/login" variant="primary">Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
