import React, { Component } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { variables } from '../Components/Variables';
import axios from 'axios';

const cache_ingresos = {};
const cache_deducciones = {};
const cache_empleados = {};

export class Transacciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transacciones: [],
            empleados: [],
            deducciones: [],
            ingresos: [],
            current_empleado: {},
            current_ingreso: {},
            current_deduccion: {},
            id: "",
            modalTitle: "",

            empleado_id: "",
            tipoTransaccion: "",
            deduccion: "",
            ingresoDeduccion_id: "",
            fechaTransaccion: "",
            montoTransaccion: "",
            estadoTransaccion: "",
            empleado: "",

        }
    }
    refreshList() {

        this.getEmpleados();
        this.getDeducciones();
        this.getIngresos();
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
                this.setState({ empleados: data, empleado: data[0].id });
            })
    }

    getDeducciones() {
        axios.get(variables.API_URL + 'TiposDeducciones/GetTiposDeducciones')
            .then(res => {
                const data = res.data;

                this.setState({ deducciones: data });
            })
    }

    getIngresos() {
        axios.get(variables.API_URL + 'TiposIngresos/GetTiposIngresos')
            .then(res => {
                const data = res.data;

                this.setState({ ingresos: data, deduccion: data[0].id });
            })
    }

    async getEmpleado(id) {
        if (!cache_empleados[id]) {
            const res = await axios.get(variables.API_URL + 'Empleados/GetEmpleadoById/' + id);
            const data = res.data;
            this.setState({ current_empleado: data });
            cache_empleados[id] = data;
            console.log(data.nombreEmpleado);
            return data.nombreEmpleado;

        } else {
            let data = cache_empleados[id];
            return data.nombreEmpleado;
            // this.setState({ current_empleado: data });
        }

    }

    getDeduccion(id) {
        if (!cache_deducciones[id]) {
            axios.get(variables.API_URL + 'TiposDeducciones/GetTipoDeduccionById/' + id)
                .then(res => {
                    const data = res.data;
                    this.setState({ current_deduccion: data });
                    cache_deducciones[id] = data;
                })
        } else {
            // this.setState({ current_deduccion: cache_deducciones[id] });
        }
    }

    getIngreso(id) {
        if (!cache_ingresos[id]) {
            axios.get(variables.API_URL + 'TiposIngresos/GetTipoIngresoById/' + id)
                .then(res => {
                    const data = res.data;
                    this.setState({ current_ingreso: data });
                    cache_ingresos[id] = data;
                })
        } else {
            // this.setState({ current_ingreso: cache_ingresos[id] });
        }
    }

    getDeducIng(t) {
        if (t.tipoTransaccion == "INGRESO") {
            return this.state.ingresos.find(e => e.id == t.ingresoDeduccion_id)?.nombreIngreso

        } else {
            return this.state.deducciones.find(e => e.id == t.ingresoDeduccion_id)?.nombreDeduccion
        }
    }

    componentDidMount() {

        this.refreshList();
    }

    addClick() {
        this.getEmpleados();
        this.getDeducciones();
        this.getIngresos();
        this.setState({
            modalTitle: "Agregar Transaccion",
            tipoTransaccion: "INGRESO",
            fechaTransaccion: new Date(),
            montoTransaccion: 0,
            estadoTransaccion: 'PENDIENTE APROBACION'
        });
    }
    editClick(t) {
        this.getEmpleados();
        this.getDeducciones();
        this.getIngresos();
        this.setState({
            modalTitle: "Editar Transaccion",
            id: t.id,
            empleado: t.empleado_id,
            tipoTransaccion: t.tipoTransaccion,
            fechaTransaccion: t.fechaTransaccion,
            montoTransaccion: t.montoTransaccion,
            estadoTransaccion: t.estadoTransaccion
        });
    }
    changeDeduccion = (e) => {
        this.setState({ deduccion: e.target.value });
    }
    changeEmpleado = (e) => {
        console.log("INIT ", e);
        this.setState({ empleado: e.target.value });
    }
    changeMonto = (e) => {
        this.setState({ montoTransaccion: e.target.value });
    }
    changeTipo = (e) => {
        this.setState({ tipoTransaccion: e.target.value });
        if (e.target.value == "INGRESO") {
            this.setState({ deduccion: this.state.ingresos[0].id });

        } else {
            this.setState({ deduccion: this.state.deducciones[0].id });

        }

    }

    changeEstadoT = (e) => {
        this.setState({ estadoTransaccion: e.target.value });
    }

    createClick() {
        const MySwal = withReactContent(Swal)



        axios.post(variables.API_URL + 'Transacciones/PostAddTransaccion', {
            empleado_id: this.state.empleado,
            tipoTransaccion: this.state.tipoTransaccion,
            ingresoDeduccion_id: this.state.deduccion,
            fechaTransaccion: new Date(),
            montoTransaccion: this.state.montoTransaccion,
            estadoTransaccion: this.state.estadoTransaccion
        })
            .then(() => {
                MySwal.fire({
                    title: <strong>Transaccion Insertada!</strong>,
                    icon: 'success'
                });
                this.refreshList();
            }, (error) => {
                MySwal.fire({
                    title: <strong>Error: No se pudo insertar la transaccion...</strong>,
                    icon: 'error'
                });
                console.log(error);
            })
    }

    updateClick() {

        const MySwal = withReactContent(Swal)


        axios.put(variables.API_URL + 'Transacciones/UpdateTransaccion/' + this.state.id, {
            empleado_id: this.state.empleado,
            tipoTransaccion: this.state.tipoTransaccion,
            ingresoDeduccion_id: this.state.deduccion,
            fechaTransaccion: new Date(),
            montoTransaccion: this.state.montoTransaccion,
            estadoTransaccion: this.state.estadoTransaccion
        })
            .then(() => {
                MySwal.fire({
                    title: <strong>Transaccion Actualizada!</strong>,
                    icon: 'success',
                    didClose: () => {
                        this.refreshList()
                    }
                });
                this.refreshList();
            }, (error) => {
                MySwal.fire({
                    title: <strong>Error: No se pudo actualizar la transaccion...</strong>,
                    icon: 'error'
                });
                this.refreshList();
                console.log(error);
            })
    }

    deleteClick(id) {

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
                axios.delete(variables.API_URL + 'Transacciones/DeleteTransaccion/' + id)
                    .then(() => {
                        MySwal.fire({
                            title: 'Transaccion Eliminada!',
                            icon: 'success'
                        })
                        this.refreshList();
                    }, (error) => {
                        MySwal.fire({
                            title: <strong>Error: No se pudo eliminar el ingreso...</strong>,
                            icon: 'error'
                        });
                        console.log(error);
                    })

            }
        })
    }

    render() {
        const {
            transacciones,
            empleados,
            current_empleado,
            current_deduccion,
            current_ingreso,
            deducciones,
            ingresos,
            modalTitle,
            id,
            empleado_id,
            tipoTransaccion,
            ingresoDeduccion_id,
            fechaTransaccion,
            montoTransaccion,
            estadoTransaccion

        } = this.state;

        const renderDeduccion = () => {
            if (tipoTransaccion == "DEDUCCION") {
                return (<>
                    <label htmlFor="inputDeduccion" className="form-label">Tipo de Deduccion</label>
                    <select
                        className="form-select"
                        id="inputDeduccion"
                        onChange={this.changeDeduccion}
                    >
                        {deducciones.map(e =>
                            <option value={e.id}>{e.nombreDeduccion}</option>

                        )}
                    </select>
                </>)

            } else {
                return (<>
                    <label htmlFor="inputDeduccion" className="form-label">Tipo de Ingreso</label>
                    <select
                        className="form-select"
                        id="inputDeduccion"
                        onChange={this.changeDeduccion}
                    >
                        {ingresos.map(e =>
                            <option value={e.id}>{e.nombreIngreso}</option>

                        )}
                    </select>
                </>)
            }
        }
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
                                                            <th>Empleado</th>
                                                            <th>Deduccion/Ingreso</th>
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
                                                                <td>{this.state.empleados.find(e => e.id == t.empleado_id)?.nombreEmpleado}</td>
                                                                <td>{
                                                                    this.getDeducIng(t)
                                                                }</td>
                                                                <td>{t.tipoTransaccion}</td>
                                                                <td>{t.fechaTransaccion}</td>
                                                                <td>{t.montoTransaccion}</td>
                                                                <td>{t.estadoTransaccion}</td>
                                                                <td>
                                                                    <button type="button"
                                                                        className="btn btn-primary mr-1"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#exampleModal"
                                                                        onClick={() => this.editClick(t)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                        </svg> Editar
                                                                    </button>
                                                                    <br></br>
                                                                    <button type="button"
                                                                        className="btn btn-danger mr-1"
                                                                        onClick={() => this.deleteClick(t.id)}>
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
                                                                            <label htmlFor="inputEmpleado" className="form-label">Empleado</label>

                                                                            <select
                                                                                className="form-select"
                                                                                id="inputEmpleado"
                                                                                onChange={this.changeEmpleado}
                                                                            >
                                                                                {empleados.map(e =>
                                                                                    <option value={e.id}>{e.nombreEmpleado}</option>

                                                                                )}
                                                                            </select>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <label className="input-group-text" htmlFor="inputTipo">Tipo de Transaccion</label>
                                                                            <select
                                                                                className="form-select"
                                                                                id="inputTipo"
                                                                                value={tipoTransaccion}
                                                                                onChange={this.changeTipo}
                                                                            >
                                                                                <option value="INGRESO">Ingreso</option>
                                                                                <option value="DEDUCCION">Deduccion</option>
                                                                            </select>
                                                                        </div>

                                                                        <div className="mb-3">
                                                                            {renderDeduccion()}
                                                                        </div>

                                                                        <div className="mb-3">
                                                                            <label htmlFor="inputMonto" className="form-label">Monto</label>
                                                                            <input
                                                                                type="text"
                                                                                id="inputMonto"
                                                                                className="form-control"
                                                                                value={montoTransaccion}
                                                                                onChange={this.changeMonto}
                                                                                placeholder="Monto"
                                                                                required={true}
                                                                            />
                                                                            <div className="invalid-feedback">
                                                                                Favor ingresar un monto
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <label className="input-group-text" htmlFor="inputGroupSelectEstado">Estado Transacci&oacute;n</label>
                                                                            <select
                                                                                className="form-select"
                                                                                id="inputGroupSelectEstado"
                                                                                value={estadoTransaccion}
                                                                                onChange={this.changeEstadoT}
                                                                            >
                                                                                <option value="PENDIENTE APROBACION">Pendiente Aprobaci&oacute;n</option>
                                                                                <option value="APROBADA">Aprobada</option>
                                                                            </select>
                                                                        </div>
                                                                        <br />
                                                                    </div>
                                                                </div>
                                                                {id === "" ?
                                                                    <button type="button"
                                                                        className="btn btn-primary float-start"
                                                                        onClick={() => this.createClick()}
                                                                    >Crear Transaccion</button>
                                                                    : null}

                                                                {id !== "" ?
                                                                    <button type="button"
                                                                        className="btn btn-primary float-start"
                                                                        onClick={() => this.updateClick()}
                                                                    >Actualizar Transaccion</button>
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
                                            <div className="text-center px-xl-3">

                                                <button type="button"
                                                    className="btn btn-primary btn-block"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    onClick={() => this.addClick()}>
                                                    A&ntilde;adir Transacci&oacute;n
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

        );
    }
}