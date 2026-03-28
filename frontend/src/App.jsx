import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <AppRoutes />
      <Toaster position="top-center" />
      </main>
    </div>
  );
}

export default App;