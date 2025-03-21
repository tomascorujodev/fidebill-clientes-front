import { useParams } from "react-router-dom"
import jwtDecode from "../utils/jwtDecode"
import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { FaUser, FaStar, FaDollarSign } from "react-icons/fa"
import "../assets/css/Navbar.css"

export default function CustomNavbar() {
  const { empresa } = useParams()
  const token = jwtDecode(localStorage.getItem(empresa))

  function logOut() {
    localStorage.removeItem(empresa)
    window.location.replace(`/${empresa}`)
  }

  return (
    <>
    <Navbar style={{borderColor: `${token.colorPrincipal}`}} bg="light" expand="lg" fixed="top" className="rounded-navbar">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <FaUser className="me-2" />
          <span className="fw-bold">{token ? "Hola" + " " + token.nombre + "!" : "Usuario no disponible"}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item className="d-flex align-items-center me-3">
              <FaStar className="text-warning me-2" />
              <span> 
                Puntos: <strong>{token.puntos}</strong>
              </span>
            </Nav.Item>
            <Nav.Item className="d-flex align-items-center me-3">
              <FaDollarSign className="text-success me-2" />
              <span>
                Pesos: <strong>${token.puntos}</strong>
              </span>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

