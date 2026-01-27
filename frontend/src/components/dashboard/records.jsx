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

  return (
    <div className="container">
      {/* Top actions */}
      <div className="top-bar">
        <div className="top-left">
          <h2 className="top-title">Records</h2>
          <button className="btn add-btn" onClick={handleAddClick}>ADD</button>
        </div>
        <div className="top-right">
          {/* page-size controls */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#374151" }}>Show</span>
            <button
              className={`btn page-size-btn ${itemsPerPage === 5 ? "active" : ""}`}
              onClick={() => { setItemsPerPage(5); setCurrentPage(1); }}
              aria-pressed={itemsPerPage === 5}
            >
              5
            </button>
            <button
              className={`btn page-size-btn ${itemsPerPage === 10 ? "active" : ""}`}
              onClick={() => { setItemsPerPage(10); setCurrentPage(1); }}
              aria-pressed={itemsPerPage === 10}
            >
              10
            </button>
          </div>
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
              <button className="btn search-btn">
                🔍 Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export buttons */}
      <div className="export-bar">
        <button className="btn excel-btn">Export Excel</button>
        <button className="btn pdf-btn">Export PDF</button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>PN</th>
              <th>CUC</th>
              <th>OR</th>
              <th>Plate No</th>
              <th>Action</th>
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
                  <button className="action-btn view-btn" title="View" aria-label="View">
                    <FiEye />
                  </button>
                  <button className="action-btn" title="Edit" aria-label="Edit">
                    <FiEdit2 />
                  </button>
                  <button className="action-btn" title="Delete" aria-label="Delete">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls: use page numbers */}
      <div className="pagination" style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <button className="btn" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`btn ${page === currentPage ? "active" : ""}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}

        <button className="btn" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Records;
