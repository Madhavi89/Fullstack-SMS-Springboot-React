import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentService from "../../Services/DepartmentService";

const Department = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      DepartmentService.getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error("Error fetching department:", error);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const departmentData = { departmentName, departmentDescription };

      if (id) {
        await DepartmentService.updateDepartment(id, departmentData);
      } else {
        await DepartmentService.createDepartment(departmentData);
      }
      navigate("/departments");
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">{id ? "Update" : "Add"} Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Department Name</label>
          <input
            type="text"
            className="form-control"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department Description</label>
          <input
            type="text"
            className="form-control"
            value={departmentDescription}
            onChange={(e) => setDepartmentDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {id ? "Update" : "Save"}
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate("/departments")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Department;
