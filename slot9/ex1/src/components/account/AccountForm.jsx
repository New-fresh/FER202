import { Form, InputGroup } from "react-bootstrap";

export default function AccountForm({ values, errors = {}, onChange }) {
  return (
    <Form className="vstack gap-3">
      <Form.Group>
        <Form.Label>Username *</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
          <Form.Control
            value={values.username}
            onChange={onChange("username")}
            isInvalid={!!errors.username}
            placeholder="username"
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password *</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-lock" /></InputGroup.Text>
          <Form.Control
            type="password"
            value={values.password}
            onChange={onChange("password")}
            isInvalid={!!errors.password}
            placeholder="••••••"
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Confirm Password *</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text><i className="bi bi-lock" /></InputGroup.Text>
          <Form.Control
            type="password"
            value={values.confirmPassword}
            onChange={onChange("confirmPassword")}
            isInvalid={!!errors.confirmPassword}
            placeholder="••••••"
          />
          <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Secret Question *</Form.Label>
        <Form.Control
          value={values.secretQuestion}
          onChange={onChange("secretQuestion")}
          isInvalid={!!errors.secretQuestion}
          placeholder="Your first pet?"
        />
        <Form.Control.Feedback type="invalid">{errors.secretQuestion}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Answer *</Form.Label>
        <Form.Control
          value={values.answer}
          onChange={onChange("answer")}
          isInvalid={!!errors.answer}
          placeholder="Answer"
        />
        <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
