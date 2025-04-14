import { useEffect } from 'react'
import Carousel from '../components/Carousel'
import MapBranch from '../components/MapBranch'
import { urlBase64ToUint8Array } from '../utils/vapidConverter';

export default function Menu() {
  useEffect(() => {
    try {
      if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
      (async () => {
        let registration = await navigator.serviceWorker.register('/service-worker.js');

        let existingSubscription = await registration.pushManager.getSubscription();
        if (existingSubscription) return;

        let permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        let response = await fetch('/push/public-key');
        let vapidPublicKey = await response.text();
        let convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        let subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });

        await fetch('/api/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })()
    } catch { }
  }, []);

  return (
    <>
      <MapBranch />
      <br />
      <Carousel />
    </>
  )
}

