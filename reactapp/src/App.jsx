import "./App.css";
import React, { Component } from "react";
import { Home } from "./Pages/Home";
import { GestionDeducciones } from "./Pages/GestionDeducciones";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/header";
import Footer from "./Components/footer";
import { DashboardEmpleados } from "./Pages/EmpleadosModule/DashboardEmpleados";
import { Ingresos } from "./Pages/Ingresos";
import { Transacciones } from "./Pages/Transacciones";
import { Asientos } from "./Pages/Asientos";
import { Context } from "./context/Context";
import { Login } from "./Pages/login/Login";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div className="AppBody">
                <div className="content-wrap">
                    <Context>
                        <BrowserRouter>
                            <Header />
                            <Routes>
                                <Route path="/" element={<Login />}></Route>

                                <Route element={<PrivateRoute />}>
                                    <Route path="/home" element={<Home />} />
                                </Route>

                                <Route element={<PrivateRoute />}>
                                    <Route
                                        path="/gestiondeducciones"
                                        element={<GestionDeducciones />}
                                    />
                                </Route>

                                <Route element={<PrivateRoute />}>
                                    <Route path="/empleados/*" element={<DashboardEmpleados />} />
                                </Route>

                                <Route element={<PrivateRoute />}>
                                    <Route path="/ingresos" element={<Ingresos />} />
                                </Route>

                                <Route element={<PrivateRoute />}>
                                    <Route path="/transacciones" element={<Transacciones />} />
                                </Route>
                                <Route element={<PrivateRoute />}>
                                    <Route path="/asientos" element={<Asientos />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </Context>
                </div>

                <Footer />
            </div>
        );
    }

    //async populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const data = await response.json();
    //    this.setState({ forecasts: data, loading: false });
    //}
}
