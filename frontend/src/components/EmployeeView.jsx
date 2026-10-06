import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import DeleteConfirmModal from './DeleteConfirmModal';
import { api } from '../services/api';

const initialForm = {
  employeeId: null,
  fullName: '',
  designationId: '',
  dateOfJoining: new Date().toISOString().split('T')[0],
  isManager: false,
};

export default function EmployeeView() {
  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [empData, desigData] = await Promise.all([
        api.getEmployees(),
        api.getDesignations(),
      ]);
      setEmployees(empData || []);
      setDesignations(desigData || []);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error loading data: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRow = (emp) => {
    setSelectedEmployee(emp);
  };

  // Rule 2: Double-click row populates all employee details into form (except Employee ID which is read-only)
  const handleDoubleClickRow = (emp) => {
    setSelectedEmployee(emp);
    setFormData({
      employeeId: emp.employeeId,
      fullName: emp.fullName || '',
      designationId: emp.designationId || '',
      dateOfJoining: emp.dateOfJoining || new Date().toISOString().split('T')[0],
      isManager: emp.isManager || false,
    });
    setMessage({ type: 'success', text: `Loaded Employee #${emp.employeeId} into form for editing.` });
  };

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      setMessage({ type: 'error', text: 'Full Name is required.' });
      return;
    }
    if (!formData.designationId) {
      setMessage({ type: 'error', text: 'Designation selection is required.' });
      return;
    }

    try {
      setLoading(true);
      const isEdit = formData.employeeId != null;

      const payload = {
        fullName: formData.fullName,
        designationId: Number(formData.designationId),
        dateOfJoining: formData.dateOfJoining,
        isManager: formData.isManager,
      };

      if (isEdit) {
        await api.updateEmployee(formData.employeeId, payload);
        setMessage({ type: 'success', text: `Employee #${formData.employeeId} updated successfully.` });
      } else {
        await api.createEmployee(payload);
        setMessage({ type: 'success', text: 'New Employee created successfully.' });
      }

      handleResetForm();
      loadData();
    } catch (err) {
      setMessage({ type: 'error', text: 'Save failed: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!formData.employeeId) return;
    try {
      setLoading(true);
      await api.deleteEmployee(formData.employeeId);
      setMessage({ type: 'success', text: `Employee #${formData.employeeId} deleted.` });
      setIsDeleteModalOpen(false);
      handleResetForm();
      loadData();
    } catch (err) {
      setMessage({ type: 'error', text: 'Delete failed: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData(initialForm);
    setSelectedEmployee(null);
  };

  const handleNewForm = () => {
    setFormData(initialForm);
    setSelectedEmployee(null);
    setMessage(null);
  };

  return (
    <div>
      {message && (
        <div className={`toast-bar ${message.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* Table E Component */}
      <EmployeeTable
        employees={employees}
        selectedEmployeeId={selectedEmployee?.employeeId}
        onSelectEmployee={handleSelectRow}
        onDoubleClickEmployee={handleDoubleClickRow}
        onRefresh={loadData}
        onAddNew={handleNewForm}
      />

      {/* Add/Edit/Delete Form Component */}
      <EmployeeForm
        formData={formData}
        setFormData={setFormData}
        designations={designations}
        onSave={handleSave}
        onNew={handleNewForm}
        onReset={handleResetForm}
        onRequestDelete={() => setIsDeleteModalOpen(true)}
        isEditMode={formData.employeeId != null}
        loading={loading}
      />

      {/* Confirmation on Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        employee={formData.employeeId ? formData : null}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
