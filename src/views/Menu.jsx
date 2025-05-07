import { useState } from 'react';
import Carousel from '../components/Carousel';
import MapBranch from '../components/MapBranch';
import { Button, Modal } from 'react-bootstrap';
import '../assets/css/Menu.css';

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const browsers = [
    { name: 'Safari', img: '/instructions/safari.png' },
    { name: 'Vivaldi', img: '/instructions/vivaldi.png' },
    { name: 'Brave', img: '/instructions/brave.png' },
    { name: 'Samsung Internet', img: '/instructions/samsung.png' },
    { name: 'Firefox', img: '/instructions/firefox.png' },
    { name: 'Opera', img: '/instructions/opera.png' },
  ];
  if (window.deferredPrompt) {

  }

  return (
    <>
      <MapBranch />
      <br />
      <Carousel />
      {
        window.deferredPrompt &&
        < div className="d-flex justify-content-center mt-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Mostrar instrucciones de instalación
          </Button>
        </div >
      }

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setActiveImage(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Elige tu navegador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap justify-content-center mb-3">
            {browsers.map((browser) => (
              <Button
                key={browser.name}
                variant="outline-primary"
                className="m-1"
                onClick={() => setActiveImage(browser.img)}
              >
                {browser.name}
              </Button>
            ))}
          </div>
          <div className="instruction-image-container">
            {activeImage && (
              <img
                src={activeImage}
                alt="Instrucción"
                className="fade-in"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>

      <style jsx>{`
                .fade-in {
                    opacity: 0;
                    animation: fadeIn 0.5s forwards;
                }
                @keyframes fadeIn {
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
    </>
  );
}
