import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addStudent, getStudent, updateStudent } from "../../Services/StudentService";
import DepartmentService from "../../Services/DepartmentService"; 
import { validateStudentForm } from "../../Services/ValidationService"; 
import { showSuccessToast, showErrorToast } from "../../Services/NotificationService";

const StudentComponent = () => {
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [departmentId, setDepartmentId] = useState(""); 
    const [departments, setDepartments] = useState([]); 
    const [errors, setErrors] = useState({});

    const { id } = useParams();  
    const navigate = useNavigate();

    // Fetch department list
    useEffect(() => {
        DepartmentService.getDepartments()
            .then(response => {
                const departmentData = Array.isArray(response.data) ? response.data : [response.data];
                setDepartments(departmentData);
            })
            .catch(error => console.error("Error fetching departments:", error));
    }, []);

    // Fetch student data if updating
    useEffect(() => {
        if (id) {
            getStudent(id)
                .then(response => {
                    setStudentName(response.data.studentName);
                    setEmail(response.data.email);
                    setDepartmentId(response.data.departmentId || ""); 
                })
                .catch(error => console.error(error));
        }
    }, [id]);

    const saveOrUpdateStudent = (e) => {
        e.preventDefault();
        const validationErrors = validateStudentForm({ studentName, email, departmentId });

        if (Object.keys(validationErrors).length === 0) {
            const student = { studentName, email, departmentId }; 

            if (id) { 
                updateStudent(id, student)
                    .then(() => {
                    showSuccessToast("Student updated successfully!");
                    navigate('/students');})
                    .catch(error => {
                        showErrorToast("Failed to update student.");
                        console.error(error);
                      });
            } else {              
                addStudent(student)
                  .then(() => {
                    showSuccessToast("Student added successfully!");
                    navigate('/students');
                  })
                  .catch(error => {
                    showErrorToast("Failed to add student.");
                    console.error(error);
                  });
              }   
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="container">
            <br /><br />
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">{id ? "Update Student" : "Add Student"}</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Student Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Student Name"
                                    name="studentName"
                                    value={studentName}
                                    className={`form-control ${errors.studentName ? "is-invalid" : ""}`}
                                    onChange={(e) => setStudentName(e.target.value)}
                                />
                                {errors.studentName && <div className="invalid-feedback">{errors.studentName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter Student Email"
                                    name="email"
                                    value={email}
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Department</label>
                                <select
                                    name="departmentId"
                                    value={departmentId}
                                    className={`form-control ${errors.departmentId ? "is-invalid" : ""}`}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.departmentName}
                                        </option>
                                    ))}
                                </select>
                                {errors.departmentId && <div className="invalid-feedback">{errors.departmentId}</div>}
                            </div>

                            <button type="button" className="btn btn-success" onClick={saveOrUpdateStudent}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentComponent;
