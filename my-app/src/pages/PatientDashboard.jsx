import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PatientProfileCard from "../components/PatientProfileCard";
import PatientRecordsTable from "../components/PatientRecordsTable";
import VisitList from "../components/VisitList";
import AccessLogs from "../components/AccessLog";

import { useAuth } from "../hooks/useAuth";
import { useMedicalRecords } from "../hooks/useMedicalRecords";
import { useVisitRecord } from "../hooks/useVisitRecord";

const PatientDashboard = () => {
  const { user } = useAuth();

  const { records, loading: loadingRecords, fetchRecords } = useMedicalRecords();
  const { visits, fetchVisits } = useVisitRecord();

  const [selectedRecordId, setSelectedRecordId] = useState(null);

  // load medical records
  useEffect(() => {
    fetchRecords();
  }, []);

  // chọn record đầu tiên


  // load visits theo record
  useEffect(() => {
    if (selectedRecordId) {
      fetchVisits(selectedRecordId);
    }
  }, [selectedRecordId]);

  return (
    <div className="hv-doctor-layout">
      <Navbar />

      <div className="hv-container">
        
        {/* HEADER */}
        <div className="hv-page-header">
          <h2>Hồ sơ bệnh nhân</h2>
        </div>

        {/* PROFILE */}
        <PatientProfileCard user={user} />

        {/* MEDICAL RECORDS */}
        <PatientRecordsTable
          records={records}
          loading={loadingRecords}
          onSelect={setSelectedRecordId}
          selectedId={selectedRecordId}
        />

        {/* VISIT HISTORY */}
        <VisitList visits={visits} />

        {/* ACCESS LOG */}
        <AccessLogs />

      </div>

      <Footer />
    </div>
  );
};

export default PatientDashboard;