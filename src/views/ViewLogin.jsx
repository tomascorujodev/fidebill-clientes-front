import React, { useState } from "react";
import "../assets/css/ViewLogin.css";
import { POST } from "../services/Fetch";
import { Link } from "react-router-dom";
import { useEmpresa } from "../contexts/EmpresaContext";
import { Spinner } from "react-bootstrap";

export default function ViewLogin({ setIsLoggedIn, setChangePassword }) {
  const { empresa, idEmpresa, estiloBorde } = useEmpresa();
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response = await POST("authclientes/login", { Documento: documento, Password: password, IdEmpresa: idEmpresa });
      setIsLoading(false);
      if (response) {
        switch (response.status) {
          case 200:
            if (documento === password) {
              setChangePassword(true);
            }
            response = await response.json();
            localStorage.setItem(empresa, response.token);
            setIsLoggedIn(true);
            setMensaje("");
            return;
          case 401:
            setMensaje("Usuario y contraseña incorrectos");
            return;
          case 500:
            setMensaje("Hubo un problema en el servidor. Por favor, contacte con un administrador");
            return;
          default:
            setMensaje("Hubo un problema. Por favor, contacte con un administrador");
            return;
        }
      } else {
        setMensaje("Hubo un problema al intentar iniciar sesion. Verifique la conexion");
      }
    } catch {
      setMensaje("Hubo un problema al iniciar sesion. Por favor, contacte con un administrador.");
      setIsLoading(false);
    }
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column align-items-center justify-content-center">
      {
        estiloBorde ?
          <>
            <img src={`/assets/${empresa}.png`} alt="..." style={{ width: "300px" }} />
            <img src="/assets/Socios.png" alt="..." style={{ width: "120px" }} />

            <div className="card-rounded" style={{ maxWidth: "400px", width: "85%", borderColor: `${estiloBorde}`, boxShadow: `${estiloBorde} 0px 0rem 2rem` }}>
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="documento" className="form-label">
                      Documento
                    </label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      id="documento"
                      value={documento}
                      onChange={e => setDocumento(e.target.value)}
                      placeholder="Ingrese su numero de documento"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control custom-input"
                      id="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Ingrese su contraseña"
                      required
                    />
                  </div>
                  {
                    isLoading ?
                      <div style={{ justifySelf: "center" }} className="d-flex spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                      :
                      <button type="submit" className="btn btn-primary w-100 mt-3 custom-button">
                        Iniciar Sesión
                      </button>
                  }
                </form>
                <div className="text-center mt-3">
                  ¿No estás registrado?
                  <br />
                  <Link to={`/${empresa}/registro`}>
                    Creá tu cuenta
                  </Link>
                  <a href="#" className="text-decoration-none">
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <img
                src="/assets/PoweredByFidebill.png"
                alt="FideBill Logo"
                width="238"
                height="44"
              />
            </div>
            {mensaje &&
              <div
                className="modal fade show"
                tabIndex="-1"
                aria-labelledby="modalMessageLabel"
                style={{ display: "block", paddingRight: "17px" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="modalMessageLabel">
                        Mensaje
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setMensaje("")}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {mensaje}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => setMensaje("")}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            }
          </>
          :
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
          </div>
      }
    </div>
  );
};
