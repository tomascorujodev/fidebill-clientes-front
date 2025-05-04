import { useState } from "react"
import "../assets/css/CardBenefit.css"
import WeekDays from "./WeekDays"
import { useParams } from "react-router-dom";

export default function CardBenefit({ tipo, descripcion, dias, porcentajeReintegro = null, fechaInicio, fechaFin, sucursales, urlImagen = "null"}) {
  const [expanded, setExpanded] = useState(false);
  const { empresa } = useParams();

  function formatDate(dateString) {
    if (!dateString) return
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
  }
  fechaInicio = formatDate(fechaInicio);
  fechaFin = formatDate(fechaFin);
  return (
    <div className={`promo-card ${expanded ? "expanded" : ""}`}>
      <div className="promo-card-header">
        <img src={urlImagen} className="promo-logo" onError={(e) => { if (!e.target.dataset.fallback) { e.target.src = `/assets/${empresa}.png`; e.target.dataset.fallback = "true"; e.target.style.width = "110px"; } }} alt="imagen del beneficio" />
        {
          porcentajeReintegro &&
          <div className="promo-badge">{porcentajeReintegro}% de reintegro</div>
        }
      </div>

      <div className="promo-card-body">
        <h3 className="promo-title">{tipo}</h3>
        <p className="promo-description">{descripcion}</p>

        {expanded && (
          <div className="promo-details">
            <div className="promo-detail-item">
              <span className="detail-label">Días válidos:</span>
              <WeekDays diasActivos={dias} />
            </div>

            <div className="promo-detail-item">
              <span className="detail-label">Vigencia:</span>
              <span className="detail-value text-dark">
                {(() => {
                  if (!fechaInicio && !fechaFin) return "Sin vencimiento";
                  if (!fechaInicio)
                    return <>Válido <span style={{ color: 'red' }}>hasta</span> el: <strong>{fechaFin}</strong></>;
                  if (!fechaFin)
                    return <>Válido <span style={{ color: 'green' }}>a partir</span> del: <strong>{fechaInicio}</strong></>;
                  return <><strong>{fechaInicio}</strong> - <strong>{fechaFin}</strong></>;
                })()}
              </span>
            </div>

            <div className="promo-detail-item">
              <span className="detail-label">Sucursales adheridas:</span>
              <ul className="sucursales-list">
                {
                  (sucursales && sucursales.length > 0) ? (
                    sucursales.map((sucursal, index) => (
                      <li key={index}>{sucursal.nombreUsuarioEmpresa}</li>
                    ))
                  )
                    :
                    <li>Todas</li>
                }
              </ul>
            </div>
          </div>
        )}

        <button style={{ marginTop: "auto" }} className="promo-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Ocultar detalles" : "Más detalles"}
        </button>
      </div>
    </div>
  )
}

