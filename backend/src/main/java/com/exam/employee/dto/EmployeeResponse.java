package com.exam.employee.dto;

public class EmployeeResponse {

    private Long employeeId;
    private String fullName;
    private String firstName;
    private String lastName;
    private Long designationId;
    private String designationName;
    private String dateOfJoining;
    private Boolean isManager;

    public EmployeeResponse() {
    }

    public EmployeeResponse(Long employeeId, String fullName, Long designationId, String designationName, String dateOfJoining, Boolean isManager) {
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.designationId = designationId;
        this.designationName = designationName;
        this.dateOfJoining = dateOfJoining;
        this.isManager = isManager != null && isManager;
        
        // Rule: Split full name by first space (" ") -> 1st part = First Name, remaining = Last Name
        splitName(fullName);
    }

    private void splitName(String name) {
        if (name == null || name.trim().isEmpty()) {
            this.firstName = "";
            this.lastName = "";
            return;
        }

        String trimmed = name.trim();
        int spaceIndex = trimmed.indexOf(' ');
        if (spaceIndex > -1) {
            this.firstName = trimmed.substring(0, spaceIndex);
            this.lastName = trimmed.substring(spaceIndex + 1).trim();
        } else {
            this.firstName = trimmed;
            this.lastName = "";
        }
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
        splitName(fullName);
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Long getDesignationId() {
        return designationId;
    }

    public void setDesignationId(Long designationId) {
        this.designationId = designationId;
    }

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
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
        this.isManager = isManager != null && isManager;
    }
}
