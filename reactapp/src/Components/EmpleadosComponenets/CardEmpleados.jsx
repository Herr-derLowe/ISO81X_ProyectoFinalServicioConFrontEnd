import { useState } from "react";
import style from "./CardEmpleados.module.css";

export function CardEmpleados({
  id,
  cedula,
  empleado,
  departamento,
  puesto,
  salario,
}) {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <button className={style.body}>
        <span>{id}</span>
        <span>{cedula}</span>
        <p>{empleado}</p>
        <span>{departamento}</span>
        <span>{puesto}</span>
        <span>{salario}</span>
      </button>
      {openDetails ? (
        <div className={style.contDetails}>
          <div className={style.opacity}>

          </div>
          <div>

          </div>
        </div>
      ) : null}
    </>
  );
}
