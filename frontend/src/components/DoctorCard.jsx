import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isPatient = user?.role === "patient";

  return (
    <div className="bg-white border rounded-xl shadow hover:shadow-md transition p-4 w-full max-w-xs">

      {/* 🔹 Image */}
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <img
          src={doctor.profileImage || "https://via.placeholder.com/300"}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔹 Info */}
      <div className="mt-3">
        <h2 className="font-semibold text-lg">{doctor.name}</h2>
        <p className="text-gray-500 text-sm">{doctor.speciality}</p>
      </div>

      {/* 🔹 Button */}
      <button
        disabled={!isPatient}
        onClick={() => {
          if (!user) return navigate("/login");
          if (user.role !== "patient") return;

          navigate(`/consult/${doctor._id}`);
        }}
        className={`mt-4 w-full py-2 rounded-lg text-white text-sm font-medium transition ${
          isPatient
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Consult
      </button>

      {/* 🔹 Messages */}
      {!user && (
        <p className="text-xs text-red-500 mt-2 text-center">
          Login as patient to consult
        </p>
      )}

      {user?.role === "doctor" && (
        <p className="text-xs text-yellow-600 mt-2 text-center">
          Doctors cannot book consultations
        </p>
      )}
    </div>
  );
}