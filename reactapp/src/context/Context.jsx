import { useMemo, createContext, useContext } from "react";

const userContext = createContext();

export function Context(props) {
  


  const data = useMemo(() => {
    return {
      
    };
  }, []);

  return <userContext.Provider value={data} {...props} />;
}

export function useClient() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useClient debe de estar dentro del proveedor.");
  }

  return context;
}
