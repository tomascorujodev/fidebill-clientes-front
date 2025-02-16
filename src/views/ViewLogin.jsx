import React, { useEffect, useState } from "react";
import "../assets/CSS/ViewLogin.css";
import { GET, POST } from "../services/Fetch";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewLogin({setIsLoggedIn}){
  const { empresa } = useParams();
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [estiloBorde, setEstiloBorde] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function checkEmpresa(){
      let rsp = await GET("authclientes/checkempresa", {empresa: empresa});
      switch (rsp.status){
        case 200:
          rsp = await rsp.json();
          setEstiloBorde(rsp.response.colorPrincipal);
          setIdEmpresa(rsp.response.idEmpresa);
          return;
        case 404:
          console.log("400");
          navigate("/404");
          return;
        case 500:
          navigate("/500");
          return;
        default:
          navigate("/500");
          return;
        }
    }
    checkEmpresa();
  }, [])
  async function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      try {
        let response = await POST("authclientes/login", { Documento: documento, Password: password, IdEmpresa: idEmpresa });
        setIsLoading(false);
        if (response) {
          switch (response.status) {
            case 200:
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
        }else{
          setMensaje("Hubo un problema al intentar iniciar sesion. Verifique la conexion");
        }
    } catch {
        setMensaje("Hubo un problem iniciar sesion. Por favor, contacte con un administrador.");
        setIsLoading(false);
    }
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card" style={{ maxWidth: "400px", width: "100%", boxShadow: `${estiloBorde} 0px 0rem 2rem` }}>
        <div className="card-body p-5">
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
                    <div style={{justifySelf: "center"}} className="d-flex spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                :
                    <button type="submit" className="btn btn-primary w-100 mt-3 custom-button">
                    Iniciar Sesión
                    </button>
            }
          </form>
          <div className="text-center mt-3">
            <a href="#" className="text-decoration-none">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
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
    </div>
  );
};
