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
    const [isCorrect, setIsCorrect] = useState(true);

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
            .post("api/Authentication/Login", {
                username: dataLogin.username,
                password: dataLogin.password,
            })
            .then((x) => {
                //console.log(x.data);
                /* localStorage.setItem("token", x.data.token); */
                sessionStorage.setItem("token", x.data.token);
                sessionStorage.setItem("username", x.data.username)
                navigate("/home");
            })
            .catch(err => {
                setIsCorrect(false);
            });
    };

    return (
        <div className={style.body}>
            <div className={style.custom }>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={submitData}>
                            <div className="px-4 pt-2">
                                <h2 className="card-title">Sistema de Nomina</h2>
                                <label htmlFor="userName" className="form-label">Nombre de usuario <span className={style.spanNeeded }><strong>*</strong></span></label>
                                <input
                                    className="form-control"
                                    id="userName"
                                    type="text"
                                    name="username"
                                    required
                                    onChange={getData}
                                    placeholder="Usuario"
                                />
                                <br/>
                                <label htmlFor="password" className="form-label">Contrase&ntilde;a <span className={style.spanNeeded}><strong>*</strong></span></label>
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    onChange={getData}
                                    placeholder="Contrase&ntilde;a"
                                />

                                {isCorrect ? (<></>) : (
                                    <span className={style.spanWrong}>
                                        <strong>Contrase&ntilde;a o Usuario incorrecto</strong>
                                        <br />
                                    </span>
                                )}
                                <br />
                                <button className="btn btn-dark fw-bold">Login</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/*<section>*/}
            {/*    <h1>Sistema de nomina</h1>*/}

            {/*    <form onSubmit={submitData}>*/}
            {/*        <div className={style.input}>*/}
            {/*            <span>*/}
            {/*                Usuario <strong>*</strong>*/}
            {/*            </span>*/}

            {/*            <input type="text" name="username" required onChange={getData} />*/}
            {/*        </div>*/}

            {/*        <div className={style.input}>*/}
            {/*            <span>*/}
            {/*                Contrase&ntilde;a <strong>*</strong>*/}
            {/*            </span>*/}

            {/*            <input*/}
            {/*                type="password"*/}
            {/*                name="password"*/}
            {/*                required*/}
            {/*                onChange={getData}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*{isCorrect ? (<></>) : (*/}
            {/*    <span className={style.spanWrong}>*/}
            {/*        <strong>Contrase&ntilde;a o Usuario incorrecto</strong>*/}
            {/*    </span>*/}
            {/*)}*/}
            {/*        <div className={style.send}>*/}
            {/*            <button>Login</button>*/}
            {/*        </div>*/}
            {/*    </form>*/}

            {/*    <footer className={style.footer}>*/}
            {/*        <h3>Copyright @Dann, Inc. 2023</h3>*/}
            {/*    </footer>*/}
            {/*</section>*/}
        </div>
    );
}
