import { useState } from "react";
import logo from "../assets/LOGOSDCapCut.png"; 

export default function Navbar() {
  function logOut() {
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Hola Francisco!</a>
        <a className="navbar-brand" href="/">
          <img src={logo} alt="FideBill Logo" width="140" height="30" />
        </a>
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
              Menú
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">Sobre Nosotros</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Opciones
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/action">Acción</a></li>
                  <li><a className="dropdown-item" href="/another">Otra Acción</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="/more">Más opciones</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <button className="btn btn-danger mt-3" onClick={logOut}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
