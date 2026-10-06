const BASE_URL = 'http://localhost:8080/api';

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP Error ${response.status}`);
  }
  if (response.status === 240 || response.status === 204) {
    return null;
  }
  return response.json();
}

export const api = {
  // Designations
  async getDesignations() {
    const res = await fetch(`${BASE_URL}/designations`);
    return handleResponse(res);
  },

  async saveDesignation(dto) {
    const isEdit = dto.designationId != null;
    const url = isEdit ? `${BASE_URL}/designations/${dto.designationId}` : `${BASE_URL}/designations`;
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    return handleResponse(res);
  },

  async deleteDesignation(id) {
    const res = await fetch(`${BASE_URL}/designations/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },

  // Employees
  async getEmployees() {
    const res = await fetch(`${BASE_URL}/employees`);
    return handleResponse(res);
  },

  async createEmployee(data) {
    const res = await fetch(`${BASE_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async updateEmployee(id, data) {
    const res = await fetch(`${BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteEmployee(id) {
    const res = await fetch(`${BASE_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },
};
