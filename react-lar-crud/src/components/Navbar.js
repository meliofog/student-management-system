import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg bg-dark shadow">
            <div className="container">
                <Link className="navbar-brand text-light" to="#">Student Management System - CISI 4</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link text-primary active" aria-current="page" to="/">Home</Link>
                    <Link className="nav-link text-primary" to="/about">About Us</Link>
                    <Link className="nav-link text-primary" to="/students">Student</Link>
                </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;