import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <nav className="navbar navbar-expand-xl navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/home">Sistema Nominas</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/empleados/*">Empleados</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/ingresos">Tipos Ingresos</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/gestiondeducciones">Tipos Deducciones</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/transacciones">Transacciones</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/asientos">Asientos Contables</NavLink>
                            </li>
                            { /* <li className="nav-item">*/}
                            { /* <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>*/}
                            { /*</li>*/}
                            { /* <li className="nav-item">*/}
                            { /* <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>*/}
                            { /*</li>*/}
                        </ul>
                        {sessionStorage.getItem("username") ? (
                            <div className="d-flex">
                                <p className="navbar-text">User: {sessionStorage.getItem("username")}</p>
                                &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-outline-danger" onClick={
                                    () => {
                                        sessionStorage.removeItem("token");
                                        sessionStorage.removeItem("username");
                                        navigate("/");
                                    }
                                }>Logout</button>
                            </div>
                        ) : (
                            <div className="d-flex">
                                <NavLink className="btn btn-outline-primary" to="/">Login</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Header;