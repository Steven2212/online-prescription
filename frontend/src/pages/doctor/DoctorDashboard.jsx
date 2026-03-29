import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const [consultations, setConsultations] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return; // 🚨 wait until user is ready

    const fetchData = async () => {
      try {
        const res = await API.get(`/api/consultations/doctor/${user._id}`);
        setConsultations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Consultations</h1>

      {consultations.length === 0 ? (
        <p>No consultations found</p>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-lg shadow flex justify-between"
            >
              {/* LEFT SIDE */}
              <div className="space-y-1">
                <p>
                  <b>Patient:</b> {c.patientId?.name}
                </p>
                <p>
                  <b>Illness:</b> {c.currentIllness}
                </p>
                <p>
                  <b>Surgery:</b> {c.recentSurgery}
                </p>
                <p>
                  <b>Diabetic:</b> {c.isDiabetic}
                </p>
                <p>
                  <b>Allergies:</b> {c.allergies}
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                <p
                  className={`mb-2 font-semibold ${
                    c.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {c.status}
                </p>

                <button
                  onClick={() =>
                    c.status === "Completed"
                      ? navigate(`/doctor/prescription/view/${c._id}`)
                      : navigate(`/doctor/prescription/${c._id}`)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {c.status === "Completed"
                    ? "View Prescription"
                    : "Write Prescription"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
