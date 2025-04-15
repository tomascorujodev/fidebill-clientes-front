import { useEffect } from 'react'
import Carousel from '../components/Carousel'
import MapBranch from '../components/MapBranch'
import { urlBase64ToUint8Array } from '../utils/vapidConverter';
import { POST } from '../services/Fetch';

export default function Menu() {
  useEffect(() => {
    setTimeout(() => {
      try {
        if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
        (async () => {
          let registration = await navigator.serviceWorker.register('/serviceWorker.js');

          let existingSubscription = await registration.pushManager.getSubscription();
          if (existingSubscription) return;

          let permission = await Notification.requestPermission();
          if (permission !== 'granted') return;
          let vapidPublicKey = "BPHTg1FW55e8JRPlDXebebv3KOtRaLs5BkmZjTHoz42pHchn7_uG-wv2XJ2wrQKhRrRTTYvse1ZfeGj6I44yO5I"
          let convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

          let subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });

          await POST('notificaciones/suscribirse', subscription );
        })()
      } catch { }
    }, 2000)
  }, []);

  return (
    <>
      <MapBranch />
      <br />
      <Carousel />
    </>
  )
}

