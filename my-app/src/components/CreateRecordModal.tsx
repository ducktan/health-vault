import React from "react";

interface Props {
  closeModal: () => void;
}

const CreateRecordModal: React.FC<Props> = ({ closeModal }) => {

  return (
    <div className="hv-modal-overlay">

      <div className="hv-modal">

        <h3>Tạo bệnh án bệnh nhân</h3>

        <form>

          <div className="hv-form-group">
            <label>Họ và tên</label>
            <input type="text" />
          </div>

          <div className="hv-form-group">
            <label>CCCD</label>
            <input type="text" />
          </div>

          <div className="hv-form-group">
            <label>Ngày sinh</label>
            <input type="date" />
          </div>

          <div className="hv-form-group">
            <label>Giới tính</label>
            <select>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>

          <div className="hv-form-group">
            <label>SĐT</label>
            <input type="text" />
          </div>

          <div className="hv-form-group">
            <label>Địa chỉ</label>
            <input type="text" />
          </div>

          <div className="hv-modal-actions">

            <button
              type="button"
              className="hv-btn-outline"
              onClick={closeModal}
            >
              Hủy
            </button>

            <button className="hv-btn-primary">
              Tạo bệnh án
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateRecordModal;