import { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import MapBranch from '../components/MapBranch'
import { urlBase64ToUint8Array } from '../utils/vapidConverter';
import { GET, POST } from '../services/Fetch';
import { useEmpresa } from '../contexts/EmpresaContext';
import { Button, Modal } from 'react-bootstrap';

export default function Menu() {
  const { empresa, idEmpresa, estiloBorde, nombreEmpresa } = useEmpresa();
  const [suscripcion, setSuscripcion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!nombreEmpresa) return
    setTimeout(() => {
      try {
        if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
        (async () => {
          let registration = await navigator.serviceWorker.register('/serviceWorker.js');
          let permission = await Notification.requestPermission();
          if (permission !== 'granted') return;

          let subscription = await registration.pushManager.getSubscription();
          if (!subscription) {
            let vapidPublicKey = "BPHTg1FW55e8JRPlDXebebv3KOtRaLs5BkmZjTHoz42pHchn7_uG-wv2XJ2wrQKhRrRTTYvse1ZfeGj6I44yO5I"
            let convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
            subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey,
            });
          }
          let response = await GET('notificaciones/verificarsuscripcion', { Endpoint: subscription?.endpoint });
          if (response?.status === 204) {
            setSuscripcion(subscription);
            setShowModal(true);
          }
        })()
      } catch { }
    }, 1000)
  }, [nombreEmpresa]);

  return (
    <>
      <MapBranch />
      <br />
      <Carousel />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Te gustaría estar al tanto de los últimos beneficios de <b>{nombreEmpresa}</b>?</Modal.Body>
        <Modal.Footer>
          <>
            <Button variant="success" onClick={() => {POST('notificaciones/suscribirse', suscripcion); setShowModal(false)}}>Confirmar</Button>
          </>
        </Modal.Footer>
      </Modal>
    </>
  )
}

