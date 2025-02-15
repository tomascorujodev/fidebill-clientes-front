import { Link } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <nav style={{ position: "fixed", bottom: "0" }} className="navbar navbar-light bg-light">
      <div className="container-fluid justify-content-around">
        <Link className="nav-link text-center" to="/">
          <i className="bi bi-house-door" style={{ fontSize: "24px" }}></i>
          <div className="small">Inicio</div>
        </Link>
        <Link className="nav-link text-center" to="/">
          <i className="bi bi-cup-straw" style={{ fontSize: "24px" }}></i>
          <div className="small">Consumos</div>
        </Link>
        <Link className="nav-link text-center" to="/beneficios">
          <i className="bi bi-cash" style={{ fontSize: "24px" }}></i>
          <div className="small">Beneficios</div>
        </Link>
        <Link className="nav-link text-center" to="#">
          <i className="bi bi-plus" style={{ fontSize: "24px" }}></i>
          <div className="small">Más</div>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavbar;
