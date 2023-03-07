import React from "react";

export function DependeSalarioCheck(props) {
    const dependeSalario = props.dependeSalario;
    if (dependeSalario == true) {
        return <div className="form-check">
            <input className="form-check-input" type="checkbox" defaultChecked disabled={true} />
        </div>;
    } else if (dependeSalario == false) {
        return <div className="form-check">
            <input className="form-check-input" type="checkbox" disabled={true} />
        </div>;
    }
}
