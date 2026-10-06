package com.exam.employee.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "designation")
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "designation_id")
    private Long designationId;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "remark", length = 100)
    private String remark;

    public Designation() {
    }

    public Designation(Long designationId, String name, String remark) {
        this.designationId = designationId;
        this.name = name;
        this.remark = remark;
    }

    public Long getDesignationId() {
        return designationId;
    }

    public void setDesignationId(Long designationId) {
        this.designationId = designationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
