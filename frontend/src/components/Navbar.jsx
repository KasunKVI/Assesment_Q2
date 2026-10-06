import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="nav-container">

      <nav className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'designation' ? 'active' : ''}`}
          onClick={() => setActiveTab('designation')}
        >
          🏷️ Designation
        </button>
        <button
          className={`tab-btn ${activeTab === 'employee' ? 'active' : ''}`}
          onClick={() => setActiveTab('employee')}
        >
          👥 View/Add Employee
        </button>
      </nav>
    </header>
  );
}
