import { useEffect, useState } from "react";
import CardBranch from "../components/CardBranch";
import { GET } from "../services/Fetch";
import { data } from "react-router-dom";
import CardBenefit from "../components/CardBenefit";

export default function Beneficios({setIsLoggedIn}) {
    const [locales, setLocales] = useState (null);
    useEffect ( () => {
        async function  obtenerLocales () {
            let result = await GET ("vistaclientes/obtenerlocales")
            result = await result.json ()
            setLocales (result) 
        }
        obtenerLocales();
    }, []) 
    console.log (locales)

    return (
        <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", 
            gap: "20px",
            width: "100%", 
            maxWidth: "600px",
            margin: "0 auto",
            justifyContent: "center",
        }}>
        {
            locales &&
            locales.map(local => (
                <CardBenefit key={local.direccionLocal} titulo={local.direccionLocal} />
            ))
        }        
        </div>
    );
}
