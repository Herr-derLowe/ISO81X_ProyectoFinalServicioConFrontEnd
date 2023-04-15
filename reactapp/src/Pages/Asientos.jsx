import React, { Component } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AuthenticationHeader from '../context/AuthenticationHeader';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
        console.log(TransaccionDesdeFilter);
        //var DeduccionDependeSalarioFilter = this.state.DeduccionDependeSalarioFilter;
        //console.log("filtering")
        //console.log(TransaccionDesdeFilter)
        //console.log(this.state.transaccionesWithoutFilter);

        var filteredData = this.state.transaccionesWithoutFilter.filter(
            (item) => {
                return new Date(item.fechaTransaccion).toISOString() >= TransaccionDesdeFilter
                    && new Date(item.fechaTransaccion).toISOString() <= TransaccionHastaFilter;
            }
        );
        //console.log(filteredData);
        this.setState({ transacciones: filteredData });

        if (filteredData.length == 0) {
            this.setState({ isFiltered: false });
        }
    }

    //logChange = (e)=> {
    //    console.log(e.target.value);
    //}
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
        axios.get('api/Transacciones/GetTransaccionesAsientoNull', {
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

    async contabilizarClick() {
        console.log("contabilizando...");
        //transformacion de fecha filtro para API
        //console.log(new Date(this.state.TransaccionDesdeFilter).toISOString().split('T')[0]);

        const MySwal = withReactContent(Swal)
        let totalMonto = 0;
        const randIdAsiento = Math.floor(Math.random() * (1000 - 1) + 1);

        this.state.transacciones.forEach((transac) => {
            totalMonto += transac.montoTransaccion;
        })

        await axios.put('api/Transacciones/UpdtTrasacNullIdBtwnFechas', {
            dateLower: new Date(this.state.TransaccionDesdeFilter).toISOString(),
            dateUpper: new Date(this.state.TransaccionHastaFilter).toISOString(),
            idAsiento: randIdAsiento
        }, {
            headers: AuthenticationHeader()
        })
            .then(() => {
                MySwal.fire({
                    title: <strong>Transacciones Contabilizadas en asiento #{ randIdAsiento}!</strong>,
                    icon: 'success',
                    timer: 3000
                });
                this.setState({
                    TransaccionDesdeFilter: "",
                    TransaccionHastaFilter: "",
                    isFiltered: false
                });
                this.refreshList();
            }, (error) => {
                console.log(error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error: ', error.message);
                }
                console.log(error.config);

                MySwal.fire({
                    title: <strong>Error: No se pudieron contabilizar las transacciones...</strong>,
                    icon: 'error',
                    timer: 4000
                });
                return
            });
        //Prueba pre-integracion
        //console.log({
        //    "id_aux": 2,
        //    "nombre_aux": "Nomina",
        //    "cuenta": 70,
        //    "origen": "CR",
        //    "monto": totalMonto
        //});

        //Integracion Post Sin Contabilidad (DATOS FORMA 2)
        console.log({
            "Descripcion": `Asiento de Nominas correspondiente al periodo [${new Date(this.state.TransaccionDesdeFilter).toISOString().split('T')[0]}, ${new Date(this.state.TransaccionHastaFilter).toISOString().split('T')[0]}]`,
            "Id_Auxiliar": 2,
            "CuentaDB": 71,
            "CuentaCR": 70,
            "MontoAsiento": totalMonto,
        });

        //Integracion Registro Sin Contabilidad (DATOS FORMA 2)
        console.log({
            "Id_Asiento": randIdAsiento,
            "Descripcion": `Asiento de Nominas correspondiente al periodo [${new Date(this.state.TransaccionDesdeFilter).toISOString().split('T')[0]}, ${new Date(this.state.TransaccionHastaFilter).toISOString().split('T')[0]}]`,
            "Id_Auxiliar": 2,
            "CuentaDB": 71,
            "CuentaCR": 70,
            "FechaAsiento": new Date().toISOString(),
            "MontoAsiento": totalMonto,
            "Estado": "R"
        });

        //MySwal.fire({
        //    title: <strong>Transacciones Contabilizadas!</strong>,
        //    icon: 'success',
        //    timer: 2500
        //});
        //this.setState({
        //    TransaccionDesdeFilter: "",
        //    TransaccionHastaFilter: "",
        //    isFiltered: false
        //});
        //this.refreshList();
    }

    render() {
        const {
            transacciones,
            TransaccionDesdeFilter,
            TransaccionHastaFilter,
            isFiltered

        } = this.state;

        const tipoTransaccionTemplate = (transac) => {
            return <>{transac.tipoTransaccion} NOMINA</>
        }
        const fechaTransaccionTemplate = (transac) => {
            return <>{new Date(transac.fechaTransaccion).toISOString().split('T')[0]}</>
        }
        const idAsientoTemplate = (transac) => {
            return <>{transac.idAsiento ? (
                <>{transac.idAsiento}</>) : (<>Null</>)}</>
        }
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
                                                <h4 className="mr-2">Detalles Transacciones sin Contabilizar</h4>
                                            </div>
                                            <br />
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
                                            <br />
                                            <div className="e-table">
                                                <DataTable
                                                    dataKey="id"
                                                    value={transacciones}
                                                    paginator
                                                    rows={10}
                                                    rowsPerPageOptions={[5, 10, 15, 25, 50]}
                                                    tableStyle={{ minWidth: '50rem' }}>
                                                    <Column field="id" header="Id Transacci&oacute;n" style={{ width: '20%' }}></Column>
                                                    <Column
                                                        field="tipoTransaccion"
                                                        header="Descripci&oacute;n"
                                                        style={{ width: '20%' }}
                                                        body={tipoTransaccionTemplate}
                                                    ></Column>
                                                    <Column
                                                        field="fechaTransaccion"
                                                        header="Fecha Transacci&oacute;n"
                                                        style={{ width: '20%' }}
                                                        body={fechaTransaccionTemplate}
                                                    ></Column>
                                                    <Column field="montoTransaccion" header="Monto" style={{ width: '20%' }}></Column>
                                                    <Column
                                                        field="idAsiento"
                                                        header="Id Asiento"
                                                        style={{ width: '20%' }}
                                                        body={idAsientoTemplate}
                                                    ></Column>
                                                </DataTable>
                                                <br />
                                                {/*<div className="table-responsive table-lg mt-3">*/}
                                                {/*    <table className="table table-striped table-hover">*/}
                                                {/*        <thead>*/}
                                                {/*            <tr>*/}
                                                {/*                <th>Id Transaccion</th>*/}
                                                {/*                <th>Descripcion</th>*/}
                                                {/*                <th>Fecha Transaccion</th>*/}
                                                {/*                <th>Monto</th>*/}
                                                {/*                <th>Id Asiento</th>*/}
                                                {/*            </tr>*/}
                                                {/*        </thead>*/}
                                                {/*        <tbody>*/}
                                                {/*            {transacciones.map(t =>*/}
                                                {/*                <tr key={t.id}>*/}
                                                {/*                    <td>{t.id}</td>*/}
                                                {/*                    <td>{t.tipoTransaccion} NOMINA</td>*/}
                                                {/*                    <td>{new Date(t.fechaTransaccion).toISOString().split('T')[0]}</td>*/}
                                                {/*                    <td>{t.montoTransaccion} </td>*/}
                                                {/*<td>{t.idAsiento ? (*/}
                                                {/*    <>{t.idAsiento}</>) : (<>Null</>)}</td>*/}
                                                {/*                </tr>*/}
                                                {/*            )}*/}
                                                {/*        </tbody>*/}
                                                {/*    </table>*/}

                                                {/*</div>*/}
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