import { createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined") {
      return null;
    }

    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Invalid user in localStorage, clearing...");
    console.error(error?.message)
    localStorage.removeItem("user");
    return null;
  }
});
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