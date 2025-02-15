import { Container, Card } from "react-bootstrap";
import error from "/assets/error.png"

export default function View500(){
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Card className="text-center p-4 shadow-lg" style={{ maxWidth: "500px" }}>
        <Card.Body>
          <img
            src={error}
            alt="Error del sistema"
            width="120"
            className="mb-3"
          />
          <h3 className="mb-3 text-warning">Algo no está funcionando bien...</h3>
          <p className="text-muted">
            Estamos experimentando algunos problemas en el sistema.  
            <br />Por favor, intenta de nuevo en unos minutos.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};
