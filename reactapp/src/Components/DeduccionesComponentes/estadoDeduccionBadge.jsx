import React from "react";

function EstadoDeduccionBadge(props) {
    const estadoDeduccion = props.estadoDeduccion;
    if (estadoDeduccion == "ACTIVO") {
        return <h6><span className="badge bg-success">ACTIVO</span></h6>;
    }
    return <h6><span className="badge bg-danger">INACTIVO</span></h6>;
}

export default EstadoDeduccionBadge;