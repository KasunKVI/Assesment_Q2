package com.exam.employee.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EmployeeRequest {

    @NotBlank(message = "Full Name is required")
    @Size(max = 45, message = "Full Name must not exceed 45 characters")
    private String fullName;

    private String dateOfJoining; // ISO string format e.g. "2024-02-20" or "2024-02-20T09:30:00"

    private Boolean isManager;

    private Long designationId;

    public EmployeeRequest() {
    }

    public EmployeeRequest(String fullName, String dateOfJoining, Boolean isManager, Long designationId) {
        this.fullName = fullName;
        this.dateOfJoining = dateOfJoining;
        this.isManager = isManager;
        this.designationId = designationId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(String dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public Boolean getIsManager() {
        return isManager != null && isManager;
    }

    public void setIsManager(Boolean isManager) {
        this.isManager = isManager;
    }

    public Long getDesignationId() {
        return designationId;
    }

    public void setDesignationId(Long designationId) {
        this.designationId = designationId;
    }
}
