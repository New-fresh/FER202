import { useState } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import AboutForm from "../components/account/AboutForm";
import AccountForm from "../components/account/AccountForm";
import AddressForm from "../components/account/AddressForm";

export default function AccountPage() {
  const [step, setStep] = useState(1);     // 1..3
  const [showInvalid] = useState(true);    // chỉ để hiển thị viền đỏ theo yêu cầu UI

  const percent = step === 1 ? 33 : step === 2 ? 67 : 100;

  return (
    <div className="container my-4" style={{maxWidth: 900}}>
      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <h4 className="mb-2">Build Your Profile</h4>
          <ProgressBar now={percent} label={`${percent}%`} />
        </Card.Header>

        <Card.Body>
          {step === 1 && (
            <>
              <h5 className="mb-3"><i className="bi bi-person-circle me-2" />About</h5>
              <AboutForm showInvalid={showInvalid} />
              <div className="d-flex justify-content-between mt-3">
                <Button variant="outline-secondary" disabled>Previous</Button>
                <Button onClick={()=>setStep(2)}>Next</Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h5 className="mb-3"><i className="bi bi-lock me-2" />Account</h5>
              <AccountForm showInvalid={showInvalid} />
              <div className="d-flex justify-content-between mt-3">
                <Button variant="outline-secondary" onClick={()=>setStep(1)}>Previous</Button>
                <Button onClick={()=>setStep(3)}>Next</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h5 className="mb-3"><i className="bi bi-geo-alt me-2" />Address</h5>
              <AddressForm
                showInvalid={showInvalid}
                onPrev={()=>setStep(2)}
                onFinish={()=>alert("Finished! (UI demo)")}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
