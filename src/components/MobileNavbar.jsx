import { Link, useParams } from "react-router-dom";

export default function MobileNavbar() {
  const { empresa } = useParams();

  function logOut() {
    localStorage.removeItem(empresa);
    window.location.replace(`/${empresa}`);
  }

  return (
    <>
      <div style={{height: "65px"}}></div>
      <nav className={"bg-light shadow-lg"} style={{ position: "fixed", bottom: 0, width: "100%", maxWidth: "650px", zIndex: 1050 }}>
        <div className="container d-flex justify-content-around py-2">
          <Link className="nav-link text-center" to={`/${empresa}/menu`}>
            <i className="bi bi-house-door fs-4"></i>
            <div className="small">Inicio</div>
          </Link>
          <Link className="nav-link text-center" to={`/${empresa}/movimientos`}>
            <i className="bi bi-cup-straw fs-4"></i>
            <div className="small">Consumos</div>
          </Link>
          <Link className="nav-link text-center" to={`/${empresa}/sucursales`}>
            <i className="bi bi-cash fs-4"></i>
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
            <i className="bi bi-plus fs-4"></i>
            <div className="small">Más</div>
          </button>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          data-bs-backdrop="false"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Tomás Corujo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <button className="btn btn-danger mt-3" onClick={logOut}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
