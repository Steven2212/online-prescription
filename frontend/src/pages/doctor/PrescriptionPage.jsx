import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function PrescriptionPage() {
  const { consultationId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

const handleSendEmail = async () => {
  try {
    await API.post("/api/prescriptions/send-email", {
      consultationId
    });

    toast.success("Email sent to patient 📧");

  } catch (err) {
    console.error(err);
    toast.error("Failed to send email ❌");
  }
};

const handleDownload = async () => {
  try {
    const response = await fetch(data.pdfUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "prescription.pdf"; // you can make dynamic
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
    toast.error("Download failed ❌");
  }
};

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await API.get(`/api/prescriptions/${consultationId}`);

        setData(res.data[0]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load prescription ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [consultationId]);

  // When prescription is loading...
  if (loading) {
    return <div className="p-6 text-center">Loading prescription...</div>;
  }

  // If prescription doesn't exist.
  if (!data) {
    return (
      <div className="p-6 text-center text-red-500">No prescription found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-center">📄 Prescription</h1>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Care to be Taken</p>
            <p className="text-gray-700">{data.careToBeTaken}</p>
          </div>

          <div>
            <p className="font-semibold">Medicines</p>
            <p className="text-gray-700">{data.medicines}</p>
          </div>

          <div>
            <p className="font-semibold">Date</p>
            <p className="text-gray-600">
              {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          {/* View PDF */}
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View PDF
          </a>

          {/* Download PDF */}
          <button
  onClick={handleDownload}
  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
  Download PDF
</button>

{user?.role === "doctor" && (
  <button
    onClick={handleSendEmail}
    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
  >
    Send Email
  </button>
)}
        </div>
      </div>
    </div>
  );
}
