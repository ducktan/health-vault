import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PatientCard from "../components/PatientCard";
import RecordTimeline from "../components/RecordTimeline";
import ExaminationDetail from "../components/ExaminationDetail";
import CreateVisitModal from "../components/CreateVisitModal";

import { useMedicalRecordDetail } from "../hooks/useMedicalRecordDetail";
import { useVisitRecord } from "../hooks/useVisitRecord";

const RecordDetail = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const { record, loading } = useMedicalRecordDetail(id);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const {
    visits,
    fetchVisits,
    createVisit,
  } = useVisitRecord();

  // 🔥 load visits
  useEffect(() => {
    if (id) fetchVisits(id);
  }, [id]);
  

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

        {/* ========================= */}
        {/* PATIENT INFO */}
        {/* ========================= */}
        {loading ? (
          <div>Đang tải thông tin bệnh nhân...</div>
        ) : (
          <PatientCard patient={record?.patient_id} />
          
          
        )}

        {/* ========================= */}
        {/* TIMELINE */}
        {/* ========================= */}
       <RecordTimeline visits={visits} onSelect={setSelectedVisit}
/>


        {/* ========================= */}
        {/* EXAM DETAIL */}
        {/* ========================= */}
        <ExaminationDetail visit={selectedVisit} patient_id={record?.patient_id._id} />

      </div>

      <Footer />

      {/* ========================= */}
      {/* CREATE VISIT */}
      {/* ========================= */}
      {showModal && (
        <CreateVisitModal
          closeModal={() => setShowModal(false)}
          onCreate={async (formData) => {
            await createVisit({
              ...formData,
              medical_record_id: id,
            });

            // reload timeline
            await fetchVisits(id);

            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default RecordDetail;