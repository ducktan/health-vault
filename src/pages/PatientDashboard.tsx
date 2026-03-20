import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PatientProfileCard from "../components/PatientProfileCard";
import PatientRecordsTable from "../components/PatientRecordsTable";
import VisitList from "../components/VisitList";
import AccessLogs from "../components/AccessLog";

const PatientDashboard: React.FC = () => {

  return (
    <div className="hv-doctor-layout">

      <Navbar />

      <div className="hv-container">

        <div className="hv-page-header">
            <h2 >Hồ sơ bệnh nhân</h2>
        </div>

        

        <PatientProfileCard />

        <PatientRecordsTable />

        <VisitList />

        <AccessLogs />

      </div>

      <Footer />

    </div>
  );
};

export default PatientDashboard;