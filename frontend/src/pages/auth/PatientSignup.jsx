import { useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import API from "../../api/axios";
import toast from "react-hot-toast";

const PatientSignup = () => {
  const navigate = useNavigate();
  // const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    illnessHistory: "",
    surgeryHistory: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setForm({ ...form, profileImage: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "profileImage") {
          if (form.profileImage) {
            formData.append(key, form.profileImage);
          }
        } else {
          formData.append(key, form[key]);
        }
      });

      let res = await API.post("/api/auth/patient/signup", formData);

    // ✅ redirect to login page after signup
    
          if(res?.data?.status == 'success' && res?.data?.message == 'Patient created successfully.'){
      toast.success("Patient Registered!");
      console.log('Patient Registered!')
      navigate("/login");
      }

    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Patient Signup 🧑
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Age
            </label>
            <input
              name="age"
              type="number"
              min={1}
              max={120}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
              placeholder="Enter your age"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Illness */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Illness History
            </label>
            <input
              name="illnessHistory"
              placeholder="e.g. diabetes, asthma"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Surgery */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Surgery History
            </label>
            <input
              name="surgeryHistory"
              placeholder="e.g. knee surgery"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              className="w-full text-sm"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default PatientSignup;
