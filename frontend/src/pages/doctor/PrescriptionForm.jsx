import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function PrescriptionForm() {
  const { consultationId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    care: "",
    medicines: ""
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.care) {
      toast.error("Care to be taken is required❗");
      return;
    }

    try {
      setLoading(true);

      await API.post("/api/prescriptions", {
        consultationId,
        careToBeTaken: form.care,
        medicines: form.medicines
      });

      toast.success("Prescription Generated ✅");

      // redirect back
      navigate("/doctor/dashboard");

    } catch (err) {
      console.error(err);
      toast.error("Error creating prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">

        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          📝 Write Prescription
        </h1>

        {/* Care Section */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Care to be Taken <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
            placeholder="Example: Drink warm water, take rest..."
            value={form.care}
            onChange={(e) =>
              setForm({ ...form, care: e.target.value })
            }
          />
        </div>

        {/* Medicines Section */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Medicines
          </label>
          <textarea
            rows={4}
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
            placeholder="Example: Paracetamol 500mg twice daily..."
            value={form.medicines}
            onChange={(e) =>
              setForm({ ...form, medicines: e.target.value })
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/doctor/dashboard")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}