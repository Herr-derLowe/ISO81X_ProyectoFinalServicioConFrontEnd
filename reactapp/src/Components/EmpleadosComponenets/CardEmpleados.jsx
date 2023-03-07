import axios from "axios";
import { useState } from "react";
import style from "./CardEmpleados.module.css";

export function CardEmpleados({
  id,
  indice,
  cedula,
  empleado,
  departamento,
  puesto,
  salario,
}) {
  const [openPanel, setOpenPanel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [cancelBtn, setCancelBtn] = useState(false);

  const [updateVariable, setUpdateVariable] = useState({
    cedula: "",
    name: "",
    department: "",
    puesto: "",
    salary: "",
  });

  const handleChange = (e) => {
    setUpdateVariable({
      ...updateVariable,
      [e.target.name]: e.target.value,
    });

    console.log({ ...updateVariable, [e.target.name]: e.target.value });
  };

  const updateEmpleado = (e) => {
    e.preventDefault();
    if (cancelBtn) {
      setOpenEdit(false);
      console.log("Holaaaa");
    } else {
      console.log("Entre aqui");
    }
  };

  const deleteEmpleado = async () => {
    try {
      await axios.delete(
        "https://loclahost:7069/api/Empleados/DeleteEmpleado/" + id
      );
    } catch (error) {
      console.log("Error en enviar la solicitud.");
    }
  };

  return (
    <>
      <button
        style={
          openPanel
            ? {
                color: "#FFF",
                backgroundColor: "#12A58D",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
              }
            : null
        }
        className={style.body}
        onClick={() => setOpenPanel(!openPanel)}
      >
        <span>{indice}</span>
        <span>{cedula}</span>
        <p>{empleado}</p>
        <span>{departamento}</span>
        <span>{puesto}</span>
        <span>{salario}</span>
      </button>
      {openPanel ? (
        <div className={style.contButtons}>
          <button onClick={() => setOpenEdit(true)}>Editar</button>
          <button onClick={deleteEmpleado}>Eliminar</button>
        </div>
      ) : null}
      {openEdit ? (
        <div className={style.contEdit}>
          <div
            className={style.opacity}
            onClick={() => setOpenEdit(false)}
          ></div>
          <div className={style.editPanel}>
            <div></div>
            <form onSubmit={updateEmpleado}>
              <div className={style.formTitle}>
                <h2>Editar</h2>
              </div>

              <div className={style.inputs}>
                <span>Cedula</span>
                <input name="cedula" type="number" onChange={handleChange} />
              </div>

              <div className={style.inputs}>
                <span>Nombre</span>
                <input name="name" type="text" onChange={handleChange} />
              </div>

              <div className={style.inputs}>
                <span>Departamento</span>
                <input name="department" type="text" onChange={handleChange} />
              </div>

              <div className={style.inputs}>
                <span>Puesto</span>
                <input name="puesto" type="text" onChange={handleChange} />
              </div>

              <div className={style.inputs}>
                <span>Salario</span>
                <input name="salary" type="number" onChange={handleChange} />
              </div>

              <div className={style.sendForm}>
                <button>Actualizar</button>
                <button onClick={() => setCancelBtn(true)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
