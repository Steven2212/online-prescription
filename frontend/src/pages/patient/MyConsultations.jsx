import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function MyConsultations() {
  const [consultations, setConsultations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await API.get(`/api/consultations/patient/${user._id}`);
        setConsultations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchConsultations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Consultations</h1>

      {consultations.length === 0 ? (
        <p>No consultations found</p>
      ) : (
        <div className="grid gap-4">
          {consultations.map((c) => (
            <div
              key={c._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  Dr. {c.doctorId?.name}
                </h2>
                <p className="text-gray-600">Illness: {c.currentIllness}</p>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    c.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {c.status}
                </span>

                {c.status === "Completed" && (
                  <button
                    onClick={() =>
                      navigate(`/doctor/prescription/view/${c._id}`)
                    }
                    className="block mt-2 text-blue-600"
                  >
                    View Prescription
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
