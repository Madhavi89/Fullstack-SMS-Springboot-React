package com.sms.student_management.mapper;

import com.sms.student_management.dto.StudentDto;
import com.sms.student_management.entity.Student;
import lombok.AllArgsConstructor;

public class StudentMapper {
    public static StudentDto mapToStudentDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getStudentName(),
                student.getEmail(),
                student.getDepartment().getId()
        );
    }

    public static Student mapToStudent(StudentDto studentDto) {
        Student student = new Student();
        student.setId(studentDto.getId());
        student.setStudentName(studentDto.getStudentName());
        student.setEmail(studentDto.getEmail());
        return student;
    }
}
