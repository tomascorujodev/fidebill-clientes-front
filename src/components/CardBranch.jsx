import { Link, useParams } from "react-router-dom";
import "../assets/css/CardBenefit.css"
import jwtDecode from "../utils/jwtDecode";

export default function CardBranch({ titulo, puntos, idUsuarioEmpresa }) {
  const { empresa } = useParams();
  const token = jwtDecode(localStorage.getItem(empresa));
  return (
    <>
      <div style={{ minHeight: "240px",  height: "30vw", maxHeight: "340px", width: "45%", maxWidth: "240px", borderColor: `${token?.colorPrincipal}` }} className="card-rounded">
        <img
          src={`/assets/${empresa}.png`}
          style={{ height: "55%", objectFit: "contain" }}
          className="card-img-top fixed"
          alt="logo empresa"
        />
        <div style={{ height: "45%", padding: "4%" }} className="card-body text-center d-flex flex-column justify-content-end">
          <p style={{
            fontSize: "calc(0.8em + 0.4vw)",
            wordBreak: "break-word",
            textAlign: "center"
          }}>{titulo}</p>
          <div style={{ height: "30%"}}>
            <Link
              style={{ fontSize: "calc(0.6em + 0.5vw)" }}
              to={`/${empresa}/beneficios?id=${idUsuarioEmpresa}`}
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
            >
              Ver beneficios
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
