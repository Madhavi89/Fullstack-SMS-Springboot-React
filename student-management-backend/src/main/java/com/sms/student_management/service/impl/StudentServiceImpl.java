package com.sms.student_management.service.impl;
import com.sms.student_management.dto.StudentDto;
import com.sms.student_management.entity.Department;
import com.sms.student_management.entity.Student;
import com.sms.student_management.exception.ResourceNotFound;
import com.sms.student_management.mapper.StudentMapper;
import com.sms.student_management.repository.DepartmentRepository;
import com.sms.student_management.repository.StudentRepository;
import com.sms.student_management.service.StudentService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;

    private DepartmentRepository departmentRepository;

    public StudentServiceImpl(StudentRepository studentRepository, DepartmentRepository departmentRepository) {
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        //print
        System.out.println("DTO studentName = " + studentDto.getStudentName());
        Student student = StudentMapper.mapToStudent(studentDto);

        Department department = departmentRepository.findById(studentDto.getDepartmentId())
                .orElseThrow(()-> new ResourceNotFound("Department was not found with id: "
                        + studentDto.getDepartmentId()));
        student.setDepartment(department);
        Student savedStudent =  studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new ResourceNotFound("Student was not found with given id: " + studentId));
        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> studentList =  studentRepository.findAll();
        return studentList.stream()
                .map(StudentMapper::mapToStudentDto)
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto studentDto) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new ResourceNotFound("Student was not found with given id: " + studentId));

        student.setStudentName(studentDto.getStudentName());
        student.setEmail(studentDto.getEmail());

        Department department = departmentRepository.findById(studentDto.getDepartmentId())
                .orElseThrow(()-> new ResourceNotFound("Department was not found with id: "
                        + studentDto.getDepartmentId()));
        student.setDepartment(department);

        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new ResourceNotFound("Student was not found with given id: " + studentId));
        studentRepository.deleteById(studentId);
    }
}