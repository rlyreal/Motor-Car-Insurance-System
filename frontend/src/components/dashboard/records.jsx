import React, { useState } from "react";
import "../../styles/record.css";

const Records = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="container">
      {/* Top actions */}
      <div className="top-bar">
        <div></div>
        <button className="btn add-btn">ADD</button>
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
            <tr>
              <td>Sample Name</td>
              <td>12345</td>
              <td>CUC001</td>
              <td>OR123</td>
              <td>ABC-123</td>
              <td>
                <button className="action-btn view-btn" title="View">👁️</button>
                <button className="action-btn" title="Edit">✏️</button>
                <button className="action-btn" title="Delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Records;
