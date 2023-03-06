import React, { Component } from "react";
import imgsalary from "../imgs/salary-it.png";
import imggraphdown from "../imgs/graph-down-arrow.svg";
import { NavLink, Link } from "react-router-dom";
import groupIcon from "../imgs/group.png";


export class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="container my-5">
          <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
              <h1 className="display-4 fw-bold lh-1">
                Bienvenido/a al sistema de gesti&oacute;n de nominas
              </h1>
              <p className="lead">
                Dise&ntilde;e y agregue registros de empleados, departamentos,
                ingresos y deducciones para generacion de transacciones para
                contabilidad.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                <a
                  href="#comienzoGestionHome"
                  className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
                >
                  Comenzar Gesti&oacute;n
                </a>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
              <img
                className="rounded"
                src={imgsalary}
                alt="Salario IT"
                width="720"
              ></img>
            </div>
          </div>
        </div>

        <div className="container px-4 py-5" id="comienzoGestionHome">
          <h2 className="pb-2 border-bottom">
            M&oacute;dulos de Gesti&oacute;n de N&oacute;minas
          </h2>
          <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div className="col d-flex align-items-start">
              <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                  <img
                    src={groupIcon}
                    alt="Bootstrap"
                    width="32"
                    height="32"
                    className="bi"
                  ></img>
                </div>
              </div>
              <div>
                <h2>Empleados</h2>
                <p>
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
                <Link to="/empleados" className="btn btn-primary"> Acceder al modulo de empleados</Link>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                <img
                  src={imggraphdown}
                  alt="Bootstrap"
                  width="32"
                  height="32"
                  className="bi"
                ></img>
              </div>
              <div>
                <h2>Featured title</h2>
                <p>
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
                <a href="#" className="btn btn-primary">
                  Primary button
                </a>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                  <img
                    src={imggraphdown}
                    alt="Bootstrap"
                    width="32"
                    height="32"
                    className="bi"
                  ></img>
                </div>
              </div>
              <div>
                <h2>Tipos de Deducciones</h2>
                <p>
                  M&oacute;dulo de gesti&oacute;n de tipos de deducciones
                  aplicables a salarios de empleados. Identifica el tipo de
                  transaccion en el modulo respectivo.
                </p>
                <NavLink
                  className="btn btn-warning fw-bold"
                  to="/gestiondeducciones"
                >
                  Acceder a Deducciones
                </NavLink>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                  <img
                    src={imggraphdown}
                    alt="Bootstrap"
                    width="32"
                    height="32"
                    className="bi"
                  ></img>
                </div>
              </div>
              <div>
                <h2>Featured title</h2>
                <p>
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
                <a href="#" className="btn btn-primary">
                  Primary button
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
