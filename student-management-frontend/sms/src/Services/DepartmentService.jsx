import axios from "axios";

const DEPARTMENT_API_BASE_URL = "http://localhost:8080/api/departments"; // Adjust based on your backend

class DepartmentService {
  getDepartments() {
    return axios.get(DEPARTMENT_API_BASE_URL);
  }

  getDepartmentById(id) {
    return axios.get(`${DEPARTMENT_API_BASE_URL}/${id}`);
  }

  createDepartment(department) {
    return axios.post(DEPARTMENT_API_BASE_URL, department);
  }

  updateDepartment(id, department) {
    return axios.put(`${DEPARTMENT_API_BASE_URL}/${id}`, department);
  }

  deleteDepartment(id) {
    return axios.delete(`${DEPARTMENT_API_BASE_URL}/${id}`);
  }
}

export default new DepartmentService();
