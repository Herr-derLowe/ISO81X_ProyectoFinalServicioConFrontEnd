import React, { Component } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export class GestionDeducciones extends Component {
    render() {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: <strong>Deducci&oacute;n Insertada!</strong>,
            icon: 'success'
        });
        return (
            
            <h1 className="text-center">Bienvenido/a a la lista de Departamentos de Walmart Inc.</h1>
        )
    }
}