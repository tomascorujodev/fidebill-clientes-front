import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import notFound from "/assets/sys/notFound.png"

export default function View404(){
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Card className="text-center p-4 shadow-lg" style={{ maxWidth: "500px" }}>
        <Card.Body>
          <img
            src={notFound}
            alt="Error 404"
            width="120"
            className="mb-3"
          />
          <h1 className="display-4 text-danger">404</h1>
          <h3 className="mb-3">¡Oops! Página no encontrada</h3>
          <p className="text-muted">
            Parece que la página que buscas no existe o la URL es incorrecta.
          </p>
          <Button variant="primary" as={Link} to="/streetdog" className="mt-3">
            Volver al inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

