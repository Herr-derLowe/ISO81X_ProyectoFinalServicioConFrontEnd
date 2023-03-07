import style from "./styles/CrearEmpleado.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CrearEmpleado() {
  const [updateVariable, setUpdateVariable] = useState({
    cedula: "",
    name: "",
    department: "",
    puesto: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdateVariable({
      ...updateVariable,
      [e.target.name]: e.target.value,
    });
  };

  const send = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("https://localhost:7069/api/Empleados/PostAddEmpleado/", {
          cedulaEmpleado: updateVariable.cedula,
          nombreEmpleado: updateVariable.name,
          departamento: updateVariable.department,
          puestoEmpleado: updateVariable.puesto,
          salarioMensual: updateVariable.salary,
        })
        .then(() => {
          navigate("/empleados/ver");
        });
    } catch (error) {}
  };

  return (
    <div className={style.body}>
      <form className={style.form} onSubmit={send}>
        <div className={style.inputs}>
          <span>Cedula:</span>
          <input type="text" name="cedula" onChange={handleChange} />
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
          <input type="text" name="salary" onChange={handleChange} />
        </div>
        <div className={style.send}>
          <button>Crear Empleado</button>
        </div>
      </form>
    </div>
  );
}
