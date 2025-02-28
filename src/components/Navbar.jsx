import { useParams } from "react-router-dom";
import jwtDecode from "../utils/jwtDecode";

export default function Navbar() {
  const { empresa } = useParams();
  const token = jwtDecode(localStorage.getItem(empresa));

  function logOut() {
    localStorage.removeItem(empresa);
    window.location.replace(`/${empresa}`);
  }

  return (
    <nav
      className="navbar bg-body-tertiary fixed-top"
      style={{
        bottom: "0",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        zIndex: 1050
      }}
    >
      <div className="container-fluid">
        <div>
        <h3 className="navbar-brand mb-1">
          {
            token
              ? "Hola " + token.nombre + "!"
              : "Usuario no disponible"
          }
        </h3>
        <p>
          Puntos acumulados: {token.puntos}
        </p>
        <p>
          Pesos para canjear: ${token.puntos}
        </p>
      </div>
      </div>
    </nav>
  );
}
