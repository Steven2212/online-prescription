import { useState } from "react";
import API from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function ConsultationForm() {
  const { doctorId } = useParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        patientId: user?._id,
        doctorId,

        // STEP 1
        currentIllness: form.illness,
        recentSurgery: form.surgery,

        // STEP 2
        isDiabetic: form.diabetic == "yes" ? "Diabetic" : "Non-Diabetic",
        allergies: form.allergies,
        otherConditions: form.others,

        // STEP 3
        transactionId: form.transactionId,
      };

      console.log("Payload : ", payload); // debug

      await API.post("/api/consultations", payload);
      navigate("/patient/consultations");
      toast.success("Consultation Submitted ✅");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting consultation. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
        
        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {["Illness", "History", "Payment"].map((label, index) => (
            <div
              key={index}
              className={`flex-1 text-center pb-2 border-b-4 ${
                step === index + 1
                  ? "border-blue-500 font-semibold"
                  : "border-gray-300"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Current Health Details</h2>

            <input
              name="illness"
              onChange={handleChange}
              placeholder="Current Illness"
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
            />

            <input
              name="surgery"
              onChange={handleChange}
              placeholder="Recent Surgery (with time span)"
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
            />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Family Medical History</h2>

            <div>
              <p className="mb-2 font-medium">Diabetic?</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="diabetic"
                    value="yes"
                    onChange={handleChange}
                  />
                  Yes
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="diabetic"
                    value="no"
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            <input
              name="allergies"
              placeholder="Any Allergies"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
            />

            <input
              name="others"
              placeholder="Other Medical Info"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
            />
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">Payment</h2>

            {/* Fake QR */}

            <div className="flex justify-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=UPI-ID-12345"
                alt="QR Code"
                className="rounded-lg border"
              />
            </div>

            <input
              name="transactionId"
              onChange={handleChange}
              placeholder="Enter Transaction ID"
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submit}
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
