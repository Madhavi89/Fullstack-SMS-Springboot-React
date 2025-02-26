package com.sms.student_management.service;

import com.sms.student_management.dto.StudentDto;

import java.util.List;

public interface StudentService {

    StudentDto createStudent(StudentDto studentDto);

    //Get Id Method
    StudentDto getStudentById(Long stuid);

    //Get All Students
    List<StudentDto> getAllStudents();

    //Put Update Method
    StudentDto updateStudent(Long stuid, StudentDto studentDto);

    //Delete Method
    void deleteStudent(Long stuid);
}
