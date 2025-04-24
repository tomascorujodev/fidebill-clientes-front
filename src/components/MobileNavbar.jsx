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
      <nav className={"rounded-mobile-navbar"} style={{ position: "fixed", borderColor: `${token?.colorPrincipal}`,bottom: 0, width: "100%", maxWidth: "650px", zIndex: 1050 }}>
        <div className="container d-flex justify-content-around">
          <Link className="nav-link text-center" to={`/${empresa}/menu`}>
            <i className="bi bi-house"></i>
            <div className="small">Inicio</div>
          </Link>
          <Link className="nav-link text-center" to={`/${empresa}/movimientos`}>
            <i className="bi bi-credit-card"></i>
            <div className="small">Consumos</div>
          </Link>
          <Link className="nav-link text-center" to={`/${empresa}/sucursales`}>
            <i className="bi bi-ticket-perforated"></i>
            <div className="small">Beneficios</div>
          </Link>
          <Link className="nav-link text-center" to={`/${empresa}/mas`}>
          <i className="bi bi-plus"></i>
          <div className="small">Más</div>
        </Link>
        </div>
      </nav>
    </>
  );
}
