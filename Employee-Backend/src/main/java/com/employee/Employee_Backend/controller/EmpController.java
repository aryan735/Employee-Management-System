package com.employee.Employee_Backend.controller;

import com.employee.Employee_Backend.Exceptions.UserNotFoundException;
import com.employee.Employee_Backend.entity.Employee;
import com.employee.Employee_Backend.repo.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@RestController
public class EmpController {


    @Autowired
    private EmpRepo empRepo;


    @PostMapping("/Employee")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public Employee addEmp(@RequestBody Employee emp){
        empRepo.save(emp);
        return emp;
    }


    @GetMapping("/Employee")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
   public List<Employee> getAllEmp(){
        return empRepo.findAll();
    }

    @GetMapping("/Employee/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public Employee getValueById(@PathVariable Long id){
        return empRepo.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    @PutMapping("/Employee/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public Employee updateEmployee(@RequestBody Employee newEmp,@PathVariable Long id){
        return empRepo.findById(id)
                .map(emp ->{
                    emp.setName(newEmp.getName());
                    emp.setAge(newEmp.getAge());
                    emp.setSalary(newEmp.getSalary());
                    return empRepo.save(emp);
                })
                .orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("/Employee/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public String deleteEmp(@PathVariable Long id){
        if(!empRepo.existsById(id)){
            throw  new UserNotFoundException(id);
        }

        //deleting the employee
        empRepo.deleteById(id);

        return "Employee with id " + id + " has been deleted successfully, and IDs adjusted.";

    }




}
