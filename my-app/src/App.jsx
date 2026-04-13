import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./pages/Profile"

import DoctorDashboard from "./pages/DoctorDashboard"
import RecordDetail from "./pages/RecordDetail"
import PatientDashboard from "./pages/PatientDashboard"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminRecords from "./pages/admin/AdminRecords"
import Forbidden from "./pages/403"
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />

        {/* doctor routes */}
        <Route path="/doctor">
          <Route index element={<DoctorDashboard />} />
          <Route path="records/:id" element={<RecordDetail />} />
        </Route>

        <Route path="/patient">
          <Route index element={<PatientDashboard />} />
          <Route path="records/:id" element={<RecordDetail />} />
        </Route>

        <Route path="/admin">
          <Route
            path="users"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="health"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminRecords />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/403" element={<Forbidden />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App