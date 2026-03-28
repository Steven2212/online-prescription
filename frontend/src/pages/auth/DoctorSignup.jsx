import { useForm } from "react-hook-form";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DoctorSignup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "profileImage") {
          formData.append(key, data[key][0]); // file handling fix
        } else {
          formData.append(key, data[key]);
        }
      });

      let res = await API.post("/api/auth/doctor/signup", formData);

      if(res?.data?.status == 'success' && res?.data?.message == 'Doctor created successfully.'){
      toast.success("Doctor Registered!");
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
          Doctor Signup 👨‍⚕️
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Speciality */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Speciality
            </label>
            <input
              {...register("speciality")}
              placeholder="e.g. Cardiologist"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Experience (years)
            </label>
            <input
              type="number"
              {...register("experience", {
                min: 1,
                max: 100
              })}
              min={1}
  max={100}
              placeholder="e.g. 5"
               onKeyDown={(e) => {
    if (e.key === "-" || e.key === "e") {
      e.preventDefault();
    }
  }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              {...register("phone")}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
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
              {...register("profileImage")}
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
}