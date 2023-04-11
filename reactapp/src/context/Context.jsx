import { useMemo, createContext, useContext, useState } from "react";
import axios from "axios";
import { apiUrl } from "./apiUrl";
import AuthenticationHeader from "./AuthenticationHeader";

const userContext = createContext();

export function Context(props) {
  
    //Variables.
    const [dataEmpleados, setDataEmpleados] = useState([]);
    const apiUrl = process.env.API_URL;
    //Funciones.
    const getEmpleados = async () => {
        try {
            //console.log(process.env.NODE_ENV)
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                // dev code
                await axios
                    .get('https://localhost:7069' + "/api/Empleados/GetEmpleados", {
                        headers: AuthenticationHeader()
                    })
                    .then((data) => {
                        setDataEmpleados(data.data);
                    });
            } else {
                // production code
                await axios
                    .get('https://servicionomina.azurewebsites.net/' + "api/Empleados/GetEmpleados", {
                        headers: AuthenticationHeader()
                    })
                    .then((data) => {
                        setDataEmpleados(data.data);
                    });
            }
          
        } catch (error) {}
      };

  const data = useMemo(() => {
    return {
      //Variables.
      dataEmpleados,


      //Funciones.
      getEmpleados,
    };
  }, [getEmpleados]);

  return <userContext.Provider value={data} {...props} />;
}

export function useClient() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useClient debe de estar dentro del proveedor.");
  }

  return context;
}
