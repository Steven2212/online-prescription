import { useNavigate } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div className="border p-4">
      <img src={doctor.profileImage} className="h-32" />
      <h2>{doctor.name}</h2>
      <p>{doctor.speciality}</p>

      <button
        onClick={() => navigate(`/consult/${doctor._id}`)}
        className="bg-green-500 text-white p-2"
      >
        Consult
      </button>
    </div>
  );
}