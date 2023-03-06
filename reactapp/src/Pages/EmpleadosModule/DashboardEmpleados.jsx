import style from "./styles/DashboardEmpleados.module.css";
import { PanelCard } from "../../Components/EmpleadosComponenets/PanelCard";
import groupIcon from "../../imgs/group.png";
import addUserIcon from "../../imgs/addUser.png"
import { Routes, Route } from "react-router-dom";
import { VerEmpleados } from "./VerEmpleados";

export function DashboardEmpleados() {
  return (
    <div className={style.body}>
      <div className={style.header}>
        <h1>Modulo de empleados</h1>
      </div>
      <div className={style.section}>
        <div className={style.gridCont}>
          <PanelCard to="ver" text="Ver Empleados" img={groupIcon} />
          <PanelCard to="add" text="Agregar Empleado" img={addUserIcon} />
        </div>
        <div className={style.modules}>
          <Routes>
            <Route path="ver" element={<VerEmpleados/>} />
            <Route path="add" element="" />
          </Routes>
        </div>
      </div>
    </div>
  );
}
