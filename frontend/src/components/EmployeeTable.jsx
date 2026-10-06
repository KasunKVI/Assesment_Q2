import React from 'react';

export default function EmployeeTable({ employees, selectedEmployeeId, onSelectEmployee, onDoubleClickEmployee, onRefresh, onAddNew }) {
  return (
    <div className="glass-card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#60a5fa' }}>📊 View/Add Employee (Table E)</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            💡 Tip: Double-click any row in Table E to edit employee details below.
          </p>
        </div>

        <div className="btn-group" style={{ margin: 0 }}>
          <button className="btn btn-secondary" onClick={onRefresh}>
            🔄 Refresh
          </button>
          <button className="btn btn-primary" onClick={onAddNew}>
            ➕ Add New
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Designation</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Join</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>
                  No employees found. Click "Add New" to create one.
                </td>
              </tr>
            ) : (
              employees.map((emp) => {
                const isSelected = selectedEmployeeId === emp.employeeId;
                return (
                  <tr
                    key={emp.employeeId}
                    className={isSelected ? 'selected' : ''}
                    onClick={() => onSelectEmployee(emp)}
                    onDoubleClick={() => onDoubleClickEmployee(emp)}
                  >
                    <td style={{ fontWeight: '700', color: 'var(--primary)' }}>#{emp.employeeId}</td>
                    <td style={{ fontWeight: '600' }}>{emp.designationName || 'Unassigned'}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName || '-'}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{emp.dateOfJoining || '-'}</td>
                    <td>
                      <span className={`badge ${emp.isManager ? 'badge-manager' : 'badge-staff'}`}>
                        {emp.isManager ? 'Manager' : 'Staff'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
