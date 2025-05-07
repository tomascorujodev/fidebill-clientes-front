import { useState } from 'react';
import Carousel from '../components/Carousel';
import MapBranch from '../components/MapBranch';
import { Button, Modal } from 'react-bootstrap';
import { useEmpresa } from '../contexts/EmpresaContext';
import '../assets/css/Menu.css';

export default function Menu() {
  const { estiloBorde } = useEmpresa();
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const browsers = [
    { name: 'Safari', img: '/instructions/safari.png' },
    { name: 'Firefox', img: '/instructions/firefox.png' },
    { name: 'Samsung Internet', img: '/instructions/samsung.png' },
    { name: 'Opera', img: '/instructions/opera.png' },
    { name: 'Brave', img: '/instructions/brave.png' },
    { name: 'Vivaldi', img: '/instructions/vivaldi.png' },
  ];

  return (
    <>
      <MapBranch />
      <br />
      <Carousel />
      {
        !window.deferredPrompt && (!window.matchMedia('(display-mode: standalone)').matches || !window.navigator.standalone) &&
        < div className="d-flex justify-content-center mt-3">
          <Button style={{backgroundColor: estiloBorde, border: 0, width: "90%"}} variant="primary" onClick={() => setShowModal(true)}>
            Instalar aplicación
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
