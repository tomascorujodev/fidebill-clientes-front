import React, { createContext, useState, useEffect, useContext } from 'react';
import { GET } from "../services/Fetch";

const EmpresaContext = createContext();

export function useEmpresa() {
    return useContext(EmpresaContext);
}

export function EmpresaProvider({ children }) {
    const empresa = window.location.pathname.slice(1).split('/')[0];
    const [estiloBorde, setEstiloBorde] = useState("");
    const [idEmpresa, setIdEmpresa] = useState("");
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    
    useEffect(() => {
        const obtenerEmpresa = async () => {
            let result = await GET("authclientes/checkempresa", {empresa: empresa});
            if (result) {
                switch (result.status) {
                    case 200:
                        result = await result.json();
                        setEstiloBorde(result.response.colorPrincipal);
                        setIdEmpresa(result.response.idEmpresa);
                        setNombreEmpresa(result.response.nombreEmpresa);
                        return;
                    case 404:
                        window.location.replace("/404");
                        return;
                    case 500:
                        window.location.replace("/500");
                        return;
                    default:
                        window.location.replace("/500");
                        return;

                }
            }
        };
        obtenerEmpresa();
    }, []);

    return (
        <EmpresaContext.Provider value={{ empresa, estiloBorde, idEmpresa, nombreEmpresa }}>
            {children}
        </EmpresaContext.Provider>
    );
}