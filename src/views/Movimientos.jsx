import { useEffect, useState } from "react";
import CardTransaction from "../components/CardTransaction";
import { GET } from "../services/Fetch";
import { ISOaLatino } from "../utils/ConvertirFechas";

export default function Movimientos({ setIsLoggedIn }) {
    const [transacciones, setTransacciones] = useState(null);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        async function obtenerTransacciones() {
            let result = await GET("vistaclientes/obtenertransacciones");
            if (!result) {
                if (navigator.onLine) {
                    setMensaje("Ha ocurrido un problema. Por favor, espere unos instantes y vuelva a intentarlo");
                } else {
                    setMensaje("Ups... no hay conexion a internet. Verifique la red y vuelva a intentarlo.");
                }
                return;
            } // completar mensajes de error
            result = await result.json();
            setTransacciones(result.compras);
        }
        obtenerTransacciones();
    }, []);

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "30px",
            padding: "20px",
            paddingTop: "30px",
        }}>
            {transacciones?.length ?
                transacciones?.map(transaccion => (
                    <CardTransaction
                        key={transaccion.idTransaccion + transaccion.tipo}
                        tipo={transaccion.tipo}
                        direccion={transaccion.direccionLocal}
                        fecha={ISOaLatino(transaccion.fecha)}
                        titulo={transaccion.direccionLocal}
                        monto={transaccion.monto}
                        puntos={transaccion.puntos}
                    />
                ))
                :
                    <div style={{textAlign: "center"}} className="card-body">
                        <h5 className="card-title">{mensaje ? mensaje : "Parece que aún no tienes consumos🥺. En cuanto pases a aprovechar las promos que sumen puntos vas a poder ver reflejadas tus transacciones acá🥳"}</h5>
                    </div>
            }

            <div className="mt-1"><br /></div>
        </div>
    );
}
