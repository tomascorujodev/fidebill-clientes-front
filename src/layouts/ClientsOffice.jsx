import { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import { LocalesProvider } from "../contexts/LocalesContext.jsx"
import { urlBase64ToUint8Array } from '../utils/vapidConverter';
import { GET, POST } from '../services/Fetch';
import { useEmpresa } from '../contexts/EmpresaContext';
import { Button, Modal } from 'react-bootstrap';

export default function ClientsOffice() {
    const { nombreEmpresa } = useEmpresa();
    const [registration, setRegistration] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!nombreEmpresa) return
        (async () => {
            if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
            let registration = await navigator.serviceWorker.register('/serviceWorker.js');
            setRegistration(registration);
            let subscription = await registration.pushManager.getSubscription();
            if (!subscription) {
                setShowModal(true);
            } else {
                let response = await GET('notificaciones/verificarsuscripcion', { Endpoint: subscription?.endpoint });
                if (response?.status === 204) {
                    setShowModal(true);
                }
            }
        })()
    }, [nombreEmpresa]);

    async function suscribe() {
        let permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
        if (!registration) return;
        let convertedVapidKey = urlBase64ToUint8Array("BPHTg1FW55e8JRPlDXebebv3KOtRaLs5BkmZjTHoz42pHchn7_uG-wv2XJ2wrQKhRrRTTYvse1ZfeGj6I44yO5I");
        let subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
        });
        POST('notificaciones/suscribirse', subscription);
        setShowModal(false);
    }

    return (
        <>
            <LocalesProvider>
                <Navbar></Navbar>
                <Outlet />
                <MobileNavbar></MobileNavbar>
            </LocalesProvider>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Notificaciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Te gustaría estar al tanto de los últimos beneficios de <b>{nombreEmpresa}</b>?</Modal.Body>
                <Modal.Footer>
                    <>
                        <Button variant="success" onClick={suscribe}>Confirmar</Button>
                    </>
                </Modal.Footer>
            </Modal>
        </>
    )
}