package com.exam.employee.service.impl;

import com.exam.employee.dto.DesignationDto;
import com.exam.employee.entity.Designation;
import com.exam.employee.repository.DesignationRepository;
import com.exam.employee.service.DesignationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class DesignationServiceImpl implements DesignationService {

    private final DesignationRepository designationRepository;

    @Override
    public List<DesignationDto> getAllDesignations() {
        return designationRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public DesignationDto getDesignationById(Long id) {
        Designation designation = designationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Designation not found with ID: " + id));
        return mapToDto(designation);
    }

    @Override
    public DesignationDto saveDesignation(DesignationDto dto) {
        Designation designation;
        if (dto.getDesignationId() != null) {
            designation = designationRepository.findById(dto.getDesignationId())
                    .orElse(new Designation());
        } else {
            designation = new Designation();
        }

        designation.setName(dto.getName());
        designation.setRemark(dto.getRemark());

        Designation saved = designationRepository.save(designation);
        return mapToDto(saved);
    }

    @Override
    public void deleteDesignation(Long id) {
        if (!designationRepository.existsById(id)) {
            throw new IllegalArgumentException("Designation not found with ID: " + id);
        }
        designationRepository.deleteById(id);
    }

    private DesignationDto mapToDto(Designation entity) {
        return new DesignationDto(
                entity.getDesignationId(),
                entity.getName(),
                entity.getRemark()
        );
    }
}
