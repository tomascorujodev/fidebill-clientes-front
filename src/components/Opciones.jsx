import { useState, useEffect } from 'react';
import Carousel from './Carousel';
import MapBranch from './MapBranch';
import { Button, Modal } from 'react-bootstrap';
import "../assets/css/Opciones.css"
import { useEmpresa } from '../contexts/EmpresaContext';

export default function Opciones({ setOpciones, setChangePassword }) {
    const { estiloBorde } = useEmpresa();
    const [closing, setClosing] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Activa la animación de entrada apenas se monta
        setTimeout(() => {
            setOpen(true);
        }, 10); // Pequeño delay para forzar la transición
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setOpciones(false);
        }, 300); // Igual a la duración de la animación
    };

    return (
        <div
        style={{border: `3px solid ${estiloBorde}`}}
            className={`opciones-container shadow p-3 ${open ? 'open' : ''} ${closing ? 'closing' : ''}`}
        >
            <br />
            <h6 style={{textAlign: "center"}}>Configuración</h6>
            <br />
            <button
                type="button"
                className="btn-close position-absolute"
                style={{ top: "10px", right: "10px" }}
                aria-label="Close"
                onClick={handleClose}
            ></button>

            <div className="d-flex justify-content-center">
                <button
                    style={{fontSize: "0.8rem"}}
                    type="button"
                    className="btn btn-secondary"
                    onClick={setChangePassword}
                >
                    Reestablecer contraseña
                </button>
            </div>
        </div>
    );
}
