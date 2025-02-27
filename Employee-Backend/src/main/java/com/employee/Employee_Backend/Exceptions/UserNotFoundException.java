package com.employee.Employee_Backend.Exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Could not found the user "+id);
    }
}
