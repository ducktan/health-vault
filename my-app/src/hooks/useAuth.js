import { useContext } from "react";
import { AuthContext } from "../context/AuthContextObj"; // import context đã tách

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};