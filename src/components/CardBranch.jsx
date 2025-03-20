import { Link, useParams } from "react-router-dom";
import "../assets/css/CardBenefit.css"

export default function CardBranch({ titulo, imagen, puntos, idUsuarioEmpresa }) {
  const { empresa } = useParams();

  return (
    <>
    <div className="card-rounded">
      <img
        src="/assets/LOGOSD350x110px.png"
        style={{height: "15.8rem", objectFit: "contain"}}
        className="card-img-top fixed"
        alt="..."
      />
      <div style={{padding: "15px"}} className="card-body text-center d-flex flex-column">
        <h5 className="card-title">{titulo}</h5>
        <p>{puntos}</p>
        <Link
        style={{marginTop: "auto"}}
          to={`/${empresa}/beneficios?id=${idUsuarioEmpresa}`} 
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <i className="bi bi-gift-fill fs-5"></i>
          Ver beneficios
        </Link>
      </div>
    </div>
    </>
  );
}
