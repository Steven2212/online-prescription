import { createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (data) => {
    // ✅ store token in cookies
    Cookies.set("token", data.token, { expires: 7 });

    // ✅ store user in localStorage (ok to keep)
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };

  const logout = () => {
    // ✅ remove cookie
    Cookies.remove("token");

    // ✅ clear user
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};