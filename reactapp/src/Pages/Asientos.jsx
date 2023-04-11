import React, { Component } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { variables } from '../Components/Variables';
import axios from 'axios';
import { DependeSalarioCheck } from '../Components/DeduccionesComponentes/DependeSalarioCheck';
import { EstadoDeduccionBadge } from '../Components/DeduccionesComponentes/estadoDeduccionBadge';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AuthenticationHeader from '../context/AuthenticationHeader';

export class Asientos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            transacciones: [],
            empleados: [],
            deducciones: [],
            ingresos: [],
            TransaccionDesdeFilter: "",
            TransaccionHastaFilter: "",
            DeduccionDependeSalarioFilter: "",
            EstadoDeduccionFilter: "",
            transaccionesWithoutFilter: [],
            isFiltered: false
        }
    }
    FilterFn() {
        this.setState({ isFiltered: true });
        var TransaccionDesdeFilter = this.state.TransaccionDesdeFilter.toISOString();
        var TransaccionHastaFilter = this.state.TransaccionHastaFilter.toISOString();
        //var DeduccionDependeSalarioFilter = this.state.DeduccionDependeSalarioFilter;
        //console.log("filtering")
        //console.log(TransaccionDesdeFilter)
        //console.log(this.state.transaccionesWithoutFilter);

        var filteredData = this.state.transaccionesWithoutFilter.filter(
            (item) => {
                return item.fechaTransaccion >= TransaccionDesdeFilter
                    && item.fechaTransaccion <= TransaccionHastaFilter;
            }
        );
        console.log(filteredData);
        this.setState({ transacciones: filteredData });
        if (this.state.transacciones.length === 0) {
            this.setState({ isFiltered: false });
        }
    }

    logChange = (e)=> {
        console.log(e.target.value);
    }
    clearFilterSingle() {
        this.setState({ isFiltered: false })
        this.refreshList();
    }
    changeFechaDesdeFilter = (e) => {
        this.state.TransaccionDesdeFilter = e.target.value;
        if (this.state.TransaccionDesdeFilter && this.state.TransaccionHastaFilter) {
            this.FilterFn();
        }
    }
    changeTransaccionHastaFilter = (e) => {
        this.state.TransaccionHastaFilter = e.target.value;
        if (this.state.TransaccionDesdeFilter && this.state.TransaccionHastaFilter) {
            this.FilterFn();
        }
    }

    refreshList() {
        axios.get(variables.API_URL + 'Transacciones/GetTransaccionesAsientoNull', {
            headers: AuthenticationHeader()
        })
            .then(res => {
                const data = res.data;
                this.setState({ transacciones: data, transaccionesWithoutFilter: data });
            })

    }

    componentDidMount() {
        this.refreshList();
    }

    contabilizarClick() {
        console.log("contabilizando...");
        let totalMonto = 0;

        this.state.transacciones.forEach((txn) => {
            totalMonto += txn.montoTransaccion;
        })
        //Prueba pre-integracion
        console.log({
            "id_aux": 2,
            "nombre_aux": "Nomina",
            "cuenta": 70,
            "origen": "CR",
            "monto": totalMonto
        });
    }

    render() {
        const {
            transacciones,
            TransaccionDesdeFilter,
            TransaccionHastaFilter,
            isFiltered,
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
                                M&oacute;dulo de Contabilizaci&oacute;n
                            </div>

                            <div className="row flex-lg-nowrap">
                                <div className="col mb-3">
                                    <div className="e-panel card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h4 className="mr-2">Detalles Transacciones a Contabilizar</h4>
                                            </div>
                                            <br/>
                                            <div className="d-flex justify-content-between">
                                                <div className="fs-5 text">
                                                    Fecha desde: <Calendar
                                                        inputId="fechaDesde"
                                                        value={TransaccionDesdeFilter}
                                                        onChange={this.changeFechaDesdeFilter}
                                                        onClearButtonClick={() => this.clearFilterSingle()}
                                                        touchUI
                                                        showIcon
                                                        showButtonBar
                                                        dateFormat="yy-mm-dd" />
                                                </div>
                                                <div className="fs-5 text">
                                                    Fecha hasta: <Calendar
                                                        inputId="fechaHasta"
                                                        value={TransaccionHastaFilter}
                                                        onChange={this.changeTransaccionHastaFilter}
                                                        onClearButtonClick={() => this.clearFilterSingle()}
                                                        touchUI
                                                        showIcon
                                                        showButtonBar
                                                        dateFormat="yy-mm-dd" />
                                                </div>
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
                                                                    <td>{t.tipoTransaccion} NOMINA</td>
                                                                    <td>{new Date(t.fechaTransaccion).toISOString().split('T')[0]}</td>
                                                                    <td>{t.montoTransaccion} </td>
                                                                    <td>{t.idAsiento ? (
                                                                        <>{t.idAsiento}</>) : (<>Null</>)}</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                            <div className="float-end">
                                                <button type="button"
                                                    disabled={isFiltered ? false : true}
                                                    className="btn btn-success btn-block"
                                                    onClick={() => this.contabilizarClick()}>
                                                    Contabilizar
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