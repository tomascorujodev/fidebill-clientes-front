import { Link, useParams } from "react-router-dom";

export default function CardBranch({ titulo, imagen, puntos }) {
  const { empresa } = useParams();

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src="/assets/LOGOSD400px.png"
        className="card-img-top fixed"
        alt="..."
      />
      <div className="card-body text-center">
        <h5 className="card-title">{titulo}</h5>
        <p>{puntos}</p>
        <Link 
          to={`/${empresa}/beneficios`} 
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <i className="bi bi-gift-fill fs-5"></i>
          Ver beneficios
        </Link>
      </div>
    </div>
  );
}
