import { Button, Form } from "react-bootstrap";

export default function AddressForm({ values, errors = {}, onChange, onPrev, onFinish }) {
  return (
    <>
      <Form className="vstack gap-3 mb-3">
        <Form.Group>
          <Form.Label>Street *</Form.Label>
          <Form.Control
            value={values.street}
            onChange={onChange("street")}
            isInvalid={!!errors.street}
            placeholder="123 Main St"
          />
          <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>City *</Form.Label>
          <Form.Control
            value={values.city}
            onChange={onChange("city")}
            isInvalid={!!errors.city}
            placeholder="City"
          />
          <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>State *</Form.Label>
          <Form.Control
            value={values.state}
            onChange={onChange("state")}
            isInvalid={!!errors.state}
            placeholder="State"
          />
          <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Zip Code *</Form.Label>
          <Form.Control
            value={values.zip}
            onChange={onChange("zip")}
            isInvalid={!!errors.zip}
            placeholder="700000"
          />
          <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Country *</Form.Label>
          <Form.Select
            value={values.country}
            onChange={onChange("country")}
            isInvalid={!!errors.country}
          >
            <option value="" disabled>Select a country</option>
            <option>Viet Nam</option>
            <option>USA</option>
            <option>Japan</option>
            <option>France</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={onPrev}>Previous</Button>
        <Button variant="success" onClick={onFinish}>Finish</Button>
      </div>
    </>
  );
}
