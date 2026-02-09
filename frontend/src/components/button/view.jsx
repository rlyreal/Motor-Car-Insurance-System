import React from "react";
import { FiEye, FiUser, FiFileText, FiHash, FiCreditCard } from "react-icons/fi";

const ViewModal = ({ selectedUser, onClose, premiumModalBackdrop, premiumModal, premiumModalHeader, premiumModalTitle, premiumModalBody, premiumModalFooter, secondaryButton, infoBadge, fieldGroup, fieldLabel, fieldValue, divider }) => {
  if (!selectedUser) return null;

  // Helper function to format YYYY-MM-DD to MM/DD/YYYY
  const formatDateToDisplay = (dateString) => {
    if (!dateString) return "N/A";
    
    // Check if date is in YYYY-MM-DD format
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}/${year}`;
    }
    
    // If already formatted or different format, return as-is
    return dateString;
  };

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
            <FiEye size={30} />
            View Record Details
          </h3>
        </div>

        {/* Modal Body */}
        <div style={premiumModalBody}>
          {/* Assured Information Section */}
          <div style={infoBadge}>
            <FiUser size={14} />
            Assured Information
          </div>

          <div style={twoColumnContainer}>
            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                <FiUser size={14} />
                Assured Name
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.assuredName || selectedUser.name || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Address
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.address || "N/A"}</div>
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
              <div style={fieldValue} className="field-value-hover">{selectedUser.policyNumber || selectedUser.pn || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                <FiFileText size={14} />
                COC Number
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.cocNumber || selectedUser.coc || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                <FiFileText size={14} />
                OR Number
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.orNumber || selectedUser.or || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                <FiFileText size={14} />
                Type
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.cType || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Year
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.year || "N/A"}</div>
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
              <div style={fieldValue} className="field-value-hover">{formatDateToDisplay(selectedUser.fromDate)}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 To Date
              </label>
              <div style={fieldValue} className="field-value-hover">{formatDateToDisplay(selectedUser.toDate)}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Issued Date
              </label>
              <div style={fieldValue} className="field-value-hover">{formatDateToDisplay(selectedUser.issued)}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Received Date
              </label>
              <div style={fieldValue} className="field-value-hover">{formatDateToDisplay(selectedUser.received)}</div>
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
              <div style={fieldValue} className="field-value-hover">{selectedUser.make || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Model
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.model || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Body Type
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.bodyType || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Color
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.color || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Plate Number
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.plateNo || selectedUser.plate || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Chassis Number
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.chassisNo || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Motor Number
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.motorNo || "N/A"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 MV File Number
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.mvFileNo || "N/A"}</div>
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
              <div style={fieldValue} className="field-value-hover">{selectedUser.premium || "₱0"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Other Charges
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.otherCharges || "₱0"}</div>
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
              <div style={fieldValue} className="field-value-hover">{selectedUser.docStamps || "₱0"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 E-VAT (12%)
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.eVat || "₱0"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Local Govt Tax (0.5%)
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.localGovtTax || "₱0"}</div>
            </div>

            <div style={compactFieldGroup}>
              <label style={fieldLabel}>
                 Auth. Fee (Fixed)
              </label>
              <div style={fieldValue} className="field-value-hover">{selectedUser.authFee || "₱0"}</div>
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
            <div style={{...fieldValue, backgroundColor: "#f0fdf4", borderColor: "#22c55e", fontWeight: "700", fontSize: "18px", color: "#15803d"}} className="field-value-hover">{selectedUser.grandTotal || "₱0"}</div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={premiumModalFooter}>
          <button 
            style={secondaryButton}
            className="premium-button secondary-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
