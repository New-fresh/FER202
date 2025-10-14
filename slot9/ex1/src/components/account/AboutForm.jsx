import { Form, InputGroup } from "react-bootstrap";

export default function AboutForm({ values, errors = {}, onChange, onFileChange, avatarPreview }) {
  return (
    <Form className="vstack gap-3">
      <Form.Group>
        <Form.Label>First Name *</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
          <Form.Control
            value={values.firstName}
            onChange={onChange("firstName")}
            isInvalid={!!errors.firstName}
            placeholder="First name"
          />
          <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Last Name *</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
          <Form.Control
            value={values.lastName}
            onChange={onChange("lastName")}
            isInvalid={!!errors.lastName}
            placeholder="Last name"
          />
          <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Email *</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-envelope" /></InputGroup.Text>
          <Form.Control
            type="email"
            value={values.email}
            onChange={onChange("email")}
            isInvalid={!!errors.email}
            placeholder="you@example.com"
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone *</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-telephone" /></InputGroup.Text>
          <Form.Control
            value={values.phone}
            onChange={onChange("phone")}
            isInvalid={!!errors.phone}
            placeholder="(+84) 123 456 789"
          />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Age *</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-123" /></InputGroup.Text>
          <Form.Control
            type="number"
            value={values.age}
            onChange={onChange("age")}
            isInvalid={!!errors.age}
            placeholder="18"
          />
          <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" onChange={onFileChange} />
        {values.avatar && <small className="text-muted d-block mt-1">Selected: {values.avatar.name}</small>}
        {avatarPreview && <img src={avatarPreview} alt="Preview" className="mt-2 rounded" style={{ maxHeight: 120 }} />}
      </Form.Group>
    </Form>
  );
}
