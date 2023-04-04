import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../context/apiUrl";

export function PrivateRoute() {
  const [isAuth, setIsAuth] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const navigate = useNavigate();

  const sendVerify = async () => {
    await axios
      .get(apiUrl + "Authentication/verifyjwt/" + token)
      .then((data) => {
        setIsAuth(true);
      })
      .catch((err) => {
        navigate("/");
      });
  };

  useEffect(() => {
    sendVerify();
  }, []);

  if (!isAuth) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "600",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return <Outlet />;
}
