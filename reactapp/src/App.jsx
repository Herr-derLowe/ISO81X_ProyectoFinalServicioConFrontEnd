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
import { Context } from "./context/Context";

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
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route
                  path="/gestiondeducciones"
                  element={<GestionDeducciones />}
                ></Route>

                <Route path="/empleados/*" element={<DashboardEmpleados />} />
                <Route path="/ingresos" element={<Ingresos />} />
                <Route path="/transacciones" element={<Transacciones />} />
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
