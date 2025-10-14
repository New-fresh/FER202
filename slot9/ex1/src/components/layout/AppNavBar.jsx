import { useState } from "react";
import { Button, Container, Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import ModalAccount from "../account/ModalAccount";

export default function AppNavBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">🎬 Movie House</Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>

            <Form
              className="d-flex ms-auto me-3"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Control
                type="search"
                placeholder="Quick search..."
                className="me-2"
              />
              <Button variant="outline-warning">Search</Button>
            </Form>

            <Nav className="align-items-center gap-2">
              <i className="bi bi-person-circle fs-5 text-light" title="Account" />
              <i className="bi bi-box-arrow-in-right fs-5 text-light" title="Login" />
              <i className="bi bi-heart fs-5 text-light" title="Favourites" />

              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" size="sm">
                  Accounts
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setShowModal(true)}>
                    Build Your Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="/account">Manage Your Profiles</Dropdown.Item>
                  <Dropdown.Item href="/account">Change Password</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      <ModalAccount show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}
