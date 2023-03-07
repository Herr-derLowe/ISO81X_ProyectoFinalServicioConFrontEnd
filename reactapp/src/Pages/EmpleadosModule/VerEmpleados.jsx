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
          setGetEmpleado(data.data);
        });
    } catch (error) {}
  };
  useEffect(() => {
    get();
  }, []);

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
          {getEmpleado.map((data, iden) => {
            return (
              <CardEmpleados
                key={data.id}
                id={data.id}
                indice={iden + 1}
                cedula={data.cedulaEmpleado}
                empleado={data.nombreEmpleado}
                departamento={data.departamento}
                puesto={data.puestoEmpleado}
                salario={data.salarioMensual}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
