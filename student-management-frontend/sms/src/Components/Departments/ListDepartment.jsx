import { useEffect, useState } from "react";
import DepartmentService from "../../Services/DepartmentService";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const ListDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
        const response = await DepartmentService.getDepartments();
        console.log("Fetched Departments:", response.data); // Debugging
        setDepartments(response.data);
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
};

  const handleDeleteDepartment = async (id) => {
    try {
      await DepartmentService.deleteDepartment(id);
      setDepartments(departments.filter((dept) => dept.id !== id));
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Department List</h2>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/add-department")}
      >
        Add Department
      </button>
      <table className="table table-striped fixed-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td> 
              <td>{department.departmentDescription}</td>              
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate(`/updatedepartment/${department.id}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDeleteDepartment(department.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartment;
