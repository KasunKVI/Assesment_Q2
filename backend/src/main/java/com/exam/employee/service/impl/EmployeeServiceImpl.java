package com.exam.employee.service.impl;

import com.exam.employee.dto.EmployeeRequest;
import com.exam.employee.dto.EmployeeResponse;
import com.exam.employee.entity.Designation;
import com.exam.employee.entity.Employee;
import com.exam.employee.repository.DesignationRepository;
import com.exam.employee.repository.EmployeeRepository;
import com.exam.employee.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DesignationRepository designationRepository;

    @Override
    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + id));
        return mapToResponse(employee);
    }

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {
        Employee employee = new Employee();
        updateEmployeeEntity(employee, request);
        Employee saved = employeeRepository.save(employee);
        return mapToResponse(saved);
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + id));
        
        updateEmployeeEntity(employee, request);
        Employee updated = employeeRepository.save(employee);
        return mapToResponse(updated);
    }

    @Override
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new IllegalArgumentException("Employee not found with ID: " + id);
        }
        employeeRepository.deleteById(id);
    }

    private void updateEmployeeEntity(Employee employee, EmployeeRequest request) {
        employee.setFullName(request.getFullName());
        employee.setIsManager(request.getIsManager());

        if (request.getDateOfJoining() != null && !request.getDateOfJoining().trim().isEmpty()) {
            employee.setDateOfJoining(parseDate(request.getDateOfJoining()));
        }

        if (request.getDesignationId() != null) {
            Designation designation = designationRepository.findById(request.getDesignationId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid designation ID: " + request.getDesignationId()));
            employee.setDesignation(designation);
        } else {
            employee.setDesignation(null);
        }
    }

    private LocalDateTime parseDate(String dateStr) {
        try {
            if (dateStr.contains("T")) {
                return LocalDateTime.parse(dateStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            } else {
                LocalDate localDate = LocalDate.parse(dateStr, DateTimeFormatter.ISO_LOCAL_DATE);
                return localDate.atStartOfDay();
            }
        } catch (Exception e) {
            return LocalDateTime.now();
        }
    }

    public EmployeeResponse mapToResponse(Employee entity) {
        String designationName = entity.getDesignation() != null ? entity.getDesignation().getName() : "Unassigned";
        Long designationId = entity.getDesignation() != null ? entity.getDesignation().getDesignationId() : null;
        
        String formattedDate = entity.getDateOfJoining() != null
                ? entity.getDateOfJoining().toLocalDate().toString()
                : "";

        return new EmployeeResponse(
                entity.getEmployeeId(),
                entity.getFullName(),
                designationId,
                designationName,
                formattedDate,
                entity.getIsManager()
        );
    }
}
