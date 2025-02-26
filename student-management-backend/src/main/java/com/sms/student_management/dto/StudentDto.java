package com.sms.student_management.dto;

public class StudentDto {
    //Data transfer objects between client and server
    private Long id;
    private String studentName;
    private String email;
    private Long departmentId;

    public StudentDto(Long id, String studentName, String email, Long departmentId) {
        this.id = id;
        this.studentName = studentName;
        this.email = email;
        this.departmentId = departmentId;
    }

    //Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long department) {
        this.departmentId = department;
    }

    public StudentDto() {
    }
}
