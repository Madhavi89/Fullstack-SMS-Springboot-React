import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ListStudentComponent from './Components/Students/ListStudentComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentComponent from './Components/Students/StudentComponent';
import Department from "./Components/Departments/Department";
import ListDepartment from "./Components/Departments/ListDepartment";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mt-4">
      <ToastContainer />
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<ListStudentComponent />} />
          <Route path="/students" element={<ListStudentComponent />} />
          <Route path="/add-student" element={<StudentComponent />} />
          <Route path="/update-student/:id" element={<StudentComponent />} />

          {/* Department Routes */}
          <Route path="/departments" element={<ListDepartment />} />
          <Route path="/add-department" element={<Department />} />
          <Route path="/updateDepartment/:id" element={<Department />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
