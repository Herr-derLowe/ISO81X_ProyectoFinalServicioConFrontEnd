import React from "react";

function DependeSalarioCheck(props) {
    const dependeSalario = props.dependeSalario;
    if (dependeSalario) {
        return <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled></input>
        </div>;
    }
    return <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled></input>
    </div>;
}

export default DependeSalarioCheck;