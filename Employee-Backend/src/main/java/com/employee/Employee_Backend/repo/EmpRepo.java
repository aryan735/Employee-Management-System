package com.employee.Employee_Backend.repo;


import com.employee.Employee_Backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface EmpRepo extends JpaRepository<Employee,Long> {
    List<Employee> findAllByIdGreaterThan(Long id);
}
