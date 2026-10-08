package com.exam.employee.service;

import com.exam.employee.dto.EmployeeRequest;
import com.exam.employee.dto.EmployeeResponse;
import org.springframework.stereotype.Service;


import java.util.List;

public interface EmployeeService {

    List<EmployeeResponse> getAllEmployees();
    EmployeeResponse getEmployeeById(Long id);
    EmployeeResponse createEmployee(EmployeeRequest request);
    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);
    void deleteEmployee(Long id);
}
