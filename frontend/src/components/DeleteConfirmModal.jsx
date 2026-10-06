import React from 'react';

export default function DeleteConfirmModal({ isOpen, employee, onConfirm, onCancel }) {
  if (!isOpen || !employee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{ fontSize: '1.25rem', color: '#f87171', marginBottom: '12px' }}>
          ⚠️ Confirmation on Delete
        </h3>

        <p style={{ color: 'var(--text-main)', marginBottom: '20px', lineHeight: '1.5' }}>
          Are you sure you want to delete employee <strong>#{employee.employeeId} - {employee.fullName}</strong>?
          This action cannot be undone.
        </p>

        <div className="btn-group" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            🗑️ Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
