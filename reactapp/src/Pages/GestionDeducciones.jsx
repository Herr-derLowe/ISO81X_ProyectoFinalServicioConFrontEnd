import React, { Component } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { variables } from '../Components/Variables';
import axios from 'axios';

export class GestionDeducciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deducciones: [],
            id: "",
            modalTitle: "",

            claveDeduccion: "",
            nombreDeduccion: "",
            dependeSalarioD: true,
            estadoDeduccion:"",

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
        var DeduccionDependeSalarioFilter = this.state.DeduccionDependeSalarioFilter;
        var EstadoDeduccionFilter = this.state.EstadoDeduccionFilter;


        var filteredData = this.state.deduccionesWithoutFilter.filter(
            function (el) {
                return el.claveDeduccion.toString().toLowerCase().includes(
                    DeduccionClaveFilter.toString().trim().toLowerCase()
                ) &&
                    el.nombreDeduccion.toString().toLowerCase().includes(
                        DeduccionNombreFilter.toString().trim().toLowerCase()
                    ) &&
                    el.dependeSalarioD.toString().toLowerCase().includes(
                        DeduccionDependeSalarioFilter.toString().trim().toLowerCase()
                    ) &&
                    el.EstadoDeduccionFilter.toString().toLowerCase().includes(
                        EstadoDeduccionFilter.toString().trim().toLowerCase()
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

        fetch(variables.API_URL + 'tiposdeducciones/GetTiposDeducciones', {
            headers: {
                "Accept": "text/plain",
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ deducciones: data });
            });
        //axios.get(variables.API_URL + 'tiposdeducciones/GetTiposDeducciones', {
        //    responseType: "json",
        //})
        //    .then(data => {
        //        this.setState({ deducciones: data });
        //    });
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
        this.setState({
            modalTitle: "Agregar Tipo Deduccion",
            claveDeduccion: "",
            nombreDeduccion: "",
            dependeSalarioD: true,
            estadoDeduccion: "ACTIVO"
        });
    }
    editClick(deduc) {
        this.setState({
            modalTitle: "Editar Tipo Deduccion",
            claveDeduccion: deduc.claveDeduccion,
            nombreDeduccion: deduc.nombreDeduccion,
            dependeSalarioD: deduc.dependeSalarioD,
            estadoDeduccion: deduc.estadoDeduccion
        });
    }

    createClick() {
        const MySwal = withReactContent(Swal)
        //MySwal.fire({
        //    title: <strong>Deducci&oacute;n Insertada!</strong>,
        //    icon: 'success'
        //});

        axios.post(variables.API_URL + 'tiposdeducciones/PostAddTipoDeduccion', {
            claveDeduccion: this.state.claveDeduccion,
            nombreDeduccion: this.state.nombreDeduccion,
            dependeSalarioD: this.state.dependeSalarioD,
            estadoDeduccion: this.state.estadoDeduccion
        })
            .then(() => {
                MySwal.fire({
                    title: <strong>Deducci&oacute;n Insertada!</strong>,
                    icon: 'success'
                });
                this.refreshList();
            }, (error) => {
                MySwal.fire({
                    title: <strong>Error: No se pudo insertar la deduccion...</strong>,
                    icon: 'error'
                });
                console.log(error);
            })
    }
    updateClick() {
        //fetch(variables.API_URL + 'CreditosFundapec/UpdateEstudianteFundapec/' + this.state.id, {
        //    method: 'PUT',
        //    headers: {
        //        Accept: "*/*",
        //        "Content-Type": "application/json"
        //    },
        //    body: JSON.stringify({
        //        numeroIdentificacion: this.state.numeroIdentificacion,
        //        matriculaEstudiante: this.state.matriculaEstudiante,
        //        indiceCuatrimestral: this.state.indiceCuatrimestral,
        //        cuatrimestreCursado: this.state.cuatrimestreCursado,
        //        materiasCursadas: this.state.materiasCursadas,
        //        cantidadCreditos: this.state.cantidadCreditos,
        //        condicionAcademica: this.state.condicionAcademica
        //    })
        //})
        const MySwal = withReactContent(Swal)

        axios.put(variables.API_URL + 'tiposdeducciones/UpdateTipoDeduccion/' + this.state.id, {
            claveDeduccion: this.state.claveDeduccion,
            nombreDeduccion: this.state.nombreDeduccion,
            dependeSalarioD: this.state.dependeSalarioD,
            estadoDeduccion: this.state.estadoDeduccion
        })
            .then(() => {
                MySwal.fire({
                    title: <strong>Deducci&oacute;n Insertada!</strong>,
                    icon: 'success'
                });
                this.refreshList();
            }, (error) => {
                MySwal.fire({
                    title: <strong>Error: No se pudo insertar la deduccion...</strong>,
                    icon: 'error'
                });
                console.log(error);
            })
    }
    deleteClick(id) {
        //if (window.confirm('Are you sure?')) {
        //    fetch(variables.API_URL + 'CreditosFundapec/DeleteEstudianteFundapec/' + id, {
        //        method: 'DELETE',
        //        headers: {
        //            Accept: "*/*",
        //            "Content-Type": "application/json"
        //        }
        //    })
        //        .then(() => {
        //            alert("Estudiante Eliminado");
        //            this.refreshList();
        //        }, (error) => {
        //            alert('Failed');
        //        })
        //}
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Estas seguro?',
            text: "No se puede revertir esta operacion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(variables.API_URL + 'tiposdeducciones/DeleteTipoDeduccion/' + id)
                    .then(() => {
                        MySwal.fire({
                            title: 'Tipo de Deduccion Eliminada!',
                            icon: 'success'
                        })
                        this.refreshList();
                    }, (error) => {
                        MySwal.fire({
                            title: <strong>Error: No se pudo insertar la deduccion...</strong>,
                            icon: 'error'
                        });
                        console.log(error);
                    })
                
            }
        })
    }

    render() {
        const {
            deducciones,
            modalTitle,
            id,
            claveDeduccion,
            nombreDeduccion,
            dependeSalarioD,
            estadoDeduccion,

        } = this.state;

        //const MySwal = withReactContent(Swal)
        //MySwal.fire({
        //    title: <strong>Deducci&oacute;n Insertada!</strong>,
        //    icon: 'success'
        //});
        return (
            <div className="main_container">
                <div className="container">
                    <div className="row flex-lg-nowrap">

                        <div className="col">
                            <div className="h1 pb-2 mb-4 text-dark border-bottom border-secondary">
                            <br/>
                                Gesti&oacute;n de Tipos de Deducciones
                            </div>

                            <div className="row flex-lg-nowrap">
                                <div className="col mb-3">
                                    <div className="e-panel card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h4 className="mr-2">Detalles de tipos de deducciones</h4>
                                            </div>
                                            <div className="e-table">
                                                <div className="table-responsive table-lg mt-3">
                                                    <table className="table table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Clave Deducci&oacute;n</th>
                                                                <th>Nombre Deducci&oacute;n</th>
                                                                <th>Depende Salario</th>
                                                                <th>Estado</th>
                                                                <th>Acciones</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {deducciones.map(deduc =>
                                                                <tr key={deduc.id}>
                                                                    <td>{deduc.claveDeduccion}</td>
                                                                    <td>{deduc.nombreDeduccion}</td>
                                                                    <td>{deduc.dependeSalarioD}</td>
                                                                    <td>{deduc.estadoDeduccion}</td>
                                                                    <td>
                                                                        <button type="button"
                                                                            className="btn btn-primary mr-1"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#exampleModal"
                                                                            onClick={() => this.editClick(deduc)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                            </svg> Editar
                                                                        </button>

                                                                        <button type="button"
                                                                            className="btn btn-danger mr-1"
                                                                            onClick={() => this.deleteClick(deduc.id)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                                            </svg> Eliminar
                                                                        </button>
                                                                    </td>
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
                                                                                <label htmlFor="inputClaveDeduccion" className="form-label">Clave del tipo de Deducci&oacute;n de Nomina(001, 002, ...)</label>
                                                                                <input type="number"
                                                                                    className="form-control"
                                                                                    id="inputClaveDeduccion"
                                                                                    placeholder="001, 002, ..."
                                                                                    value={claveDeduccion}
                                                                                    onChange={this.changeClaveDeduccion}
                                                                                    step="1"
                                                                                />
                                                                            </div>

                                                                            <div className="mb-3">
                                                                                <label htmlFor="inputNombreDeduccion" className="form-label">Nombre del tipo de Deducci&oacute;n</label>
                                                                                <input
                                                                                    type="text"
                                                                                    id="inputNombreDeduccion"
                                                                                    className="form-control"
                                                                                    value={nombreDeduccion}
                                                                                    onChange={this.changeNombreDeduccion}
                                                                                    placeholder="ARS, AFP, ..."
                                                                                />
                                                                            </div>

                                                                            <div className="form-check">
                                                                                <input
                                                                                    className="form-check-input"
                                                                                    type="checkbox"
                                                                                    id="inputDependeSalarioD"
                                                                                    onChange={this.changeDependeSalarioD }
                                                                                    defaultChecked/>
                                                                                <label className="form-check-label" htmlFor="inputDependeSalarioD">
                                                                                        Deducci&oacute;n depende de salario del empleado
                                                                                    </label>
                                                                            </div>
                                                                            <br/>
                                                                            <div className="input-group mb-3">
                                                                                <label className="input-group-text" htmlFor="inputGroupSelectCondicion">Estado Deducci&oacute;n Nomina</label>
                                                                                <select
                                                                                    className="form-select"
                                                                                    id="inputGroupSelectCondicion"
                                                                                    value={estadoDeduccion}
                                                                                    onChange={this.changeEstadoDeduccion}
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
                                </div>
                                <div className="col-12 col-lg-3 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <button type="button"
                                                className="btn btn-primary m-2 float-end"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => this.addClick()}>
                                                A&ntilde;adir Deducci&oacute;n
                                            </button>
                                            <hr className="my-3" />
                                            <div className="e-navlist e-navlist--active-bold">
                                                <ul className="nav">
                                                    <li className="nav-item active"><a href="" className="nav-link"><span>All</span> <small>/ 32</small></a></li>
                                                    <li className="nav-item"><a href="" className="nav-link"><span>Active</span> <small>/ 16</small></a></li>
                                                    <li className="nav-item"><a href="" className="nav-link"><span>Selected</span> <small>/ 0</small></a></li>
                                                </ul>
                                            </div>
                                            <hr className="my-3" />
                                            <div>
                                                <div className="form-group">
                                                    <label>Date from - to:</label>
                                                    <div>
                                                        <input id="dates-range" className="form-control flatpickr-input" placeholder="01 May 21 - 27 May 21" type="text" readOnly="readOnly" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Search by Name:</label>
                                                    <div><input className="form-control w-100" type="text" placeholder="Name"/></div>
                                                </div>
                                            </div>
                                            <hr className="my-3" />
                                            <div className="">
                                                <label>Status:</label>
                                                <div className="px-2">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" name="user-status" id="users-status-disabled" />
                                                        <label className="custom-control-label" htmlFor="users-status-disabled">Disabled</label>
                                                    </div>
                                                </div>
                                                <div className="px-2">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" name="user-status" id="users-status-active" />
                                                        <label className="custom-control-label" htmlFor="users-status-active">Active</label>
                                                    </div>
                                                </div>
                                                <div className="px-2">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" name="user-status" id="users-status-any" checked="" />
                                                        <label className="custom-control-label" htmlFor="users-status-any">Any</label>
                                                    </div>
                                                </div>
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