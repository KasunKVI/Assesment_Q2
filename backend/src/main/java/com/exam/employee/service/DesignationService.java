package com.exam.employee.service;


import com.exam.employee.dto.DesignationDto;
import org.springframework.stereotype.Service;


import java.util.List;

public interface DesignationService {

     List<DesignationDto> getAllDesignations();
     DesignationDto getDesignationById(Long id);
     DesignationDto saveDesignation(DesignationDto dto);
     void deleteDesignation(Long id);

}
