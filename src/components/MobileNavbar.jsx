import { Link, useParams } from "react-router-dom";
import jwtDecode from "../utils/jwtDecode";

export default function MobileNavbar() {
  const { empresa } = useParams();
  const token = jwtDecode(localStorage.getItem(empresa));
  
  function logOut() {
    localStorage.removeItem(empresa);
    window.location.replace(`/${empresa}`);
  }

  return (
    <>
      <div style={{height: "100px"}}></div>
      <nav className={"rounded-mobile-navbar"} style={{ position: "fixed", borderColor: `${token.colorPrincipal}`,bottom: 0, width: "100%", maxWidth: "650px", zIndex: 1050 }}>
        <div className="container d-flex justify-content-around py-2">
          <Link className="nav-link text-center flex-grow-1" to={`/${empresa}/menu`}>
            <i className="bi bi-house"></i>
            <div className="small">Inicio</div>
          </Link>
          <Link className="nav-link text-center flex-grow-1" to={`/${empresa}/movimientos`}>
            <i className="bi bi-credit-card"></i>
            <div className="small">Consumos</div>
          </Link>
          <Link className="nav-link text-center flex-grow-1" to={`/${empresa}/sucursales`}>
            <i className="bi bi-ticket-perforated"></i>
            <div className="small">Beneficios</div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
          </button>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          data-bs-backdrop="false"
        >
        </div>
      </nav>
    </>
  );
}
