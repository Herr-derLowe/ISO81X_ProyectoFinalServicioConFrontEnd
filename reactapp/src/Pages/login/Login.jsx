import style from "./styles/Login.module.css";

import { apiUrl } from "../../context/apiUrl";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
    //get the data of inputs
    const [dataLogin, setDataLogin] = useState({
        username: null,
        password: null,
    });

    const navigate = useNavigate();

    // we need create a function for get the data of the inputs
    const getData = (e) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    };

    const submitData = async (e) => {
        e.preventDefault();

        await axios
            .post(apiUrl + "Authentication/Login", {
                username: dataLogin.username,
                password: dataLogin.password,
            })
            .then((x) => {
                console.log(x.data);
                /* localStorage.setItem("token", x.data.token); */
                sessionStorage.setItem("token", x.data.token);
                navigate("/home");
            });
    };

    return (
        <div className={style.body}>
            <section>
                <h1>Sistema de nomina</h1>

                <form onSubmit={submitData}>
                    <div className={style.input}>
                        <span>
                            Usuario <strong>*</strong>
                        </span>

                        <input type="text" name="username" required onChange={getData} />
                    </div>

                    <div className={style.input}>
                        <span>
                            Contraseña <strong>*</strong>
                        </span>

                        <input
                            type="password"
                            name="password"
                            required
                            onChange={getData}
                        />
                    </div>

                    <div className={style.send}>
                        <button>Login</button>
                    </div>
                </form>

                <footer className={style.footer}>
                    <h3>Copyright @Dann, Inc. 2023</h3>
                </footer>
            </section>
        </div>
    );
}
