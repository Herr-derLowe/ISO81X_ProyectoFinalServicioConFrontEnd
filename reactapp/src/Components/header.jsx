import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
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
                                <NavLink className="nav-link" aria-current="page" to="/gestiondeducciones">Tipos Deducciones</NavLink>
                            </li>
                            { /* <li className="nav-item">*/}
                            { /* <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>*/}
                            { /*</li>*/}
                            { /* <li className="nav-item">*/}
                            { /* <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>*/}
                            { /*</li>*/}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Header;