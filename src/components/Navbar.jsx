import { useState } from "react";

export default function Navbar() {
  function logOut() {
    localStorage.removeItem(window.location.pathname.slice(1));
    window.location.reload();
  }

  return (
    <nav style={{bottom: "0"}} className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Hola Tomás!</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
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
      </div>
    </nav>
  );
}
