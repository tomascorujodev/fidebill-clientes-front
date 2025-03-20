import { useEffect, useState } from "react";
import CardTransaction from "../components/CardTransaction"
import { GET } from "../services/Fetch";
import { ISOaLatino } from "../utils/ConvertirFechas";

export default function Movimientos({ setIsLoggedIn }) {
    const [transacciones, setTransacciones] = useState(null);
    useEffect(() => {
        async function obtenerTransacciones() {
            let result = await GET("vistaclientes/obtenertransacciones")
            result = await result.json()
            setTransacciones(result);
        }
        obtenerTransacciones();
    }, [])

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "30px",
            padding: "20px",
            paddingTop: "30px", // Ajusta según la altura del Navbar
                

        }}>
            {
                transacciones &&
                transacciones.compras.map(transaccion => (
                    <CardTransaction key={transaccion.idTransaccion + transaccion.tipo} tipo={transaccion.tipo} direccion={transaccion.direccionLocal} fecha={ISOaLatino(transaccion.fecha)} titulo={transaccion.direccionLocal} monto={transaccion.monto} puntos={transaccion.puntos} />
                ))
            }
            <div className="mt-1"><br /></div>
        </div>
    )
}