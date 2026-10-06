package com.exam.employee.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee")
    private Long employeeId;

    @Column(name = "full_name", length = 45)
    private String fullName;

    @Column(name = "date_of_joining")
    private LocalDateTime dateOfJoining;

    @Column(name = "is_manager")
    private Boolean isManager;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "designation_id")
    private Designation designation;

    public Employee() {
    }

    public Employee(Long employeeId, String fullName, LocalDateTime dateOfJoining, Boolean isManager, Designation designation) {
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.dateOfJoining = dateOfJoining;
        this.isManager = isManager != null ? isManager : false;
        this.designation = designation;
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
    }

    public LocalDateTime getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDateTime dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public Boolean getIsManager() {
        return isManager != null ? isManager : false;
    }

    public void setIsManager(Boolean isManager) {
        this.isManager = isManager != null ? isManager : false;
    }

    public Designation getDesignation() {
        return designation;
    }

    public void setDesignation(Designation designation) {
        this.designation = designation;
    }
}
