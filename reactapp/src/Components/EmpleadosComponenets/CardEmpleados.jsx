import style from "./CardEmpleados.module.css";

export function CardEmpleados({
  id,
  cedula,
  empleado,
  departamento,
  puesto,
  salario,
}) {
  return (
    <button className={style.body}>
      <span>{id}</span>
      <span>{cedula}</span>
      <p>{empleado}</p>
      <span>{departamento}</span>
      <span>{puesto}</span>
      <span>{salario}</span>
    </button>
  );
}
