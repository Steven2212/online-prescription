import { useState } from "react";
import API from "../../api/axios";

export default function PrescriptionForm({ consultationId }) {
  const [form, setForm] = useState({});

  const submit = async () => {
    await API.post("/api/prescriptions", {
      ...form,
      consultationId
    });
    alert("Prescription Created");
  };

  return (
    <div>
      <textarea
        placeholder="Care to be taken"
        onChange={(e) => setForm({ ...form, care: e.target.value })}
      />
      <textarea
        placeholder="Medicines"
        onChange={(e) => setForm({ ...form, medicines: e.target.value })}
      />

      <button onClick={submit}>Generate PDF</button>
    </div>
  );
}