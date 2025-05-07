import { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import { LocalesProvider } from "../contexts/LocalesContext.jsx"
import { urlBase64ToUint8Array } from '../utils/vapidConverter';
import { GET, POST } from '../services/Fetch';
import { useEmpresa } from '../contexts/EmpresaContext';
import { Button, Modal, Spinner } from 'react-bootstrap';
import Opciones from '../components/Opciones.jsx';

export default function ClientsOffice({setChangePassword}) {
    const { estiloBorde, nombreEmpresa } = useEmpresa();
    const [registration, setRegistration] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const [installButtonPosition, setInstallButtonPosition] = useState(Math.min(window.innerWidth * 0.9, 580));
    const [loading, setLoading] = useState(false);
    const [opciones, setOpciones] = useState(false);

    useEffect(() => {
        function handleResize() {
            let newPosition = Math.min(window.innerWidth * 0.9, 580);
            setInstallButtonPosition(newPosition);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!nombreEmpresa) return;
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
            if ((!window.matchMedia('(display-mode: standalone)').matches || !window.navigator.standalone) && window.deferredPrompt) {
                setShowInstallButton(true);
            }
        })()
    }, [nombreEmpresa]);


    async function suscribe() {
        try {
            setLoading(true);
            let permission = await Notification.requestPermission();
            if (permission !== 'granted') return;
            if (!registration) return;
            let convertedVapidKey = urlBase64ToUint8Array("BPHTg1FW55e8JRPlDXebebv3KOtRaLs5BkmZjTHoz42pHchn7_uG-wv2XJ2wrQKhRrRTTYvse1ZfeGj6I44yO5I");
            let subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey,
            });
            POST('notificaciones/suscribirse', subscription);
        } finally {
            setShowModal(false);
            setLoading(false);
        }
    }

    async function InstallPwa() {
        window.deferredPrompt?.prompt();
        setShowInstallButton(false);
    }

    return (
        <>
            <LocalesProvider>
                <Navbar></Navbar>
                <Outlet />
                {showInstallButton && (
                    <div className="d-flex w-100 justify-content-center">
                        <Button style={{ position: "fixed", bottom: "76px", backgroundColor: estiloBorde, border: 0, width: installButtonPosition, zIndex: 99 }} onClick={InstallPwa}>
                            Instalar aplicación
                        </Button>
                    </div>
                )}
                <MobileNavbar setOpciones={setOpciones}></MobileNavbar>
            </LocalesProvider>
            <Modal show={showModal} onHide={() => setShowModal(false)} aria-modal="true" role="dialog" aria-labelledby="modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">Notificaciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Te gustaría estar al tanto de los últimos beneficios de <b>{nombreEmpresa}</b>?</Modal.Body>
                <Modal.Footer>
                    <>
                        <Button variant="success" onClick={suscribe}>{loading ? <Spinner animation="border" variant="primary" /> : "Confirmar"}</Button>
                    </>
                </Modal.Footer>
            </Modal>
            {opciones && <Opciones setOpciones={setOpciones} setChangePassword={setChangePassword}/>}
        </>
    )
}