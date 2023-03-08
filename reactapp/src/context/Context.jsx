import { useMemo, createContext, useContext, useState } from "react";
import axios from "axios";

const userContext = createContext();

export function Context(props) {
  
    //Variables.
    const [dataEmpleados, setDataEmpleados] = useState([]);

    //Funciones.
    const getEmpleados = async () => {
        try {
          await axios
            .get("https://localhost:7069/api/Empleados/GetEmpleados")
            .then((data) => {
              setDataEmpleados(data.data);
            });
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
