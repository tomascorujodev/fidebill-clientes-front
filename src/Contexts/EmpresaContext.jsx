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
    const [statusCode, setStatusCode] = useState(null);

    useEffect(() => {
        const obtenerEmpresa = async () => {
            if (!empresa) {
                setStatusCode(404);
                return
            }
            let result = await GET("authclientes/checkempresa", { empresa: empresa });
            if (result) {
                setStatusCode(result?.status);
                switch (result?.status) {
                    case 200:
                        result = await result.json();
                        setEstiloBorde(result.response.colorPrincipal);
                        setIdEmpresa(result.response.idEmpresa);
                        setNombreEmpresa(result.response.nombreEmpresa);
                        return;
                    default:
                        return;
                }
            } else {
                setStatusCode(500);
            }
        };
        obtenerEmpresa();
    }, []);

    return (
        <EmpresaContext.Provider value={{ empresa, estiloBorde, idEmpresa, nombreEmpresa, statusCode }}>
            {
                children
            }
        </EmpresaContext.Provider>
    );
}