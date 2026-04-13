import { createRoot } from "react-dom/client";

import { AuthProvider } from "./context/AuthContext";

import App from "./App";

import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);