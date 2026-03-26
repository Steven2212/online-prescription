import { useState } from "react";
import API from "../../api/axios";
import { useParams } from "react-router-dom";

export default function ConsultationForm() {
  const { doctorId } = useParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await API.post("/consultations", {
      ...form,
      doctorId
    });
    alert("Consultation Submitted");
  };

  return (
    <div className="p-5">
      {step === 1 && (
        <>
          <input name="illness" onChange={handleChange} placeholder="Illness" />
          <input name="surgery" onChange={handleChange} placeholder="Surgery" />
        </>
      )}

      {step === 2 && (
        <>
          <label>Diabetic?</label>
          <input type="radio" name="diabetic" value="yes" onChange={handleChange} />
          <input type="radio" name="diabetic" value="no" onChange={handleChange} />

          <input name="allergies" placeholder="Allergies" onChange={handleChange} />
        </>
      )}

      {step === 3 && (
        <>
          <p>Scan QR to Pay</p>
          <input name="transactionId" onChange={handleChange} placeholder="Transaction ID" />
        </>
      )}

      <div className="mt-4">
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)}>Next</button>
        ) : (
          <button onClick={submit}>Submit</button>
        )}
      </div>
    </div>
  );
}