import { useMemo, useState } from "react";
import { Button, Modal, Nav, ProgressBar } from "react-bootstrap";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";

export default function ModalAccount({ show, onHide }) {
  const [step, setStep] = useState(1);
  // ✅ thêm errors
  const [errors, setErrors] = useState({});
  // giữ state form như bạn đang có:
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", age: "", avatar: null,
    username: "", password: "", confirmPassword: "", secretQuestion: "", answer: "",
    street: "", city: "", state: "", zip: "", country: "",
  });

  const avatarPreview = useMemo(
    () => form.avatar ? URL.createObjectURL(form.avatar) : null,
    [form.avatar]
  );

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: undefined })); 
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, avatar: file }));
  };


  const validateAbout = () => {
    const err = {};
    if (!form.firstName.trim()) err.firstName = "First name is required";
    if (!form.lastName.trim())  err.lastName  = "Last name is required";
    if (!form.email.trim())     err.email     = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Invalid email format";
    if (!form.phone.trim())     err.phone     = "Phone is required";
    if (form.age === "" || form.age === null) err.age = "Age is required";
    return err;
  };
  const validateAccount = () => {
    const err = {};
    if (!form.username.trim())        err.username        = "Username is required";
    if (!form.password)               err.password        = "Password is required";
    if (!form.confirmPassword)        err.confirmPassword = "Confirm password is required";
    else if (form.confirmPassword !== form.password) err.confirmPassword = "Passwords do not match";
    if (!form.secretQuestion.trim())  err.secretQuestion  = "Secret question is required";
    if (!form.answer.trim())          err.answer          = "Answer is required";
    return err;
  };
  const validateAddress = () => {
    const err = {};
    if (!form.street.trim())  err.street  = "Street is required";
    if (!form.city.trim())    err.city    = "City is required";
    if (!form.state.trim())   err.state   = "State is required";
    if (!form.zip.trim())     err.zip     = "Zip code is required";
    if (!form.country.trim()) err.country = "Country is required";
    return err;
  };

  const onNext = () => {
    const err = step === 1 ? validateAbout() : validateAccount();
    if (Object.keys(err).length) { setErrors(err); return; }
    setErrors({});
    setStep(step + 1);
  };
  const onPrev = () => setStep(step - 1);
  const onFinish = () => {
    const err = validateAddress();
    if (Object.keys(err).length) { setErrors(err); return; }
    setErrors({});
    alert("Finished! (UI demo)");
  };

  const percent = step === 1 ? 33 : step === 2 ? 67 : 100;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton><Modal.Title>Build Your Profile</Modal.Title></Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <ProgressBar now={percent} label={`${percent}%`} className="mb-3" />

        <Nav variant="tabs" activeKey={step} className="mb-3">
          <Nav.Item><Nav.Link eventKey={1} onClick={()=>setStep(1)}><i className="bi bi-person-circle me-2" />About</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey={2} onClick={()=>setStep(2)}><i className="bi bi-lock me-2" />Account</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey={3} onClick={()=>setStep(3)}><i className="bi bi-geo-alt me-2" />Address</Nav.Link></Nav.Item>
        </Nav>

        {step === 1 && (
          <>
            <h5 className="mb-3 text-primary fw-semibold"><i className="bi bi-person-circle me-2" />About Information</h5>
            <AboutForm
              values={form}
              errors={errors}
              onChange={handleChange}
              onFileChange={handleFileChange}
              avatarPreview={avatarPreview}
            />
            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-secondary" disabled>Previous</Button>
              <Button onClick={onNext}>Next</Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h5 className="mb-3 text-primary fw-semibold"><i className="bi bi-lock me-2" />Account Information</h5>
            <AccountForm values={form} errors={errors} onChange={handleChange} />
            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-secondary" onClick={onPrev}>Previous</Button>
              <Button onClick={onNext}>Next</Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h5 className="mb-3 text-primary fw-semibold"><i className="bi bi-geo-alt me-2" />Address Information</h5>
            <AddressForm values={form} errors={errors} onChange={handleChange} onPrev={onPrev} onFinish={onFinish} />
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
