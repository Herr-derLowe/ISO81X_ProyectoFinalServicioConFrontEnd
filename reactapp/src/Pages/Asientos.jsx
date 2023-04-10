import React, { Component } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { variables } from '../Components/Variables';
import axios from 'axios';
import { DependeSalarioCheck } from '../Components/DeduccionesComponentes/DependeSalarioCheck';
import { EstadoDeduccionBadge } from '../Components/DeduccionesComponentes/estadoDeduccionBadge';
import AuthenticationHeader from '../context/AuthenticationHeader'

export class Asientos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            transacciones: [],
            empleados: [],
            deducciones: [],
            ingresos: [],
            DeduccionClaveFilter: "",
            DeduccionNombreFilter: "",
            DeduccionDependeSalarioFilter: "",
            EstadoDeduccionFilter: "",
            deduccionesWithoutFilter: []
        }
    }
    FilterFn() {
        var DeduccionClaveFilter = this.state.DeduccionClaveFilter;
        var DeduccionNombreFilter = this.state.DeduccionNombreFilter;
        //var DeduccionDependeSalarioFilter = this.state.DeduccionDependeSalarioFilter;
        var EstadoDeduccionFilter = this.state.EstadoDeduccionFilter;


        var filteredData = this.state.deduccionesWithoutFilter.filter(
            function (el) {
                return el.nombreDeduccion.toString().toLowerCase().includes(
                    DeduccionNombreFilter.toString().trim().toLowerCase()
                ) &&
                    el.claveDeduccion.toString().toLowerCase().includes(
                        DeduccionClaveFilter.toString().trim().toLowerCase()
                    ) &&
                    el.estadoDeduccion.toString().toUpperCase().includes(
                        EstadoDeduccionFilter.toString().trim().toUpperCase()
                    )
            }
        );
        this.setState({ deducciones: filteredData });
    }
    sortResult(prop, asc) {
        var sortedData = this.state.deduccionesWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ deducciones: sortedData });
    }

    changeDeduccionClaveFilter = (e) => {
        this.state.DeduccionClaveFilter = e.target.value;
        this.FilterFn();
    }
    changeDeduccionNombreFilter = (e) => {
        this.state.DeduccionNombreFilter = e.target.value;
        this.FilterFn();
    }
    changeDeduccionDependeSalarioFilter = (e) => {
        this.state.DeduccionDependeSalarioFilter = e.target.value.toString();
        this.FilterFn();
    }
    changeEstadoDeduccionFilter = (e) => {
        this.state.EstadoDeduccionFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        this.getEmpleados();
        this.getDeducciones();
        this.getIngresos();
        axios.get(variables.API_URL + 'Transacciones/GetTransaccionesAsientoNull', {
            headers: AuthenticationHeader()
        })
            .then(res => {
                const data = res.data;
                this.setState({ transacciones: data, deduccionesWithoutFilter: data });
            })

    }

    getEmpleados() {
        axios.get(variables.API_URL + 'Empleados/GetEmpleados', {
            headers: AuthenticationHeader()
        })
            .then(res => {
                const data = res.data;
                this.setState({ empleados: data/*, empleado: data[0].id*/ });
            })
    }

    getDeducciones() {
        axios.get(variables.API_URL + 'TiposDeducciones/GetTiposDeducciones', {
            headers: AuthenticationHeader()
        })
            .then(res => {
                const data = res.data;

                this.setState({ deducciones: data });
            })
    }

    getIngresos() {
        axios.get(variables.API_URL + 'TiposIngresos/GetTiposIngresos', {
            headers: AuthenticationHeader()
        })
            .then(res => {
                const data = res.data;

                this.setState({ ingresos: data/*, deduccion: data[0].id*/ });
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    changeClaveDeduccion = (e) => {
        this.setState({ claveDeduccion: e.target.value });
    }
    changeNombreDeduccion = (e) => {
        this.setState({ nombreDeduccion: e.target.value });
    }
    changeDependeSalarioD = (e) => {
        this.setState({ dependeSalarioD: e.target.checked });
    }
    changeEstadoDeduccion = (e) => {
        this.setState({ estadoDeduccion: e.target.value });
    }

    addClick() {
        console.log("contabilizando...");
    }

    getDeducIng(t) {
        if (t.tipoTransaccion == "INGRESO") {
            return this.state.ingresos.find(e => e.id == t.ingresoDeduccion_id)?.nombreIngreso

        } else {
            return this.state.deducciones.find(e => e.id == t.ingresoDeduccion_id)?.nombreDeduccion
        }
    }
    render() {
        const {
            transacciones,
            modalTitle,
            id,
            claveDeduccion,
            nombreDeduccion,
            dependeSalarioD,
            estadoDeduccion,

        } = this.state;
        return (
            <div className="main_container">
                <div className="container">
                    <div className="row flex-lg-nowrap">

                        <div className="col">
                            <div className="h1 pb-2 mb-4 text-dark border-bottom border-secondary">
                                <br />
                                Gesti&oacute;n de Asientos Contables
                            </div>

                            <div className="row flex-lg-nowrap">
                                <div className="col mb-3">
                                    <div className="e-panel card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h4 className="mr-2">Detalles Asientos Contables</h4>
                                            </div>
                                            <div className="e-table">
                                                <div className="table-responsive table-lg mt-3">
                                                    <table className="table table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Id Transaccion</th>
                                                                <th>Descripcion</th>
                                                                <th>Fecha Transaccion</th>
                                                                <th>Monto</th>
                                                                <th>Id Asiento</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {transacciones.map(t =>
                                                                <tr key={t.id}>
                                                                    <td>{t.id}</td>
                                                                    <td>{this.getDeducIng(t)}</td>
                                                                    <td>{new Date(t.fechaTransaccion).toISOString().split('T')[0]}</td>
                                                                    <td>{t.montoTransaccion} </td>
                                                                    <td>{t.idAsiento ? (
                                                                        <>{t.idAsiento}</>) : (<>Null</>)}</td>
                                                                </tr>
                                                            )}
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>
                                                                    <button type="button"
                                                                        className="btn btn-success btn-block"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#exampleModal"
                                                                        onClick={() => this.addClick()}>
                                                                        Contabilizar
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 mb-3">
                                    <div className="card">
                                        <div className="card-body">

                                            <hr className="my-3" />
                                            <div className="text-center">
                                                <label>Fecha Desde</label>
                                                <input className="form-control"
                                                    type="date"
                                                    onChange={this.changeDeduccionClaveFilter}
                                                    placeholder="Fecha Desde"
                                                />
                                                <br />
                                                <button type="button" className="btn btn-light"
                                                    onClick={() => this.sortResult('claveDeduccion', true)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                                    </svg>
                                                </button>

                                                <button type="button" className="btn btn-light"
                                                    onClick={() => this.sortResult('claveDeduccion', false)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <hr className="my-3" />
                                            <div className="text-center">
                                                <label>Fecha Hasta</label>
                                                <input className="form-control"
                                                    type="date"
                                                    onChange={this.changeDeduccionNombreFilter}
                                                    placeholder="Fecha Hasta"
                                                />
                                                <br />
                                                <button type="button" className="btn btn-light"
                                                    onClick={() => this.sortResult('nombreDeduccion', true)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                                    </svg>
                                                </button>

                                                <button type="button" className="btn btn-light"
                                                    onClick={() => this.sortResult('nombreDeduccion', false)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}