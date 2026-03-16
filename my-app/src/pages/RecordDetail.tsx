import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PatientCard from "../components/PatientCard";
import RecordTimeline from "../components/RecordTimeline";
import ExaminationDetail from "../components/ExaminationDetail";
import CreateVisitModal from "../components/CreateVisitModal";

const RecordDetail: React.FC = () => {

  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="hv-doctor-layout">

      <Navbar />

      <div className="hv-container hv-record-detail">

        <div className="hv-page-header">

          <h2>Chi tiết bệnh án</h2>

          <button
            className="hv-btn-primary"
            onClick={() => setShowModal(true)}
          >
            Thêm lần khám
          </button>

        </div>

        <PatientCard />

        <RecordTimeline />

        <ExaminationDetail />

      </div>

      <Footer />

      {showModal && (
        <CreateVisitModal
          patientId={id}
          closeModal={() => setShowModal(false)}
        />
      )}

    </div>
  );
};

export default RecordDetail;