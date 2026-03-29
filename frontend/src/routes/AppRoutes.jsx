import { Routes, Route } from "react-router-dom";

import DoctorSignup from "../pages/auth/DoctorSignup";
import PatientSignup from "../pages/auth/PatientSignup";
import Login from "../pages/auth/Login";
import DoctorList from "../pages/patient/DoctorList";
import ConsultationForm from "../pages/patient/ConsultationForm";
import Home from "../pages/Home";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import MyConsultations from "../pages/patient/MyConsultations";
import PrescriptionForm from "../pages/doctor/PrescriptionForm";
import PrescriptionPage from "../pages/doctor/PrescriptionPage";

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
      <Route path="/patient/consultations" element={<MyConsultations />} />
      <Route
        path="/doctor/prescription/:consultationId"
        element={<PrescriptionForm />}
      />
      <Route
        path="/doctor/prescription/view/:consultationId"
        element={<PrescriptionPage />}
      />
    </Routes>
  );
}
