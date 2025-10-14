import { Card, Col, Form, Row } from "react-bootstrap";


export default function Filter({
  search, setSearch,
  yearRange, setYearRange,
  sort, setSort,
  suggestions = []
}) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className="g-3">
          
          <Col xs={12} md={6} lg={4}>
            <Form.Label className="fw-semibold">Search</Form.Label>
            <Form.Control
              list="movie-suggestions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or description…"
            />
            <datalist id="movie-suggestions">
              {suggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </Col>

          
          <Col xs={12} md={6} lg={4}>
            <Form.Label className="fw-semibold">Filter (Year)</Form.Label>
            <Form.Select
              value={yearRange}
              onChange={(e) => setYearRange(e.target.value)}
            >
              <option value="all">All years</option>
              <option value="<=2000">≤ 2000</option>
              <option value="2001-2015">2001 – 2015</option>
              <option value=">2015">&gt; 2015</option>
            </Form.Select>
          </Col>

          
          <Col xs={12} md={12} lg={4}>
            <Form.Label className="fw-semibold">Sorting</Form.Label>
            <Form.Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="yearDesc">Year ↓</option>
              <option value="yearAsc">Year ↑</option>
              <option value="titleAsc">Title A → Z</option>
              <option value="titleDesc">Title Z → A</option>
              <option value="durAsc">Duration ↑</option>
              <option value="durDesc">Duration ↓</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
