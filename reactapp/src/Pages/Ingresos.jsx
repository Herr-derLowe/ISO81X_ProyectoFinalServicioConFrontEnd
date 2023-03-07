import React, { Component } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { variables } from '../Components/Variables';
import axios from 'axios';
import { DependeSalarioCheck } from '../Components/DeduccionesComponentes/DependeSalarioCheck';

export class Ingresos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingresos: [],
            id: "",
            modalTitle: "",

            claveIngreso: "",
            nombreIngreso: "",
            dependeSalarioI: true,
            estadoIngreso:"",

        
        }
    }

    refreshList() {

       
        axios.get(variables.API_URL + 'tiposingresos/GetTiposIngresos')
        .then(res => {
            const data = res.data;
            this.setState({ ingresos:data });
        })

}

componentDidMount() {
        
    this.refreshList();
}

changeClaveIngreso = (e) => {
    this.setState({ claveIngreso: e.target.value });
}
changeNombreIngreso = (e) => {
    this.setState({ nombreIngreso: e.target.value });
}
changeDependeIngreso = (e) => {
    this.setState({ dependeSalarioI: e.target.checked });
}
changeEstadoIngreso = (e) => {
    this.setState({ estadoIngreso: e.target.value });
}

addClick() {
    this.setState({
        modalTitle: "Agregar Tipo de ingreso",
        claveIngreso: "",
        nombreIngreso: "",
        dependeSalarioI: true,
        estadoIngreso:"ACTIVO",
    });
}

editClick(ingres) {
    this.setState({
        modalTitle: "Editar Tipo de Ingreso",
        id: ingres.id,
        claveIngreso: ingres.claveIngreso,
        nombreIngreso: ingres.nombreIngreso,
        dependeSalarioI: ingres.dependeSalarioI,
        estadoIngreso: ingres.estadoIngreso
    });
}

createClick() {
    const MySwal = withReactContent(Swal)
    //MySwal.fire({
    //    title: <strong>Deducci&oacute;n Insertada!</strong>,
    //    icon: 'success'
    //});

    let nombreValidate, claveValidate;
        if (this.state.claveIngreso === "") {
            claveValidate = null;
        } else {
            claveValidate = this.state.claveIngreso;
        }
        if (this.state.nombreIngreso === "") {
            nombreValidate = null;
        } else {
            nombreValidate = this.state.nombreIngreso;
        }

    axios.post(variables.API_URL + 'tiposingresos/PostAddTipoIngreso', {
        claveIngreso: claveValidate,
        nombreIngreso: nombreValidate,
        dependeSalarioI: this.state.dependeSalarioI,
        estadoIngreso: this.state.estadoIngreso
    })
        .then(() => {
            MySwal.fire({
                title: <strong>Ingreso&oacute;n Insertado!</strong>,
                icon: 'success'
            });
            this.refreshList();
        }, (error) => {
            MySwal.fire({
                title: <strong>Error: No se pudo insertar el ingreso...</strong>,
                icon: 'error'
            });
            console.log(error);
        })
}

updateClick() {
  
    const MySwal = withReactContent(Swal)

    let nombreValidate, claveValidate;
    if (this.state.claveIngreso === "") {
        claveValidate = null;
    } else {
        claveValidate = this.state.claveIngreso;
    }
    if (this.state.nombreIngreso === "") {
        nombreValidate = null;
    } else {
        nombreValidate = this.state.nombreIngreso;
    }


    axios.put(variables.API_URL + 'tiposingresos/UpdateTipoIngreso/' + this.state.id, {
        claveIngreso: claveValidate,
        nombreIngreso: nombreValidate,
        dependeSalarioI: this.state.dependeSalarioI,
        estadoIngreso: this.state.estadoIngreso
    })
        .then(() => {
            MySwal.fire({
                title: <strong>Ingreso&oacute;n Insertado!</strong>,
                icon: 'success'
            });
            this.refreshList();
        }, (error) => {
            MySwal.fire({
                title: <strong>Error: No se pudo insertar el ingreso...</strong>,
                icon: 'error'
            });
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
            axios.delete(variables.API_URL + 'tiposingresos/DeleteTipoIngreso/' + id)
                .then(() => {
                    MySwal.fire({
                        title: 'Tipo de Ingreso Eliminad0!',
                        icon: 'success'
                    })
                    this.refreshList();
                }, (error) => {
                    MySwal.fire({
                        title: <strong>Error: No se pudo insertar el ingreso...</strong>,
                        icon: 'error'
                    });
                    console.log(error);
                })
            
        }
    })
}

render() {
    const {
        ingresos,
        modalTitle,
        id,
        claveIngreso,
        nombreIngreso,
        dependeSalarioI,
        estadoIngreso,

    } = this.state;


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
                                                    {ingresos.map(ingres =>
                                                        <tr key={ingres.id}>
                                                            <td>{ingres.claveIngreso}</td>
                                                            <td>{ingres.nombreIngreso}</td>
                                                            <td><DependeSalarioCheck dependeSalario={ingres.dependeSalarioI} /></td>  
                                                            <td>{ingres.estadoIngreso}</td>
                                                            <td>
                                                                <button type="button"
                                                                    className="btn btn-primary mr-1"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModal"
                                                                    onClick={() => this.editClick(ingres)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                    </svg> Editar
                                                                </button>

                                                                <button type="button"
                                                                    className="btn btn-danger mr-1"
                                                                    onClick={() => this.deleteClick(ingres.id)}>
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
                                                                            value={claveIngreso}
                                                                            onChange={this.changeClaveIngreso}
                                                                            step="1"
                                                                        />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label htmlFor="inputNombreDeduccion" className="form-label">Nombre del tipo de Deducci&oacute;n</label>
                                                                        <input
                                                                            type="text"
                                                                            id="inputNombreDeduccion"
                                                                            className="form-control"
                                                                            value={nombreIngreso}
                                                                            onChange={this.changeNombreIngreso}
                                                                            placeholder="ARS, AFP, ..."
                                                                        />
                                                                    </div>

                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id="inputDependeSalarioD"
                                                                            onChange={this.changeDependeSalarioI }
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
                                                                            value={estadoIngreso}
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

