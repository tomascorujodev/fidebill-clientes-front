import { Link, useParams } from "react-router-dom";

export default function MobileNavbar() {
  const { empresa } = useParams();

  return (
    <nav
      className="navbar bg-light fixed-bottom"
      style={{
        width: "100%", // Asegura que ocupe todo el ancho de la pantalla
        zIndex: 1000, // Para que quede sobre otros elementos
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)", // Sombra para mejor visibilidad
        position:"fixed-bottom",
      }}
    >
      <div className="container-fluid d-flex justify-content-around">
        <Link className="nav-link text-center" to={`/${empresa}/menu`}>
          <i className="bi bi-house-door" style={{ fontSize: "24px" }}></i>
          <div className="small">Inicio</div>
        </Link>
        <Link className="nav-link text-center" to={`/${empresa}/movimientos`}>
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
}
