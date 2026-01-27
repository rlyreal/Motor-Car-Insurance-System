import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/record.css";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const Records = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/menu');
  };

  // Add users state and pagination state (show 5 users per page)
  const [users, setUsers] = useState([
    // sample users; replace with real data when available
    { id: 1, name: "Sample Name 1", pn: "10001", cuc: "CUC001", or: "OR001", plate: "ABC-001" },
    { id: 2, name: "Sample Name 2", pn: "10002", cuc: "CUC002", or: "OR002", plate: "ABC-002" },
    { id: 3, name: "Sample Name 3", pn: "10003", cuc: "CUC003", or: "OR003", plate: "ABC-003" },
    { id: 4, name: "Sample Name 4", pn: "10004", cuc: "CUC004", or: "OR004", plate: "ABC-004" },
    { id: 5, name: "Sample Name 5", pn: "10005", cuc: "CUC005", or: "OR005", plate: "ABC-005" },
    { id: 6, name: "Sample Name 6", pn: "10006", cuc: "CUC006", or: "OR006", plate: "ABC-006" },
    { id: 7, name: "Sample Name 7", pn: "10007", cuc: "CUC007", or: "OR007", plate: "ABC-007" }
  ]);

  // items per page becomes selectable by admin (5 or 10)
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // total pages is number of groups of 5 (1 => up to 5 items, 2 => up to 10, etc.)
  const totalPages = Math.max(1, Math.ceil(users.length / itemsPerPage));

  // clamp currentPage when users change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [users.length, currentPage, totalPages]);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIdx, startIdx + itemsPerPage);

  const goToPage = (n) => setCurrentPage(Math.min(Math.max(1, n), totalPages));
  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  // --- modal / edit state & handlers ---
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'view' | 'edit' | 'delete'
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState(null);

  const openView = (user) => {
    setSelectedUser(user);
    setModalType("view");
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setEditData({ ...user });
    setModalType("edit");
    setModalOpen(true);
  };

  // REPLACED: openDeleteConfirm now tries to load SweetAlert2 dynamically and falls back to window.confirm
  const openDeleteConfirm = async (user) => {
    try {
      const Swal = (await import("sweetalert2")).default;
      const result = await Swal.fire({
        title: "Are you sure?",
        html: `
          <div style="display:flex;gap:12px;align-items:center">
            <div style="width:52px;height:52px;border-radius:10px;background:#fff4f2;display:flex;align-items:center;justify-content:center;font-size:22px">🗑️</div>
            <div style="text-align:left">
              <div style="font-weight:600">${user.name}</div>
              <div style="color:#6b7280;font-size:13px">This action cannot be undone.</div>
            </div>
          </div>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "swal2-modern-popup",
          confirmButton: "swal2-confirm-btn",
          cancelButton: "swal2-cancel-btn"
        },
        buttonsStyling: false,
        reverseButtons: true
      });

      if (result.isConfirmed) {
        setUsers((prev) => {
          const newUsers = prev.filter((u) => u.id !== user.id);
          setCurrentPage((p) => Math.min(p, Math.max(1, Math.ceil(newUsers.length / itemsPerPage))));
          return newUsers;
        });

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Record deleted",
          showConfirmButton: false,
          timer: 1400
        });
      }
    } catch (err) {
      // fallback when sweetalert2 is not installed or import fails
      const ok = window.confirm(`Delete record for "${user.name}"?\nThis action cannot be undone.`);
      if (ok) {
        setUsers((prev) => {
          const newUsers = prev.filter((u) => u.id !== user.id);
          setCurrentPage((p) => Math.min(p, Math.max(1, Math.ceil(newUsers.length / itemsPerPage))));
          return newUsers;
        });
        // lightweight feedback
        try { window.alert("Record deleted"); } catch {}
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedUser(null);
    setEditData(null);
  };

  const handleSaveEdit = () => {
    if (!editData) return;
    setUsers((prev) => prev.map((u) => (u.id === editData.id ? editData : u)));
    closeModal();
  };

  const confirmDelete = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    // adjust current page if needed
    setCurrentPage((p) => Math.min(p, Math.max(1, Math.ceil((users.length - 1) / itemsPerPage))));
    closeModal();
  };
  // --- end modal / edit state & handlers ---

  // Define header cell style with proper borders for sticky behavior
  const headerStyle = {
    position: "sticky",
    top: 0,
    backgroundColor: "#0f5132",
    color: "#ffffff",
    padding: "18px 16px",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    zIndex: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    borderTop: "2px solid #0a3d25",
    borderBottom: "2px solid #0a3d25"
  };

  // Common button style to remove borders
  const noBorderStyle = { border: "none" };

  return (
    <div className="container">
      {/* Top actions */}
      <div className="top-bar">
        <div className="top-left">
          <h2 className="top-title">Records</h2>
          <button className="btn add-btn" onClick={handleAddClick} style={noBorderStyle}>ADD</button>
        </div>
      </div>

      {/* Search section */}
      <div className="search-bar">
        <div className="date-group">
          <div className="field">
            <label>From</label>
            <input type="date" />
          </div>

          <div className="field">
            <label>To</label>
            <input type="date" />
          </div>

          <div className="field search-field">
            <label>Search</label>
            <div className="search-input-group">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter name or plate no..."
                className="search-input"
              />
              <button className="btn search-btn" style={noBorderStyle}>
                🔍 Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export buttons */}
      <div className="export-bar">
        <button className="btn excel-btn" style={noBorderStyle}>Export Excel</button>
        <button className="btn pdf-btn" style={noBorderStyle}>Export PDF</button>
      </div>

      {/* Table with sticky header */}
      <div className="table-wrapper">
        <table style={{ borderCollapse: "separate", borderSpacing: 0 }}>
          <thead>
            <tr>
              <th style={headerStyle}>NAME</th>
              <th style={headerStyle}>PN</th>
              <th style={headerStyle}>CUC</th>
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
                <td>{u.cuc}</td>
                <td>{u.or}</td>
                <td>{u.plate}</td>
                <td>
                  {/* view opens view modal */}
                  <button
                    className="action-btn view-btn"
                    title="View"
                    aria-label="View"
                    onClick={() => openView(u)}
                    style={noBorderStyle}
                  >
                    <FiEye />
                  </button>

                  {/* edit opens edit modal */}
                  <button
                    className="action-btn edit-btn"
                    title="Edit"
                    aria-label="Edit"
                    onClick={() => openEdit(u)}
                    style={noBorderStyle}
                  >
                    <FiEdit2 />
                  </button>

                  {/* delete opens stylish confirmation modal */}
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

      {/* Pagination controls - Show and Page navigation on same line with proper alignment */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginTop: "16px" 
      }}>
        {/* Left: Show 5/10 */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#374151" }}>Show</span>
          <button
            className={`btn page-size-btn ${itemsPerPage === 5 ? "active" : ""}`}
            onClick={() => { setItemsPerPage(5); setCurrentPage(1); }}
            aria-pressed={itemsPerPage === 5}
            style={noBorderStyle}
          >
            5
          </button>
          <button
            className={`btn page-size-btn ${itemsPerPage === 10 ? "active" : ""}`}
            onClick={() => { setItemsPerPage(10); setCurrentPage(1); }}
            aria-pressed={itemsPerPage === 10}
            style={noBorderStyle}
          >
            10
          </button>
        </div>

        {/* Right: Prev/Next navigation - aligned properly */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="page-btn" onClick={handlePrev} disabled={currentPage === 1} style={noBorderStyle}>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`page-btn ${page === currentPage ? "active" : ""}`}
                aria-current={page === currentPage ? "page" : undefined}
                style={noBorderStyle}
              >
                {page}
              </button>
            );
          })}

          <button className="page-btn" onClick={handleNext} disabled={currentPage === totalPages} style={noBorderStyle}>
            Next
          </button>
        </div>
      </div>

      {/* Modal: view / edit / delete */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className={`modal ${modalType === "edit" ? "modal-edit" : modalType === "view" ? "modal-view" : modalType === "delete" ? "modal-delete" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalType === "view" ? "View Record" : modalType === "edit" ? "Edit Record" : "Delete Record"}
              </h3>
              <button className="modal-close" onClick={closeModal} aria-label="Close" style={noBorderStyle}>✕</button>
            </div>

            <div className="modal-body">
              {modalType === "view" && selectedUser && (
                <>
                  <div className="modal-field"><label>Name</label><div className="modal-value view-value">{selectedUser.name}</div></div>
                  <div className="modal-field"><label>PN</label><div className="modal-value view-value">{selectedUser.pn}</div></div>
                  <div className="modal-field"><label>CUC</label><div className="modal-value view-value">{selectedUser.cuc}</div></div>
                  <div className="modal-field"><label>OR</label><div className="modal-value view-value">{selectedUser.or}</div></div>
                  <div className="modal-field"><label>Plate No</label><div className="modal-value view-value">{selectedUser.plate}</div></div>
                </>
              )}

              {modalType === "edit" && editData && (
                <>
                  <div className="modal-field">
                    <label>Name</label>
                    <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                  </div>
                  <div className="modal-field">
                    <label>PN</label>
                    <input value={editData.pn} onChange={(e) => setEditData({ ...editData, pn: e.target.value })} />
                  </div>
                  <div className="modal-field">
                    <label>CUC</label>
                    <input value={editData.cuc} onChange={(e) => setEditData({ ...editData, cuc: e.target.value })} />
                  </div>
                  <div className="modal-field">
                    <label>OR</label>
                    <input value={editData.or} onChange={(e) => setEditData({ ...editData, or: e.target.value })} />
                  </div>
                  <div className="modal-field">
                    <label>Plate No</label>
                    <input value={editData.plate} onChange={(e) => setEditData({ ...editData, plate: e.target.value })} />
                  </div>
                </>
              )}

              {modalType === "delete" && selectedUser && (
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ flexShrink: 0 }}>
                    <div className="delete-icon" aria-hidden>🗑️</div>
                  </div>
                  <div>
                    <p style={{ marginBottom: 8 }}>Are you sure you want to delete the record for <strong>{selectedUser.name}</strong>?</p>
                    <p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>This action cannot be undone.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              {modalType === "view" && <button className="modal-btn" onClick={closeModal} style={noBorderStyle}>Close</button>}
              {modalType === "edit" && (
                <>
                  <button className="modal-btn" onClick={closeModal} style={noBorderStyle}>Cancel</button>
                  <button className="modal-save" onClick={handleSaveEdit} style={noBorderStyle}>Save</button>
                </>
              )}
              {modalType === "delete" && (
                <>
                  <button className="modal-btn" onClick={closeModal} style={noBorderStyle}>Cancel</button>
                  <button className="modal-save modal-delete-btn" onClick={confirmDelete} style={noBorderStyle}>Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;