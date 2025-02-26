package com.sms.student_management.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//1. Create a Custom Exception: ResourceNotFoundException
//Place this class in a package such as com.sms.student_management.exception:
//@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFound extends RuntimeException {
    public ResourceNotFound(String message) {

        super(message);
    }
}