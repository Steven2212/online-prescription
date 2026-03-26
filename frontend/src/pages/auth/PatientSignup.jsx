import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const PatientSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    illnessHistory: "",
    surgeryHistory: "",
    profileImage: null
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
        formData.append(key, form[key]);
      });

      const res = await axios.post(
        "http://localhost:5000/api/auth/patient/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      // ✅ store token in cookies
      Cookies.set("token", res.data.token, { expires: 7 });

      alert("Signup successful!");
      navigate("/doctors");
    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div>
      <h2>Patient Signup</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <input name="illnessHistory" placeholder="Illness (comma separated)" onChange={handleChange} />
        <input name="surgeryHistory" placeholder="Surgery (comma separated)" onChange={handleChange} />

        <input type="file" name="profileImage" onChange={handleChange} />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default PatientSignup;