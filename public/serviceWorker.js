self.addEventListener('push', function (event) {
    let data = event.data.json();
    let options = {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png'
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  });
  