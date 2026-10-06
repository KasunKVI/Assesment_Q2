import React from 'react';

export default function EmployeeForm({
  formData,
  setFormData,
  designations,
  onSave,
  onNew,
  onReset,
  onRequestDelete,
  isEditMode,
  loading
}) {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="glass-card">
      <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#22d3ee' }}>
        📝 Add/Edit/Delete Employee Form
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Employee ID */}
          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-input"
              value={formData.employeeId ? `#${formData.employeeId}` : '(Auto Generated)'}
              readOnly
            />
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              maxLength={45}
              placeholder="e.g. John Michael Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              * First space splits First Name & Last Name
            </span>
          </div>

          {/* Designation dropdown */}
          <div className="form-group">
            <label className="form-label">Designation *</label>
            <select
              name="designationId"
              className="form-select"
              value={formData.designationId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Designation --</option>
              {designations.map((d) => (
                <option key={d.designationId} value={d.designationId}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date of Join */}
          <div className="form-group">
            <label className="form-label">Date of Join *</label>
            <input
              type="date"
              name="dateOfJoining"
              className="form-input"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Is Manager Checkbox */}
        <div className="form-group" style={{ marginTop: '8px' }}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isManager"
              className="checkbox-custom"
              checked={formData.isManager}
              onChange={handleChange}
            />
            Is Manager
          </label>
        </div>

        {/* Action Buttons: Delete, New, Reset, Save */}
        <div className="btn-group" style={{ justifyContent: 'space-between', marginTop: '24px' }}>
          <div>
            {isEditMode && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={onRequestDelete}
                disabled={loading}
              >
                🗑️ Delete
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onNew}
            >
              ➕ New
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onReset}
            >
              🔄 Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              💾 Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
