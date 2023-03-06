import style from "./styles/VerEmpleados.module.css";
import { CardEmpleados } from "../../Components/EmpleadosComponenets/CardEmpleados";
import axios from "axios";
import { apiUrl } from "../../context/apiUrl";
import { useEffect, useState } from "react";

export function VerEmpleados() {
  const [getEmpleado, setGetEmpleado] = useState([]);

  const get = async () => {
    try {
      await axios
        .get("https://localhost:7069/api/Empleados/GetEmpleados")
        .then((data) => {
          console.log(data);
        });
    } catch (error) {}
  };
  /* useEffect(() => {
    get();
  }, []); */

  return (
    <section className={style.body}>
      <div className={style.table}>
        <div className={style.columns}>
          <span>#</span>
          <p>Cedula</p>
          <p>Nombre</p>
          <p>Departamento</p>
          <span>Puesto</span>
          <span>Salario</span>
        </div>
        <div className={style.data}>
          <CardEmpleados />
        </div>
      </div>
    </section>
  );
}
