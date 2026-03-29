import { useEffect, useState } from "react";
import API from "../../api/axios";
import DoctorCard from "../../components/DoctorCard";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("/api/doctors").then((res) => setDoctors(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} />
        ))}
      </div>
    </div>
  );
}