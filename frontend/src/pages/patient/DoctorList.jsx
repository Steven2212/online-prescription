import { useEffect, useState } from "react";
import API from "../../api/axios";
import DoctorCard from "../../components/DoctorCard";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("/api/doctors").then((res) => setDoctors(res.data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {doctors.map((doc) => (
        <DoctorCard key={doc._id} doctor={doc} />
      ))}
    </div>
  );
}