import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listStudents, deleteStudent } from "../../Services/StudentService";
import DepartmentService from "../../Services/DepartmentService";
import { showSuccessToast, showErrorToast } from "../../Services/NotificationService";
import "../../App.css";

const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [departments, setDepartments] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5; // ✅ Change this number to set how many students per page
    const [loading, setLoading] = useState(true); // Tracks loading state


    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        Promise.all([listStudents(), DepartmentService.getDepartments()])
            .then(([studentRes, deptRes]) => {
                setStudents(studentRes.data);

                const departmentMap = {};
                deptRes.data.forEach(dept => {
                    departmentMap[dept.id] = dept.departmentName;
                });
                setDepartments(departmentMap);
            })
            .catch(error => console.error("Error fetching data:", error))
            .finally(() => setLoading(false)); // Stop loading after API calls
    }, []);


    const handleDeleteStudent = (studentId) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            deleteStudent(studentId)
                .then(() => {
                    setStudents(students.filter(student => student.id !== studentId));
                    showSuccessToast("Student deleted successfully!");
                })
                .catch(error => {
                    showErrorToast("Failed to delete student.");
                    console.error(error);
                });
        }
    };

    const handleSort = (field) => {
        const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(newOrder);
    };

    const sortedStudents = [...students].sort((a, b) => {
        if (!sortField) return 0;

        let valueA, valueB;
        if (sortField === "studentName" || sortField === "email") {
            valueA = a[sortField].toLowerCase();
            valueB = b[sortField].toLowerCase();
        } else if (sortField === "departmentId") {
            valueA = departments[a.departmentId] || "";
            valueB = departments[b.departmentId] || "";
        } else {
            valueA = a[sortField];
            valueB = b[sortField];
        }

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    const filteredStudents = sortedStudents.filter(student => {
        const matchesSearch = searchTerm === "" ||
            student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = selectedDepartment === "" ||
            student.departmentId === parseInt(selectedDepartment);

        return matchesSearch && matchesDepartment;
    });

    // ✅ Pagination Logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    return (
        loading ? (
            <div className="text-center mt-4"><strong>Loading...</strong></div>
        ) : (
        <div className="container">
            <h2 className="text-center">List of Students</h2>

            {/* ✅ Search & Filter Section */}
            <div className="mb-3 d-flex justify-content-between">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="form-control w-25"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                    <option value="">All Departments</option>
                    {Object.keys(departments).map((deptId) => (
                        <option key={deptId} value={deptId}>
                            {departments[deptId]}
                        </option>
                    ))}
                </select>
            </div>

            {/* ✅ Add Student Button */}
            <button className="btn btn-primary mb-3" onClick={() => navigate('/add-student')}>
                Add Student
            </button>

            {/* ✅ Students Table with Sorting & Pagination */}
            <table className="table table-striped custom-hover word-wrap: break-word fixed-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                            Student Number {sortField === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th onClick={() => handleSort("studentName")} style={{ cursor: "pointer" }}>
                            Student Name {sortField === "studentName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                            Student Email {sortField === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th onClick={() => handleSort("departmentId")} style={{ cursor: "pointer" }}>
                            Student Department {sortField === "departmentId" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {currentStudents.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center"><strong>No students found</strong></td>
                    </tr>
                ) : (
                    currentStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.studentName}</td>
                            <td>{student.email}</td>
                            <td>{departments[student.departmentId] || "Unknown"}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => navigate(`/update-student/${student.id}`)}>Edit</button>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}

                </tbody>
            </table>

            {/* ✅ Pagination Controls */}
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-secondary mx-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                <ul className="pagination mx-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    className="btn btn-secondary mx-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>

        </div>
    ));
}

export default ListStudentComponent;
