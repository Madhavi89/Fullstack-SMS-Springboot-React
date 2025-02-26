import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
      <header>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3'>
          <a className='navbar-brand' style={{ fontWeight: 'bold', fontSize: '30px' }}>
            Student Management System
          </a>
          <div className="navbar-nav">
            <Link to="/students" className="nav-link">Students</Link>
            <Link to="/departments" className="nav-link">Departments</Link>
          </div>
        </nav>
      </header>
    );
}

export default HeaderComponent;
