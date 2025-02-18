import { Link, useParams } from "react-router-dom";

export default function MobileNavbar(){
  const { empresa } = useParams();

  return (
    <nav style={{ position: "fixed-bottom", bottom: "0", width: "100%" }} className="navbar navbar-light bg-light">
      <div className="container-fluid justify-content-around">
        <Link className="nav-link text-center" to={`/${empresa}/menu`}>
          <i className="bi bi-house-door" style={{ fontSize: "24px" }}></i>
          <div className="small">Inicio</div>
        </Link>
        <Link className="nav-link text-center" to={`/${empresa}/consumos`}>
          <i className="bi bi-cup-straw" style={{ fontSize: "24px" }}></i>
          <div className="small">Consumos</div>
        </Link>
        <Link className="nav-link text-center" to={`/${empresa}/beneficios`}>
          <i className="bi bi-cash" style={{ fontSize: "24px" }}></i>
          <div className="small">Beneficios</div>
        </Link>
        <Link className="nav-link text-center" to={`/${empresa}/mas`}>
          <i className="bi bi-plus" style={{ fontSize: "24px" }}></i>
          <div className="small">Más</div>
        </Link>
      </div>
    </nav>
  );
};
