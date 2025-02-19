import { useEffect, useState } from "react";
import CardBranch from "../components/CardBranch";
import CardTransaction from "../components/CardTransaction"
import { GET } from "../services/Fetch";
import { data } from "react-router-dom";

export default function Movimientos ({setIsLoggedIn}){
    const [transacciones, setTransacciones] = useState (null);
    useEffect ( () => {
        async function obtenerTransacciones () {
            let result = await GET ("vistaclientes/obtenertransacciones")
            result = await result.json ()
            setTransacciones (result);
        }
        obtenerTransacciones();
    }, [])
    console.log (transacciones)

    return (
        <div style={{ 
            display: "grid",
            gridTemplateColumns: "1fr",  // Una sola columna que ocupe todo el ancho
            gap: "20px",
            // Ocupa todo el ancho de la pantalla
            margin: "0 auto", // Centrar en la pantalla
            padding: "20px", // Agregar un poco de padding para evitar que se pegue a los bordes
        
                }}>
                {
                    transacciones &&
                    transacciones.compras.map(transaccion => (
                        <CardTransaction key={transacciones.transaccionCliente} titulo={transaccion.tipo} puntos={transaccion.puntos} />
                    ))
                }        
        </div>
    )
}