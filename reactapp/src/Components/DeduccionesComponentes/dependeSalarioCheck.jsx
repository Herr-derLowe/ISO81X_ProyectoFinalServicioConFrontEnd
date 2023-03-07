import React from "react";

export function DependeSalarioCheck(props) {
    const dependeSalario = props.dependeSalario;
    if (dependeSalario) {
        return <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" defaultChecked disabled={true}></input>
        </div>;
    }
    return <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled={true}></input>
    </div>;
}