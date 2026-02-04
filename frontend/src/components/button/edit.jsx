import React from "react";
import { FiEdit2, FiFileText, FiHash, FiCreditCard } from "react-icons/fi";

const EditModal = ({ editData, onEditChange, onSave, onCancel, premiumModalBackdrop, premiumModal, premiumModalHeader, premiumModalTitle, premiumModalBody, premiumModalFooter, primaryButton, secondaryButton, infoBadge, fieldGroup, fieldLabel, premiumInput, divider }) => {
  if (!editData) return null;

  const twoColumnContainer = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "20px"
  };

  const compactFieldGroup = {
    marginBottom: "0"
  };

  return (
    <div style={premiumModalBackdrop}>
      <div style={premiumModal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={premiumModalHeader}>
          <div className="modal-header-decoration"></div>
          <h3 style={premiumModalTitle}>
            <FiEdit2 size={30} />
            Edit Record
          </h3>
        </div>

        {/* Modal Body */}
        <div style={premiumModalBody}>
          {/* Assured Information Section */}
          <div style={infoBadge}>
            <FiEdit2 size={14} />
            Assured Information
          </div>

          <div style={twoColumnContainer}>
            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                <FiEdit2 size={14} />
                Assured Name
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.assuredName || editData.name || ""} 
                onChange={(e) => onEditChange({ ...editData, assuredName: e.target.value })} 
                placeholder="Enter assured name"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Address
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.address || ""} 
                onChange={(e) => onEditChange({ ...editData, address: e.target.value })} 
                placeholder="Enter address"
              />
            </div>
          </div>

          <div style={divider}></div>

          {/* Policy Information Section */}
          <div style={infoBadge}>
            <FiFileText size={14} />
            Policy Information
          </div>

          <div style={twoColumnContainer}>
            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                <FiHash size={14} />
                Policy Number
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.policyNumber || editData.pn || ""} 
                onChange={(e) => onEditChange({ ...editData, policyNumber: e.target.value })} 
                placeholder="POL-XXXX"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                <FiFileText size={14} />
                COC Number
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.cocNumber || editData.coc || ""} 
                onChange={(e) => onEditChange({ ...editData, cocNumber: e.target.value })} 
                placeholder="COC-XXXX"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                <FiFileText size={14} />
                OR Number
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.orNumber || editData.or || ""} 
                onChange={(e) => onEditChange({ ...editData, orNumber: e.target.value })} 
                placeholder="OR-XXXX"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                Model
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.model || ""} 
                onChange={(e) => onEditChange({ ...editData, model: e.target.value })} 
                placeholder="e.g., 2025 Camry"
              />
            </div>
          </div>

          <div style={divider}></div>

          {/* Policy Dates Section */}
          <div style={infoBadge}>
            <FiCreditCard size={14} />
            Policy Dates
          </div>

          <div style={twoColumnContainer}>
            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 From Date
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                type="date"
                value={editData.fromDate || ""} 
                onChange={(e) => onEditChange({ ...editData, fromDate: e.target.value })} 
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 To Date
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                type="date"
                value={editData.toDate || ""} 
                onChange={(e) => onEditChange({ ...editData, toDate: e.target.value })} 
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Issued Date
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                type="date"
                value={editData.issued || ""} 
                onChange={(e) => onEditChange({ ...editData, issued: e.target.value })} 
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Received Date
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                type="date"
                value={editData.received || ""} 
                onChange={(e) => onEditChange({ ...editData, received: e.target.value })} 
              />
            </div>
          </div>

          <div style={divider}></div>

          {/* Vehicle Details Section */}
          <div style={infoBadge}>
            <FiCreditCard size={14} />
            Vehicle Details
          </div>

          <div style={twoColumnContainer}>
            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Make
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.make || ""} 
                onChange={(e) => onEditChange({ ...editData, make: e.target.value })} 
                placeholder="Toyota"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Model
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.model || ""} 
                onChange={(e) => onEditChange({ ...editData, model: e.target.value })} 
                placeholder="Camry"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Body Type
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.bodyType || ""} 
                onChange={(e) => onEditChange({ ...editData, bodyType: e.target.value })} 
                placeholder="Sedan"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Color
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.color || ""} 
                onChange={(e) => onEditChange({ ...editData, color: e.target.value })} 
                placeholder="Silver"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Plate Number
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.plateNo || editData.plate || ""} 
                onChange={(e) => onEditChange({ ...editData, plateNo: e.target.value })} 
                placeholder="ABC-001"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Chassis Number
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.chassisNo || ""} 
                onChange={(e) => onEditChange({ ...editData, chassisNo: e.target.value })} 
                placeholder="CH123456789"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Motor Number
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.motorNo || ""} 
                onChange={(e) => onEditChange({ ...editData, motorNo: e.target.value })} 
                placeholder="MOT987654321"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 MV File Number
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.mvFileNo || ""} 
                onChange={(e) => onEditChange({ ...editData, mvFileNo: e.target.value })} 
                placeholder="MV2025001"
              />
            </div>
          </div>

          <div style={divider}></div>

          {/* Premium & Charges Section */}
          <div style={infoBadge}>
            <FiCreditCard size={14} />
            Premium & Charges
          </div>

          <div style={twoColumnContainer}>
            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Premium
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.premium || ""} 
                onChange={(e) => onEditChange({ ...editData, premium: e.target.value })} 
                placeholder="₱5,000"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Other Charges
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.otherCharges || ""} 
                onChange={(e) => onEditChange({ ...editData, otherCharges: e.target.value })} 
                placeholder="₱500"
              />
            </div>
          </div>

          <div style={divider}></div>

          {/* Tax & Fee Section */}
          <div style={infoBadge}>
            <FiCreditCard size={14} />
            Taxes & Fees
          </div>

          <div style={twoColumnContainer}>
            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Doc. Stamps (12.5%)
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.docStamps || ""} 
                disabled
                placeholder="₱625"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 E-VAT (12%)
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.eVat || ""} 
                disabled
                placeholder="₱600"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Local Govt Tax (0.5%)
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.localGovtTax || ""} 
                disabled
                placeholder="₱25"
              />
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Auth. Fee (Fixed)
              </label>
              <input 
                style={premiumInput}
                className="premium-input"
                value={editData.authFee || ""} 
                disabled
                placeholder="₱50.40"
              />
            </div>
          </div>

          <div style={divider}></div>

          {/* Total Section */}
          <div style={infoBadge}>
            <FiCreditCard size={14} />
            Total Amount
          </div>

          <div style={{marginBottom: "0"}}>
            <label style={fieldLabel}>
               Grand Total
            </label>
            <input 
              style={premiumInput}
              className="premium-input"
              value={editData.grandTotal || ""} 
              disabled
              placeholder="₱6,850"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div style={premiumModalFooter}>
          <button 
            style={secondaryButton}
            className="premium-button secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            style={primaryButton}
            className="premium-button primary-button"
            onClick={onSave}
          >
            <FiEdit2 size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
