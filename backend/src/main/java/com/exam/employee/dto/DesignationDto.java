package com.exam.employee.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DesignationDto {

    private Long designationId;

    @NotBlank(message = "Designation name is required")
    @Size(max = 45, message = "Designation name must not exceed 45 characters")
    private String name;

    @Size(max = 100, message = "Remark must not exceed 100 characters")
    private String remark;

    public DesignationDto() {
    }

    public DesignationDto(Long designationId, String name, String remark) {
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
