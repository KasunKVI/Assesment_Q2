import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function DesignationView({ onDesignationChange }) {
  const [designations, setDesignations] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadDesignations();
  }, []);

  const loadDesignations = async () => {
    try {
      setLoading(true);
      const data = await api.getDesignations();
      setDesignations(data || []);
      if (onDesignationChange) onDesignationChange();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load designations: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Designation Name is required.' });
      return;
    }

    try {
      setLoading(true);
      await api.saveDesignation({ designationId: id, name, remark });
      setMessage({ type: 'success', text: `Designation '${name}' saved successfully.` });
      handleReset();
      loadDesignations();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error saving designation: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setId(item.designationId);
    setName(item.name || '');
    setRemark(item.remark || '');
    setMessage(null);
  };

  const handleDelete = async (desigId) => {
    if (!window.confirm('Are you sure you want to delete this designation?')) return;
    try {
      setLoading(true);
      await api.deleteDesignation(desigId);
      setMessage({ type: 'success', text: 'Designation deleted successfully.' });
      loadDesignations();
    } catch (err) {
      setMessage({ type: 'error', text: 'Cannot delete designation: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setId(null);
    setName('');
    setRemark('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
      {/* Add / Edit Designation Form */}
      <div className="glass-card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#60a5fa' }}>
          {id ? '✏️ Edit Designation' : '➕ Add New Designation'}
        </h2>

        {message && (
          <div className={`toast-bar ${message.type === 'error' ? 'toast-error' : 'toast-success'}`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Designation Name *</label>
            <input
              type="text"
              className="form-input"
              maxLength={45}
              placeholder="e.g. Senior Software Engineer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Remark</label>
            <input
              type="text"
              className="form-input"
              maxLength={100}
              placeholder="e.g. Engineering Department"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              💾 Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>
        </form>
      </div>

      {/* Designation List Table */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#22d3ee' }}>📋 Designation List</h2>
          <button className="btn btn-secondary" onClick={loadDesignations} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
            🔄 Refresh
          </button>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Remark</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>
                    No designations found.
                  </td>
                </tr>
              ) : (
                designations.map((item) => (
                  <tr key={item.designationId}>
                    <td style={{ fontWeight: '700', color: 'var(--primary)' }}>#{item.designationId}</td>
                    <td style={{ fontWeight: '600' }}>{item.name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{item.remark || '-'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', marginRight: '12px', fontWeight: '600' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.designationId)}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: '600' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
