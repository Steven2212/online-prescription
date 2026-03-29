import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function DoctorDashboard() {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    API.get("/api/consultations/doctor").then((res) =>
      setConsultations(res.data)
    );
  }, []);

  return (
    <div>
      <h1>Consultations</h1>

      {consultations.map((c) => (
        <div key={c._id} className="border p-3">
          <p>{c.patientName}</p>
          <button>Write Prescription</button>
        </div>
      ))}
    </div>
  );
}