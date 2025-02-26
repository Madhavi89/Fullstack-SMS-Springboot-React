package com.sms.student_management.controller;

import com.sms.student_management.dto.StudentDto;
import com.sms.student_management.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/students")
public class StudentController {

       private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto){
        StudentDto savedStudent = studentService.createStudent(studentDto);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    //Build Get Student REST API
    @GetMapping("/{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") Long stuid) {
        StudentDto getStudent = studentService.getStudentById(stuid);
        return ResponseEntity.ok(getStudent);
    }

    //Build Get All Student REST API
    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    //Build Get All Student REST API
    @PutMapping("/{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long stuid, @RequestBody StudentDto studentDto) {
        StudentDto updatedStudent = studentService.updateStudent(stuid, studentDto);
        return ResponseEntity.ok(updatedStudent);
    }

    //Build Delete Method
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") Long stuid){
        studentService.deleteStudent(stuid);
        return ResponseEntity.ok("Student deleted successfully!");
    }
}
