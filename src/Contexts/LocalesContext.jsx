import React, { createContext, useState, useEffect, useContext } from 'react';
import { GET } from "../services/Fetch";

const LocalesContext = createContext();

export function LocalesProvider({ children }) {
    const [locales, setLocales] = useState(null);

    useEffect(() => {
        const obtenerLocales = async () => {
            let result = await GET("vistaclientes/obtenerlocales");
            result = await result.json();
            setLocales(result);
        };
        obtenerLocales();
    }, []);

    return (
        <LocalesContext.Provider value={locales}>
            {children}
        </LocalesContext.Provider>
    );
}

export function useLocales() {
    return useContext(LocalesContext);
}
