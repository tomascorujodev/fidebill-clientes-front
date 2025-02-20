import { Link, useParams } from "react-router-dom";

export default function MobileNavbar() {
  const { empresa } = useParams();

  return (
    <nav className={"bg-light shadow-sm"} style={{position: "fixed", bottom: 0, width: "650px"}}>
      <div className="container d-flex justify-content-around py-2">
        <Link className="nav-link text-center" to={`/${empresa}/menu`}>
          <i className="bi bi-house-door fs-4"></i>
          <div className="small">Inicio</div>
        </Link>
        <Link className="nav-link text-center" to={`/${empresa}/movimientos`}>
          <i className="bi bi-cup-straw fs-4"></i>
          <div className="small">Consumos</div>
        </Link>
        <Link className="nav-link text-center" to={`/${empresa}/beneficios`}>
          <i className="bi bi-cash fs-4"></i>
          <div className="small">Beneficios</div>
        </Link>
        <Link className="nav-link text-center" to={`/${empresa}/mas`}>
          <i className="bi bi-plus fs-4"></i>
          <div className="small">Más</div>
        </Link>
      </div>
    </nav>
  );
}
