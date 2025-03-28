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
      <Navbar style={{ borderColor: `${token?.colorPrincipal}` }} bg="light" expand="lg" fixed="top" className="rounded-navbar">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center">
            <FaUser className="me-2" />
            <span className="fw-bold">{token ? "Hola" + " " + token.nombre + "!" : "Usuario no disponible"}</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mt-1 flex-row justify-content-between">
              <Nav.Item className="d-flex flex-row">
                <Nav.Item className="d-flex align-items-center me-3">
                  <FaStar className="text-warning me-2" />
                  <span>
                    Puntos: <strong>{token?.puntos}</strong>
                  </span>
                </Nav.Item>
                <Nav.Item className="d-flex align-items-center me-3">
                  <FaDollarSign className="text-success me-2" />
                  <span>
                    Pesos: <strong>${token?.puntos}</strong>
                  </span>
                </Nav.Item>
              </Nav.Item>
              <Nav.Item className="d-flex align-items-center me-3">
                <button
                  className="btn p-0 d-flex align-items-center svg-hover-red"
                  onClick={logOut}
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    className="bi bi-box-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                    />
                  </svg>
                </button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

