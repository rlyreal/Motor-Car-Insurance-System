import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/record.css";
import { FiEye, FiEdit2, FiTrash2, FiDownload, FiAlertCircle } from "react-icons/fi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import Toast from "../../common/toast";
import ViewModal from "../button/view";
import EditModal from "../button/edit";

const Records = () => {
  const [searchInput, setSearchInput] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);
  
  const handleAddClick = () => {
    navigate('/menu');
  };

  // Search function
  const handleSearch = () => {
    let results = [...users];
    const hasSearchInput = searchInput.trim() !== "";
    const hasDateFrom = dateFrom !== "";
    const hasDateTo = dateTo !== "";

    // Filter by search input (name or plate number)
    if (hasSearchInput) {
      const searchTerm = searchInput.toLowerCase();
      results = results.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.plate.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by date range
    if (hasDateFrom) {
      results = results.filter(user => {
        if (!user.dateCreated) return true; // Include records without dates
        return user.dateCreated >= dateFrom;
      });
    }

    if (hasDateTo) {
      results = results.filter(user => {
        if (!user.dateCreated) return true; // Include records without dates
        return user.dateCreated <= dateTo;
      });
    }

    setFilteredUsers(results);
    setIsSearchActive(true);
    setCurrentPage(1); // Reset to first page
    
    // Enhanced toast messages
    if (!hasSearchInput && !hasDateFrom && !hasDateTo) {
      setToast({ message: 'Please enter search criteria', type: 'warning' });
      setIsSearchActive(false);
      return;
    }

    if (results.length === 0) {
      setToast({ message: ' No records found matching your search criteria', type: 'error' });
    } else if (results.length === 1) {
      setToast({ message: ' Found 1 matching record', type: 'success' });
    } else {
      setToast({ message: ` Found ${results.length} matching records`, type: 'success' });
    }
  };

  // Initialize users from localStorage submitted records
  const [users, setUsers] = useState(() => {
    const submittedRecords = JSON.parse(localStorage.getItem('submittedRecords')) || [];
    const sampleUsers = [
      { 
        id: 1, 
        name: "Mark Dave Catubig",
        assuredName: "Mark Dave Catubig",
        address: "123 Main St, Manila",
        policyNumber: "POL-2025-001",
        pn: "10001", 
        cocNumber: "COC001",
        coc: "COC001", 
        orNumber: "OR001",
        or: "OR001", 
        model: "2025 Camry",
        fromDate: "2025-01-01",
        toDate: "2026-01-01",
        issued: "2025-01-01",
        received: "2025-01-02",
        make: "Toyota",
        bodyType: "Sedan",
        color: "Silver",
        plateNo: "ABC-001",
        plate: "ABC-001",
        chassisNo: "CH123456789",
        motorNo: "MOT987654321",
        mvFileNo: "MV2025001",
        premium: "₱5,000",
        otherCharges: "₱500",
        docStamps: "₱625",
        eVat: "₱600",
        localGovtTax: "₱25",
        authFee: "₱50.40",
        grandTotal: "₱6,800.40",
        dateCreated: "2025-01-15"
      },
      { 
        id: 2, 
        name: "Vince Bryant Cabunilas",
        assuredName: "Vince Bryant Cabunilas",
        address: "456 Oak Ave, Quezon City",
        policyNumber: "POL-2025-002",
        pn: "10002", 
        cocNumber: "COC002",
        coc: "COC002", 
        orNumber: "OR002",
        or: "OR002", 
        model: "2025 CR-V",
        fromDate: "2025-01-10",
        toDate: "2026-01-10",
        issued: "2025-01-10",
        received: "2025-01-11",
        make: "Honda",
        bodyType: "SUV",
        color: "Black",
        plateNo: "ABC-002",
        plate: "ABC-002",
        chassisNo: "CH223456789",
        motorNo: "MOT287654321",
        mvFileNo: "MV2025002",
        premium: "₱3,500",
        otherCharges: "₱300",
        docStamps: "₱437.50",
        eVat: "₱420",
        localGovtTax: "₱17.50",
        authFee: "₱50.40",
        grandTotal: "₱4,825.40",
        dateCreated: "2025-01-18"
      },
      { 
        id: 3, 
        name: "Real John Palacio",
        assuredName: "Real John Palacio",
        address: "789 Pine Rd, Makati",
        policyNumber: "POL-2025-003",
        pn: "10003", 
        cocNumber: "COC003",
        coc: "COC003", 
        orNumber: "OR003",
        or: "OR003", 
        model: "2025 F-150",
        fromDate: "2025-01-05",
        toDate: "2026-01-05",
        issued: "2025-01-05",
        received: "2025-01-06",
        make: "Ford",
        bodyType: "Truck",
        color: "Red",
        plateNo: "ABC-003",
        plate: "ABC-003",
        chassisNo: "CH323456789",
        motorNo: "MOT387654321",
        mvFileNo: "MV2025003",
        premium: "₱6,000",
        otherCharges: "₱600",
        docStamps: "₱750",
        eVat: "₱720",
        localGovtTax: "₱30",
        authFee: "₱50.40",
        grandTotal: "₱8,150.40",
        dateCreated: "2025-01-20"
      },
      { 
        id: 4, 
        name: "Jeff Monreal",
        assuredName: "Jeff Monreal",
        address: "321 Elm St, Pasay",
        policyNumber: "POL-2025-004",
        pn: "10004", 
        cocNumber: "COC004",
        coc: "COC004", 
        orNumber: "OR004",
        or: "OR004", 
        model: "2025 Elantra",
        fromDate: "2025-01-12",
        toDate: "2026-01-12",
        issued: "2025-01-12",
        received: "2025-01-13",
        make: "Hyundai",
        bodyType: "Sedan",
        color: "White",
        plateNo: "ABC-004",
        plate: "ABC-004",
        chassisNo: "CH423456789",
        motorNo: "MOT487654321",
        mvFileNo: "MV2025004",
        premium: "₱4,800",
        otherCharges: "₱400",
        docStamps: "₱600",
        eVat: "₱576",
        localGovtTax: "₱24",
        authFee: "₱50.40",
        grandTotal: "₱6,450.40",
        dateCreated: "2025-01-22"
      },
      { 
        id: 5, 
        name: "Rovic Steve Real",
        assuredName: "Rovic Steve Real",
        address: "654 Birch Ln, Las Piñas",
        policyNumber: "POL-2025-005",
        pn: "10005", 
        cocNumber: "COC005",
        coc: "COC005", 
        orNumber: "OR005",
        or: "OR005", 
        model: "2025 YZF-R15",
        fromDate: "2025-01-20",
        toDate: "2026-01-20",
        issued: "2025-01-20",
        received: "2025-01-21",
        make: "Yamaha",
        bodyType: "Motorcycle",
        color: "Blue",
        plateNo: "ABC-005",
        plate: "ABC-005",
        chassisNo: "CH523456789",
        motorNo: "MOT587654321",
        mvFileNo: "MV2025005",
        premium: "₱2,000",
        otherCharges: "₱200",
        docStamps: "₱250",
        eVat: "₱240",
        localGovtTax: "₱10",
        authFee: "₱50.40",
        grandTotal: "₱2,750.40",
        dateCreated: "2025-01-25"
      },
      { 
        id: 6, 
        name: "Alexus Sundae Sagaral",
        assuredName: "Alexus Sundae Sagaral",
        address: "987 Spruce Way, Cebu",
        policyNumber: "POL-2025-006",
        pn: "10006", 
        cocNumber: "COC006",
        coc: "COC006", 
        orNumber: "OR006",
        or: "OR006", 
        model: "2025 CX-5",
        fromDate: "2025-01-08",
        toDate: "2026-01-08",
        issued: "2025-01-08",
        received: "2025-01-09",
        make: "Mazda",
        bodyType: "Sedan",
        color: "Gray",
        plateNo: "ABC-006",
        plate: "ABC-006",
        chassisNo: "CH623456789",
        motorNo: "MOT687654321",
        mvFileNo: "MV2025006",
        premium: "₱6,500",
        otherCharges: "₱700",
        docStamps: "₱812.50",
        eVat: "₱780",
        localGovtTax: "₱32.50",
        authFee: "₱50.40",
        grandTotal: "₱8,875.40",
        dateCreated: "2025-01-26"
      },
      { 
        id: 7, 
        name: "Julius Micheal Escoton",
        assuredName: "Julius Micheal Escoton",
        address: "159 Maple Dr, Davao",
        policyNumber: "POL-2025-007",
        pn: "10007", 
        cocNumber: "COC007",
        coc: "COC007", 
        orNumber: "OR007",
        or: "OR007", 
        model: "2025 X-Trail",
        fromDate: "2025-01-18",
        toDate: "2026-01-18",
        issued: "2025-01-18",
        received: "2025-01-19",
        make: "Nissan",
        bodyType: "SUV",
        color: "Gold",
        plateNo: "ABC-007",
        plate: "ABC-007",
        chassisNo: "CH723456789",
        motorNo: "MOT787654321",
        mvFileNo: "MV2025007",
        premium: "₱4,100",
        otherCharges: "₱350",
        docStamps: "₱512.50",
        eVat: "₱492",
        localGovtTax: "₱20.50",
        authFee: "₱50.40",
        grandTotal: "₱5,525.40",
        dateCreated: "2025-01-28"
      }
    ];
    return [...sampleUsers, ...submittedRecords];
  });

  // items per page becomes selectable by admin (5 or 10)
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Use filtered users if search is active, otherwise use all users
  const displayUsers = isSearchActive ? filteredUsers : users;

  // total pages is number of groups of 5 (1 => up to 5 items, 2 => up to 10, etc.)
  const totalPages = Math.max(1, Math.ceil(displayUsers.length / itemsPerPage));

  // clamp currentPage when users change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [displayUsers.length, currentPage, totalPages]);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentUsers = displayUsers.slice(startIdx, startIdx + itemsPerPage);

  const goToPage = (n) => setCurrentPage(Math.min(Math.max(1, n), totalPages));
  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  // --- modal / edit state & handlers ---
  const openView = (user) => {
    setSelectedUser(user);
    setModalType("view");
    setModalOpen(true);
  };

  const openEdit = (user) => {
    const combinedModel = user.year ? `${user.year} ${user.model}` : user.model || "";
    const initialEdit = { ...user, model: combinedModel };
    // ensure year is removed in editData
    if ('year' in initialEdit) delete initialEdit.year;
    setSelectedUser(user);
    setEditData(initialEdit);
    setModalType("edit");
    setModalOpen(true);
  };

  const openDeleteConfirm = (user) => {
    setDeleteConfirmUser(user);
    setModalType("delete");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedUser(null);
    setEditData(null);
    setDeleteConfirmUser(null);
  };

  const handleSaveEdit = () => {
    if (!editData) return;
    setUsers((prev) => prev.map((u) => (u.id === editData.id ? editData : u)));
    setToast({ message: '✓ Record updated successfully!', type: 'success' });
    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteConfirmUser) return;
    const deletedName = deleteConfirmUser.name;
    setUsers((prev) => {
      const newUsers = prev.filter((u) => u.id !== deleteConfirmUser.id);
      setCurrentPage((p) => Math.min(p, Math.max(1, Math.ceil(newUsers.length / itemsPerPage))));
      return newUsers;
    });
    setToast({ message: ` Record for "${deletedName}" deleted successfully`, type: 'success' });
    closeModal();
  };
  // --- end modal / edit state & handlers ---

  // Define header cell style with proper borders for sticky behavior - UPDATED COLOR
  const headerStyle = {
    position: "sticky",
    top: 0,
    backgroundColor: "#1e6b47",
    color: "#ffffff",
    padding: "18px 16px",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    zIndex: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    borderTop: "2px solid #165638",
    borderBottom: "2px solid #165638"
  };

  // Common button style to remove borders
  const noBorderStyle = { border: "none" };

  // Premium Modal Styles - UPDATED COLOR
  const premiumModalBackdrop = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.25s ease-out"
  };

  const premiumModal = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    width: "95%",
    maxWidth: "1000px",
    maxHeight: "95vh",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    animation: "slideUpScale 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
    display: "flex",
    flexDirection: "column"
  };

  const deleteModal = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    width: "95%",
    maxWidth: "550px",
    maxHeight: "95vh",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    animation: "slideUpScale 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
    display: "flex",
    flexDirection: "column"
  };

  const premiumModalHeader = {
    padding: "40px 48px",
    borderBottom: "1px solid rgba(229, 231, 235, 0.8)",
    background: "linear-gradient(135deg, #1e6b47 0%, #267d57 50%, #2f9268 100%)",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden"
  };

  const premiumModalTitle = {
    fontSize: "26px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    position: "relative",
    zIndex: 1
  };

  const premiumModalBody = {
    padding: "48px",
    overflowY: "auto",
    flex: 1,
    backgroundColor: "#fafafa"
  };

  const premiumModalFooter = {
    padding: "32px 48px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "flex-end",
    gap: "14px",
    backgroundColor: "#ffffff"
  };

  const fieldGroup = {
    marginBottom: "28px"
  };

  const fieldLabel = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  const fieldValue = {
    padding: "16px 18px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#111827",
    border: "2px solid #e5e7eb",
    fontWeight: "500",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease"
  };

  const premiumInput = {
    width: "100%",
    padding: "16px 18px",
    fontSize: "16px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "inherit",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
  };

  const premiumButton = {
    padding: "13px 28px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
  };

  const primaryButton = {
    ...premiumButton,
    backgroundColor: "#1e6b47",
    color: "#ffffff"
  };

  const secondaryButton = {
    ...premiumButton,
    backgroundColor: "#f3f4f6",
    color: "#374151",
    border: "2px solid #e5e7eb"
  };

  const deleteButton = {
    ...premiumButton,
    backgroundColor: "#dc2626",
    color: "#ffffff"
  };

  const iconBadge = {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    marginBottom: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  };

  const divider = {
    height: "1px",
    background: "linear-gradient(to right, transparent, #e5e7eb, transparent)",
    margin: "28px 0"
  };

  const infoBadge = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "20px"
  };

  // Export to Excel
  const exportToExcel = () => {
    const tableData = users.map(user => ({
      "Name": user.name,
      "Policy Number": user.pn,
      "COC Number": user.coc,
      "OR Number": user.or,
      "Plate Number": user.plate
    }));

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Records");
    
    // Set column widths
    worksheet["!cols"] = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 }
    ];

    XLSX.writeFile(workbook, `Records_${new Date().toISOString().split('T')[0]}.xlsx`);
    setToast({ message: ' Excel file exported successfully!', type: 'success' });
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Add title
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Records Report", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 15;

    // Add date
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 12;

    // Add table header - UPDATED COLOR
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.setTextColor(240, 240, 240);
    doc.setFillColor(30, 107, 71); // #1e6b47 color
    
    const colWidths = [35, 30, 30, 30, 35];
    const headers = ["Name", "Policy #", "COC #", "OR #", "Plate #"];
    let xPosition = 15;

    headers.forEach((header, index) => {
      doc.rect(xPosition, yPosition, colWidths[index], 10, "F");
      doc.text(header, xPosition + colWidths[index] / 2, yPosition + 7, { align: "center" });
      xPosition += colWidths[index];
    });

    yPosition += 12;

    // Add table data
    doc.setFont(undefined, "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);

    users.forEach((user, rowIndex) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }

      xPosition = 15;
      const rowData = [user.name, user.pn, user.coc, user.or, user.plate];
      
      // Alternate row colors
      if (rowIndex % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(15, yPosition, pageWidth - 30, 10, "F");
      }

      rowData.forEach((data, colIndex) => {
        doc.text(String(data), xPosition + colWidths[colIndex] / 2, yPosition + 7, { align: "center" });
        xPosition += colWidths[colIndex];
      });

      yPosition += 10;
    });

    // Save PDF
    doc.save(`Records_${new Date().toISOString().split('T')[0]}.pdf`);
    setToast({ message: ' PDF file exported successfully!', type: 'success' });
  };

  return (
    <div className="container">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUpScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .premium-input:focus {
          border-color: #1e6b47 !important;
          box-shadow: 0 0 0 4px rgba(30, 107, 71, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08) !important;
          transform: translateY(-1px);
        }

        .premium-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18) !important;
        }

        .premium-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }

        .secondary-button:hover {
          background-color: #e5e7eb !important;
          border-color: #d1d5db !important;
        }

        .primary-button:hover {
          background-color: #165638 !important;
          box-shadow: 0 8px 20px rgba(30, 107, 71, 0.3) !important;
        }

        .delete-button:hover {
          background-color: #b91c1c !important;
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3) !important;
        }

        .field-value-hover:hover {
          border-color: #d1d5db !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
        }

        .icon-badge-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .modal-header-decoration {
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 100%;
          background: radial-gradient(circle at 100% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .add-btn {
          background-color: #1e6b47 !important;
          border: none !important;
        }

        .add-btn:hover {
          background-color: #165638 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(30, 107, 71, 0.3) !important;
        }

        .page-size-btn.active {
          background-color: #1e6b47 !important;
          color: white !important;
          border: 2px solid #1e6b47 !important;
        }

        .page-size-btn:hover:not(.active) {
          background-color: #d4f0e8 !important;
          color: #1e6b47 !important;
          border-color: #1e6b47 !important;
        }

        .page-size-btn {
          transition: all 0.3s ease !important;
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-dropdown {
          padding: 8px 12px;
          padding-right: 32px;
          font-size: 14px;
          font-weight: 600;
          border: 2px solid #1e6b47;
          border-radius: 6px;
          background-color: white;
          color: #1e6b47;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231e6b47' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }

        .page-dropdown:hover {
          background-color: #d4f0e8;
          border-color: #165638;
        }

        .page-dropdown:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(30, 107, 71, 0.2);
        }
      `}</style>

      {/* Toast notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)} 
          duration={2000}
          showProgress={true}
        />
      )}

      {/* Top actions */}
      <div className="top-bar">
        <div className="top-left">
          <button className="btn add-btn" onClick={handleAddClick} style={noBorderStyle}>ADD</button>
        </div>
        <div className="top-right" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button 
            className="btn export-btn" 
            onClick={exportToExcel}
            style={{
              ...noBorderStyle,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#10B981",
              color: "white",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#059669";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#10B981";
            }}
            title="Export to Excel"
          >
            <FiDownload size={18} /> Excel
          </button>
          <button 
            className="btn export-btn" 
            onClick={exportToPDF}
            style={{
              ...noBorderStyle,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#EF4444",
              color: "white",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#DC2626";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#EF4444";
            }}
            title="Export to PDF"
          >
            <FiDownload size={18} /> PDF
          </button>
        </div>
      </div>

      {/* Search section */}
      <div className="search-bar">
        <div className="date-group">
          <div className="field">
            <label>From</label>
            <input 
              type="date" 
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                // Auto-reset when all filters are cleared
                if (e.target.value === "" && dateTo === "" && searchInput.trim() === "") {
                  setFilteredUsers([]);
                  setIsSearchActive(false);
                  setCurrentPage(1);
                }
              }}
            />
          </div>

          <div className="field">
            <label>To</label>
            <input 
              type="date" 
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                // Auto-reset when all filters are cleared
                if (e.target.value === "" && dateFrom === "" && searchInput.trim() === "") {
                  setFilteredUsers([]);
                  setIsSearchActive(false);
                  setCurrentPage(1);
                }
              }}
            />
          </div>

          <div className="field search-field">
            <label>Search</label>
            <div className="search-input-group" style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  // Auto-reset when input is cleared
                  if (e.target.value.trim() === "" && dateFrom === "" && dateTo === "") {
                    setFilteredUsers([]);
                    setIsSearchActive(false);
                    setCurrentPage(1);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                placeholder="Enter name or plate no..."
                className="search-input"
                style={{ flex: 1, minWidth: "200px" }}
              />
              <button 
                className="btn search-btn" 
                onClick={handleSearch}
                style={{
                  ...noBorderStyle,
                  whiteSpace: "nowrap"
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table with sticky header */}
      <div className="table-wrapper">
        <table style={{ borderCollapse: "separate", borderSpacing: 0 }}>
          <thead>
            <tr>
              <th style={headerStyle}>NAME</th>
              <th style={headerStyle}>PN</th>
              <th style={headerStyle}>COC</th>
              <th style={headerStyle}>OR</th>
              <th style={headerStyle}>PLATE NO</th>
              <th style={headerStyle}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.pn}</td>
                <td>{u.coc}</td>
                <td>{u.or}</td>
                <td>{u.plate}</td>
                <td>
                  <button
                    className="action-btn view-btn"
                    title="View"
                    aria-label="View"
                    onClick={() => openView(u)}
                    style={noBorderStyle}
                  >
                    <FiEye />
                  </button>

                  <button
                    className="action-btn edit-btn"
                    title="Edit"
                    aria-label="Edit"
                    onClick={() => openEdit(u)}
                    style={noBorderStyle}
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="action-btn delete-btn"
                    title="Delete"
                    aria-label="Delete"
                    onClick={() => openDeleteConfirm(u)}
                    style={noBorderStyle}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls with dropdown on left */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginTop: "16px" 
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#ffffff", fontWeight: 600 }}>Show</span>
          <select
            className="page-size-select"
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            aria-label="Items per page"
            style={{
              padding: "8px 32px 8px 12px",
              borderRadius: "8px",
              fontWeight: "700",
              background: "#ffffff",
              border: "2px solid #1e6b47",
              color: "#1e6b47",
              fontSize: "14px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231e6b47' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center"
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button 
            className="page-btn" 
            onClick={handlePrev} 
            disabled={currentPage === 1} 
            style={{
              ...noBorderStyle,
              padding: "8px 16px",
              backgroundColor: currentPage === 1 ? "#e5e7eb" : "#059669",
              color: currentPage === 1 ? "#9ca3af" : "white",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => goToPage(page)}
                style={{
                  ...noBorderStyle,
                  padding: "8px 12px",
                  minWidth: "40px",
                  backgroundColor: currentPage === page ? "#059669" : "#1e6b47",
                  color: "#ffffff",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: currentPage === page ? "700" : "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: currentPage === page ? "0 4px 16px rgba(0, 0, 0, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.15)"
                }}
              >
                {page}
              </button>
            );
          })}

          <button 
            className="page-btn" 
            onClick={handleNext} 
            disabled={currentPage === totalPages} 
            style={{
              ...noBorderStyle,
              padding: "8px 16px",
              backgroundColor: currentPage === totalPages ? "#e5e7eb" : "#059669",
              color: currentPage === totalPages ? "#9ca3af" : "white",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Premium Modal: view / edit / delete */}
      {modalOpen && modalType === "view" && (
        <ViewModal 
          selectedUser={selectedUser}
          onClose={closeModal}
          premiumModalBackdrop={premiumModalBackdrop}
          premiumModal={premiumModal}
          premiumModalHeader={premiumModalHeader}
          premiumModalTitle={premiumModalTitle}
          premiumModalBody={premiumModalBody}
          premiumModalFooter={premiumModalFooter}
          secondaryButton={secondaryButton}
          infoBadge={infoBadge}
          fieldGroup={fieldGroup}
          fieldLabel={fieldLabel}
          fieldValue={fieldValue}
          divider={divider}
        />
      )}

      {modalOpen && modalType === "edit" && (
        <EditModal 
          editData={editData}
          onEditChange={setEditData}
          onSave={handleSaveEdit}
          onCancel={closeModal}
          premiumModalBackdrop={premiumModalBackdrop}
          premiumModal={premiumModal}
          premiumModalHeader={premiumModalHeader}
          premiumModalTitle={premiumModalTitle}
          premiumModalBody={premiumModalBody}
          premiumModalFooter={premiumModalFooter}
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          infoBadge={infoBadge}
          fieldGroup={fieldGroup}
          fieldLabel={fieldLabel}
          premiumInput={premiumInput}
          divider={divider}
        />
      )}

      {modalOpen && modalType === "delete" && deleteConfirmUser && (
        <div style={premiumModalBackdrop}>
          <div style={deleteModal} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={premiumModalHeader}>
              <div className="modal-header-decoration"></div>
              <h3 style={premiumModalTitle}>
                <FiTrash2 size={30} />
                Delete Record
              </h3>
            </div>

            {/* Modal Body */}
            <div style={premiumModalBody}>
              <div style={{ textAlign: "center", padding: "20px 16px" }}>
                <div style={{
                  ...iconBadge,
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  margin: "0 auto 16px"
                }}
                className="icon-badge-pulse">
                  <FiTrash2 size={24} />
                </div>
                <h4 style={{ 
                  fontSize: "18px", 
                  fontWeight: "700", 
                  color: "#111827",
                  marginBottom: "10px" 
                }}>
                  Confirm Deletion
                </h4>
                <p style={{ 
                  fontSize: "0.9em",
                  color: "#6b7280", 
                  marginBottom: "8px",
                  lineHeight: "1.5"
                }}>
                  You are about to permanently delete the record for
                </p>
                <div style={{
                  padding: "12px 16px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  margin: "12px 0",
                  border: "1px solid #e5e7eb"
                }}>
                  <p style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#111827",
                    margin: 0
                  }}>
                    {deleteConfirmUser.name}
                  </p>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 14px",
                  backgroundColor: "#fef3c7",
                  border: "1px solid #fbbf24",
                  borderRadius: "8px",
                  marginTop: "14px"
                }}>
                  <FiAlertCircle size={16} color="#92400e" />
                  <p style={{ 
                    fontSize: "13px",
                    color: "#92400e",
                    margin: 0,
                    fontWeight: "600"
                  }}>
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={premiumModalFooter}>
              <button 
                style={secondaryButton}
                className="premium-button secondary-button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button 
                style={deleteButton}
                className="premium-button delete-button"
                onClick={confirmDelete}
              >
                <FiTrash2 size={16} />
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;