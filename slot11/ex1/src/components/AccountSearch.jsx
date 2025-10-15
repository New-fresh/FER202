import { useMemo, useState } from "react";
import { Badge, Card, Col, Form, Row } from "react-bootstrap";

// Demo data – bạn có thể thay bằng dữ liệu thực tế
const accounts = [
  { id: 1, username: "qnc.dev", password: "****", avatar: "/images/movie1.jpg" },
  { id: 2, username: "john_smith", password: "****", avatar: "/images/movie2.jpg" },
  { id: 3, username: "maria.lee", password: "****", avatar: "/images/movie3.jpg" },
  { id: 4, username: "thanhnguyen", password: "****", avatar: "/images/movie4.jpg" },
];

 function AccountSearch() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return accounts;
    return accounts.filter(a => a.username.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="container my-4" style={{ maxWidth: 980 }}>
      <h3 className="mb-3">🔎 Tìm kiếm Account theo Username</h3>

      <Form className="mb-3" onSubmit={e => e.preventDefault()}>
        <Form.Label className="fw-semibold">Username</Form.Label>
        <Form.Control
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Nhập username cần tìm…"
        />
      </Form>

      {filtered.length === 0 ? (
        <p className="text-center text-muted py-4">Không tìm thấy kết quả</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filtered.map(acc => (
            <Col key={acc.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={acc.avatar}
                  alt={acc.username}
                  style={{ height: 220, objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="d-flex align-items-center justify-content-between">
                    <span>@{acc.username}</span>
                    <Badge bg="secondary">ID {acc.id}</Badge>
                  </Card.Title>
                  <Card.Text className="text-muted mb-0">
                    <strong>Password:</strong> {acc.password}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default AccountSearch;