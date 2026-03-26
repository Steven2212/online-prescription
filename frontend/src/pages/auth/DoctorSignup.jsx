import { useForm } from "react-hook-form";
import API from "../../api/axios";

export default function DoctorSignup() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    await API.post("/auth/doctor/signup", formData);
    alert("Doctor Registered!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-3">
      <input {...register("name")} placeholder="Name" />
      <input {...register("speciality")} placeholder="Speciality" />
      <input {...register("experience")} placeholder="Experience" />
      <input {...register("email")} placeholder="Email" />
      <input {...register("phone")} placeholder="Phone" />
      <input type="password" {...register("password")} placeholder="Password" />
      <input type="file" {...register("profileImage")} />

      <button className="bg-blue-500 text-white p-2">Signup</button>
    </form>
  );
}