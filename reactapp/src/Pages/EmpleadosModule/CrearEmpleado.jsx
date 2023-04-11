import style from "./styles/CrearEmpleado.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AuthenticationHeader from "../../context/AuthenticationHeader";

export function CrearEmpleado() {
  const [updateVariable, setUpdateVariable] = useState({
    cedula: "",
    name: "",
    department: "",
    puesto: "",
    salary: "",
  });
    const MySwal = withReactContent(Swal)

    const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdateVariable({
      ...updateVariable,
      [e.target.name]: e.target.value,
    });
  };

    let cedulaOK;
    const validaCedula = (cedulaIN) => {
        let cedula = cedulaIN;
        let c = cedula.split('');
        let v = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
        var result = 0;
        var up;
        var oc;
        let ab;
        for (let i = 0; i < 10; i++) {
            up = c[i] * v[i];
            ab = up;
            if (ab >= 10) {
                oc = ab.toString()
                    .split('')
                    .map(x => parseInt(x))
                    .reduce((x, y) => x + y);
            } else {
                oc = ab;
            }
            result = parseFloat(result) + parseFloat(oc);
        }
        let dp = result;
        let ac = dp.toString().split('')[0] + '0';
        ac = parseInt(ac);
        let uj = (ac / 10) * 10;
        if (uj < dp) {
            dp = (uj + 10) - dp;
        }

        if (c[10] == dp) {
            cedulaOK = true;
        } else {
            cedulaOK = false;
        }
    }

  const send = async (e) => {
      e.preventDefault();
      
      validaCedula(updateVariable.cedula);

      if (cedulaOK) {
          try {
              await axios
                  .post('https://localhost:7069' + "/api/Empleados/PostAddEmpleado/", {
                      cedulaEmpleado: updateVariable.cedula,
                      nombreEmpleado: updateVariable.name,
                      departamento: updateVariable.department,
                      puestoEmpleado: updateVariable.puesto,
                      salarioMensual: updateVariable.salary,
                  }, {
                      headers: AuthenticationHeader()
                  })
                  .then(() => {
                      navigate("/empleados/ver");
                  });
          } catch (error) { }
      } else {
          MySwal.fire({
              title: <strong>Error: C&eacute;dula no es v&aacute;lida...</strong>,
              icon: 'error'
          });
      }
  };

  return (
    <div className={style.body}>
      <form className={style.form} onSubmit={send}>
        <div className={style.inputs}>
          <span>Cedula:</span>
          <input type="number" name="cedula" onChange={handleChange} />
        </div>

        <div className={style.inputs}>
          <span>Nombre:</span>
          <input type="text" name="name" onChange={handleChange} />
        </div>

        <div className={style.inputs}>
          <span>Departamento:</span>
          <input type="text" name="department" onChange={handleChange} />
        </div>

        <div className={style.inputs}>
          <span>Puesto:</span>
          <input type="text" name="puesto" onChange={handleChange} />
        </div>

        <div className={style.inputs}>
          <span>Salario</span>
          <input type="number" name="salary" onChange={handleChange} step="0.01"/>
        </div>
        <div className={style.send}>
          <button>Crear Empleado</button>
        </div>
      </form>
    </div>
  );
}
