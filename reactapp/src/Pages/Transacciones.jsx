import React, { Component } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { variables } from '../Components/Variables';
import axios from 'axios';


export class Transacciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transacciones: [],
            empleados: [],
            id: "",
            modalTitle: "",

            empleado_id: "",
            tipoTransaccion: "",
            ingresoDeduccion_id: "",
            fechaTransaccion: "",
            montoTransaccion: "",
            estadoTransaccion: "",

        }
    }
    refreshList() {


        axios.get(variables.API_URL + 'Transacciones/GetTransacciones')
            .then(res => {
                const data = res.data;
                this.setState({ transacciones: data });
            })
    }

    getEmpleados() {
        axios.get(variables.API_URL + 'Empleados/GetEmpleados')
            .then(res => {
                const data = res.data;
                this.setState({ empleados: data });
            })
    }

    componentDidMount() {

        this.refreshList();
    }

    addClick() {
        this.getEmpleados();
        this.setState({
            modalTitle: "Agregar Tipo de ingreso",
            claveIngreso: "",
            nombreIngreso: "",
            dependeSalarioI: true,
            estadoIngreso: "ACTIVO",
        });
    }

    render() {
        const {
            transacciones,
           empleados,
            modalTitle,
            id,
            empleado_id,
            tipoTransaccion,
            ingresoDeduccion_id,
            fechaTransaccion, 
            montoTransaccion,
            estadoTransaccion

        } = this.state;
        return (
            <div className="main_container">
                <div className="container">
                    <div className="row flex-lg-nowrap">
                        <div className="col">
                            <div className="h1 pb-2 mb-4 text-dark border-bottom border-secondary">
                                <br />
                                Gesti&oacute;n de Transacciones
                            </div>

                            <div className="row flex-lg-nowrap">
                                <div className="col mb-3">
                                    <div className="e-panel card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h4 className="mr-2">Detalles de Transacciones</h4>
                                            </div>
                                        </div>
                                        <div className="e-table">
                                            <div className="table-responsive table-lg mt-3">
                                                <table className="table table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Empleado</th>
                                                            <th>Deduccion</th>
                                                            <th>Tipo</th>
                                                            <th>Fecha</th>
                                                            <th>Monto</th>
                                                            <th>Estado</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {transacciones.map(t =>
                                                            <tr key={t.id}>
                                                                <td>{t.id}</td>
                                                                <td>{t.empleado_id}</td>
                                                                <td>{t.ingresoDeduccion_id}</td>
                                                                <td>{t.tipoTransaccion}</td>
                                                                <td>{t.fechaTransaccion}</td>
                                                                <td>{t.montoTransaccion}</td>
                                                                <td>{t.estadoTransaccion}</td>
                                                                <td></td>
                                                            </tr>

                                                            )}

                                                    </tbody>
                                                </table>
                                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">{modalTitle}</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                                                ></button>
                                                            </div>

                                                            <div className="modal-body">
                                                                <div className="d-flex flex-row bd-highlight mb-3">

                                                                    <div className="p-2 w-75 bd-highlight">

                                                                        <div className="mb-3">
                                                                            <label htmlFor="inputEmpleado" className="form-label">Empleado</label>

                                                                            <select
                                                                                className="form-select"
                                                                                id="inputEmpleado"
                                                                                onChange={this.changeEmpleado}
                                                                            >
                                                                                {empleados.map(e =>
                                                                                    <option value="{e.id}">{e.nombreEmpleado}</option>

                                                                                    )}
                                                                            </select>
                                                                        </div>

                                                                        <div className="mb-3">
                                                                            <label htmlFor="inputEmpleado" className="form-label">Empleado</label>

                                                                            <select
                                                                                className="form-select"
                                                                                id="inputEmpleado"
                                                                                onChange={this.changeEmpleado}
                                                                            >
                                                                                {empleados.map(e =>
                                                                                    <option value="{e.id}">{e.nombreEmpleado}</option>

                                                                                )}
                                                                            </select>
                                                                        </div>
                                                                        <br />
                                                                        <div className="input-group mb-3">
                                                                            <label className="input-group-text" htmlFor="inputGroupSelectCondicion">Estado Deducci&oacute;n Nomina</label>
                                                                            <select
                                                                                className="form-select"
                                                                                id="inputGroupSelectCondicion"
                                                                                onChange={this.changeEstadoIngreso}
                                                                            >
                                                                                <option value="ACTIVO">Activo</option>
                                                                                <option value="INACTIVO">Inactivo</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {id === "" ?
                                                                    <button type="button"
                                                                        className="btn btn-primary float-start"
                                                                        onClick={() => this.createClick()}
                                                                    >Crear Tipo Deducci&oacute;n</button>
                                                                    : null}

                                                                {id !== "" ?
                                                                    <button type="button"
                                                                        className="btn btn-primary float-start"
                                                                        onClick={() => this.updateClick()}
                                                                    >Actualizar Tipo Deducci&oacute;n</button>
                                                                    : null}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <button type="button"
                                                className="btn btn-primary m-2 float-end"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => this.addClick()}>
                                                A&ntilde;adir Transaccion
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}