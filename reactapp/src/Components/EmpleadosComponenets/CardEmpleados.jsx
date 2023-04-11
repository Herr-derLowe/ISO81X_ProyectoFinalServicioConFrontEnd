import axios from "axios";
import { useState } from "react";
import style from "./CardEmpleados.module.css";
import closeImg from "../../imgs/close.png";
import { useClient } from "../../context/Context";
import { apiUrl } from "../../context/apiUrl";
import AuthenticationHeader from "../../context/AuthenticationHeader";

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

    const { getEmpleados } = useClient();

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
    };

    const updateEmpleado = async (e) => {
        e.preventDefault();
        if (cancelBtn) {
            setOpenEdit(false);
        } else {
            try {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    // dev code
                    await axios
                        .put('https://localhost:7069' + "/api/Empleados/UpdateEmpleado/" + id, {
                            cedulaEmpleado:
                                updateVariable.cedula != "" ? updateVariable.cedula : cedula,
                            nombreEmpleado:
                                updateVariable.name != "" ? updateVariable.name : empleado,
                            departamento:
                                updateVariable.department != ""
                                    ? updateVariable.department
                                    : departamento,
                            puestoEmpleado:
                                updateVariable.puesto != "" ? updateVariable.puesto : puesto,
                            salarioMensual:
                                updateVariable.salary != "" ? updateVariable.salary : salario,
                        }, {
                            headers: AuthenticationHeader()
                        })
                        .then(() => {
                            getEmpleados();
                            setOpenEdit(false)
                            setOpenPanel(false)
                        });
                } else {
                    // production code
                    await axios
                        .put('https://servicionomina.azurewebsites.net/' + "api/Empleados/UpdateEmpleado/" + id, {
                            cedulaEmpleado:
                                updateVariable.cedula != "" ? updateVariable.cedula : cedula,
                            nombreEmpleado:
                                updateVariable.name != "" ? updateVariable.name : empleado,
                            departamento:
                                updateVariable.department != ""
                                    ? updateVariable.department
                                    : departamento,
                            puestoEmpleado:
                                updateVariable.puesto != "" ? updateVariable.puesto : puesto,
                            salarioMensual:
                                updateVariable.salary != "" ? updateVariable.salary : salario,
                        }, {
                            headers: AuthenticationHeader()
                        })
                        .then(() => {
                            getEmpleados();
                            setOpenEdit(false)
                            setOpenPanel(false)
                        });
                }
            } catch (error) { }
        }
    };

    const deleteEmpleado = async () => {
        try {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                // dev code
                await axios
                    .delete('https://localhost:7069' + "/api/Empleados/DeleteEmpleado/" + id, {
                        headers: AuthenticationHeader()
                    })
                    .then(() => {
                        getEmpleados();
                        setOpenPanel(false)
                    });
            } else {
                // production code
                await axios
                    .delete('https://servicionomina.azurewebsites.net/' + "api/Empleados/DeleteEmpleado/" + id, {
                        headers: AuthenticationHeader()
                    })
                    .then(() => {
                        getEmpleados();
                        setOpenPanel(false)
                    });
            }
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
                        <div className={style.contClose}>
                            <div
                                className={style.contPicture}
                                onClick={() => setOpenEdit(false)}
                            >
                                <img src={closeImg} alt="Icono de close" />
                            </div>
                        </div>
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
                                <input name="salary" type="number" onChange={handleChange} step="0.01" />
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
