import { Routes, Route } from "react-router-dom";

import DoctorSignup from "../pages/auth/DoctorSignup";
import PatientSignup from "../pages/auth/PatientSignup";
import Login from "../pages/auth/Login";
import DoctorList from "../pages/patient/DoctorList";
import ConsultationForm from "../pages/patient/ConsultationForm";
import Home from "../pages/Home";
import DoctorDashboard from "../pages/doctor/doctorDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor/signup" element={<DoctorSignup />} />
      <Route path="/patient/signup" element={<PatientSignup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctors" element={<DoctorList />} />
      <Route path="/consult/:doctorId" element={<ConsultationForm />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      {/* <Route path="/doctor/prescriptions" element={<PrescriptionPage />} /> */}
    </Routes>
  );
}
