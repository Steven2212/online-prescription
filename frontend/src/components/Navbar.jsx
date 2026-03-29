import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      pathname === path
        ? "bg-white text-blue-600 shadow"
        : "text-white hover:bg-blue-500"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1
          className="text-xl font-bold tracking-wide cursor-pointer text-white"
          onClick={() => navigate("/")}
        >
          💊 Prescription App
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6">

          {/* Always visible */}
          <Link to="/doctors" className={linkClass("/doctors")}>
            Doctors
          </Link>

          {/* If NOT logged in */}
          {!user && (
            <>
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>

              <Link to="/doctor/signup" className={linkClass("/doctor/signup")}>
                Doctor Signup
              </Link>

              <Link to="/patient/signup" className={linkClass("/patient/signup")}>
                Patient Signup
              </Link>
            </>
          )}

          {/* If logged in */}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const { pathname } = useLocation();

// const linkClass = (path) =>
//   `px-4 py-2 rounded-lg text-sm font-medium transition ${
//     pathname === path
//       ? "bg-white text-blue-600 shadow"
//       : "text-white hover:bg-blue-500"
//   }`;

//   return (
//     <nav className="bg-blue-600 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <h1 className="text-xl font-bold tracking-wide">
//           💊 Prescription App
//         </h1>

//         {/* Links */}
//         <div className="flex items-center gap-10">
//           {/* <Link to="/doctors" className={linkClass("/doctors")}>
//             Doctors
//           </Link> */}

//           <Link to="/login" className={linkClass("/login")}>
//             Login
//           </Link>

//           <Link to="/doctor/signup" className={linkClass("/doctor/signup")}>
//             Doctor Signup
//           </Link>

//           <Link to="/patient/signup" className={linkClass("/patient/signup")}>
//             Patient Signup
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }