import React from "react";

export function EstadoDeduccionBadge(props) {
    const estadoDeduccion = props.estadoDeduccion;
    if (estadoDeduccion == "ACTIVO") {
        return <h5><span className="badge bg-success">ACTIVO</span></h5>;
    }
    return <h5><span className="badge bg-danger">INACTIVO</span></h5>;
}
